import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import { CartItem, ProductItem, Order } from '../types';
import { useAuth } from './AuthContext';
import { DataStore } from '../services/store';
import { sendEmail, buildOrderEmailHtml } from '../services/email';
import { trackEvent } from '../services/analytics';
import { generateOrderWhatsappUrl } from '../services/whatsapp';

interface CartContextType {
  items: CartItem[];
  subtotal: number;
  totalQuantity: number;
  addToCart: (product: ProductItem, quantity: number, color?: string, notes?: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  removeFromCart: (productId: string) => void;
  clearCart: () => void;
  submitCheckoutOrder: (details: {
    customerName: string;
    customerPhone: string;
    customerEmail: string;
    businessName?: string;
    gstNumber?: string;
    street: string;
    landmark?: string;
    city: string;
    state: string;
    pincode: string;
    notes?: string;
  }) => Promise<{ success: boolean; order?: Order; whatsappUrl?: string; message?: string }>;
}

const GUEST_CART_KEY = 'chb_guest_cart_v1';

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();

  const [items, setItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem(GUEST_CART_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Synchronize cart changes to local storage
  useEffect(() => {
    try {
      localStorage.setItem(GUEST_CART_KEY, JSON.stringify(items));
    } catch (err) {
      console.error('Failed to sync cart:', err);
    }
  }, [items]);

  // Restores / Syncs cart post-login automatically
  useEffect(() => {
    if (user) {
      // Cart items remain safely preserved in state & localStorage
      trackEvent('cart_add', window.location.pathname, undefined, undefined, undefined, { action: 'cart_synced_post_login' });
    }
  }, [user]);

  // Compute unit price considering bulk discount tiers
  const getItemUnitPrice = (item: CartItem): number => {
    const p = item.product;
    if (!p.discountTiers || p.discountTiers.length === 0) return p.pricePerPiece;
    const sorted = [...p.discountTiers].sort((a, b) => b.minQty - a.minQty);
    for (const tier of sorted) {
      if (item.quantity >= tier.minQty) return tier.price;
    }
    return p.pricePerPiece;
  };

  const subtotal = useMemo(() => {
    return items.reduce((sum, item) => sum + (getItemUnitPrice(item) * item.quantity), 0);
  }, [items]);

  const totalQuantity = useMemo(() => {
    return items.reduce((sum, item) => sum + item.quantity, 0);
  }, [items]);

  const addToCart = (product: ProductItem, quantity: number, color?: string, notes?: string) => {
    const effectiveQty = Math.max(product.minOrderQuantity || 10, quantity);
    setItems(prev => {
      const existingIdx = prev.findIndex(item => item.product.id === product.id && item.selectedColor === color);
      if (existingIdx > -1) {
        const updated = [...prev];
        updated[existingIdx].quantity += effectiveQty;
        if (notes) updated[existingIdx].customizationNotes = notes;
        return updated;
      }
      return [...prev, {
        product,
        quantity: effectiveQty,
        selectedColor: color || product.colorsAvailable?.[0] || 'Default',
        customizationNotes: notes,
        addedAt: new Date().toISOString(),
      }];
    });
    trackEvent('cart_add', window.location.pathname, product.id, product.name, product.category, { quantity: effectiveQty });
  };

  const updateQuantity = (productId: string, newQty: number) => {
    setItems(prev => prev.map(item => {
      if (item.product.id === productId) {
        const moq = item.product.minOrderQuantity || 10;
        return { ...item, quantity: Math.max(moq, newQty) };
      }
      return item;
    }));
  };

  const removeFromCart = (productId: string) => {
    setItems(prev => prev.filter(item => item.product.id !== productId));
    trackEvent('cart_remove', window.location.pathname, productId);
  };

  const clearCart = () => {
    setItems([]);
    localStorage.removeItem(GUEST_CART_KEY);
  };

  const submitCheckoutOrder = async (details: {
    customerName: string;
    customerPhone: string;
    customerEmail: string;
    businessName?: string;
    gstNumber?: string;
    street: string;
    landmark?: string;
    city: string;
    state: string;
    pincode: string;
    notes?: string;
  }): Promise<{ success: boolean; order?: Order; whatsappUrl?: string; message?: string }> => {
    if (items.length === 0) return { success: false, message: 'Cart is empty' };

    // Formulate Order Object
    const orderItems = items.map(item => ({
      productId: item.product.id,
      productName: item.product.name,
      productCode: item.product.code,
      unitPrice: getItemUnitPrice(item),
      quantity: item.quantity,
      selectedColor: item.selectedColor,
      customizationNotes: item.customizationNotes,
      subtotal: getItemUnitPrice(item) * item.quantity,
    }));

    const orderSubtotal = subtotal;

    const newOrder = await DataStore.createOrder({
      customerId: user?.id,
      customerName: details.customerName,
      customerPhone: details.customerPhone,
      customerEmail: details.customerEmail,
      businessName: details.businessName || user?.businessName,
      gstNumber: details.gstNumber || user?.gstNumber,
      shippingAddress: {
        id: 'addr-' + Date.now(),
        title: 'Delivery Address',
        street: details.street,
        landmark: details.landmark,
        city: details.city,
        state: details.state,
        pincode: details.pincode,
      },
      items: orderItems,
      subtotal: orderSubtotal,
      discountAmount: 0,
      estimatedTax: 0,
      grandTotal: orderSubtotal,
      orderStatus: 'PENDING',
      paymentStatus: 'PENDING',
      notes: details.notes,
    });

    // Attempt Resend Owner Email Notification (Silent failure protection)
    const settings = await DataStore.getSettings();
    const ownerEmailHtml = buildOrderEmailHtml(newOrder, true);
    sendEmail({ to: settings.ownerEmail || 'chhabilalcards@gmail.com', subject: `New Order Request: ${newOrder.orderNumber}`, html: ownerEmailHtml });

    // Attempt Resend Customer Confirmation Email
    const customerEmailHtml = buildOrderEmailHtml(newOrder, false);
    sendEmail({ to: newOrder.customerEmail, subject: `Order Request Received: ${newOrder.orderNumber}`, html: customerEmailHtml });

    // Generate WhatsApp direct notify link
    const whatsappUrl = generateOrderWhatsappUrl(newOrder);

    // Track analytics event
    trackEvent('order_created', '/checkout', undefined, undefined, undefined, { orderNumber: newOrder.orderNumber, total: newOrder.grandTotal });

    clearCart();
    return { success: true, order: newOrder, whatsappUrl };
  };

  return (
    <CartContext.Provider value={{
      items,
      subtotal,
      totalQuantity,
      addToCart,
      updateQuantity,
      removeFromCart,
      clearCart,
      submitCheckoutOrder,
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used within CartProvider');
  return context;
};
