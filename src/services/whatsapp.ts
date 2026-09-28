import { Order, Enquiry, ProductItem } from '../types';
import { BUSINESS_INFO } from '../data/reviews';

/**
 * Generates prefilled WhatsApp click-to-chat link for direct product enquiries (Method B)
 */
export function generateProductWhatsappUrl(product: ProductItem, quantity: number = 100, customMessage?: string): string {
  const phone = BUSINESS_INFO.whatsapp;
  let text = `Hello Chhabilal Cards,\n`;
  text += `I am interested in *${product.name}* (Code: ${product.code})\n`;
  text += `• Estimated Quantity: ${quantity} units\n`;
  text += `• Unit Rate: ₹${product.pricePerPiece.toFixed(2)}/pc\n`;
  if (customMessage) text += `• Note: ${customMessage}\n`;
  text += `\nPlease share stock availability, sample proofing time, and wholesale discount options. Thank you!`;

  return `https://wa.me/${phone}?text=${encodeURIComponent(text)}`;
}

/**
 * Generates prefilled WhatsApp click-to-chat link for completed Order Requests (Level 1 Free)
 */
export function generateOrderWhatsappUrl(order: Order): string {
  const phone = BUSINESS_INFO.whatsapp;
  let text = `*CHHABILAL CARDS — NEW ORDER REQUEST*\n`;
  text += `*Order Number:* ${order.orderNumber}\n`;
  text += `*Customer:* ${order.customerName}\n`;
  text += `*Phone:* ${order.customerPhone}\n`;
  if (order.businessName) text += `*Business/School:* ${order.businessName}\n`;
  text += `━━━━━━━━━━━━━━━━━━━━\n`;

  order.items.forEach((item, idx) => {
    text += `${idx + 1}. *${item.productName}* (${item.productCode})\n`;
    text += `   Qty: ${item.quantity} pcs @ ₹${item.unitPrice.toFixed(2)} = ₹${item.subtotal.toFixed(2)}\n`;
  });

  text += `━━━━━━━━━━━━━━━━━━━━\n`;
  text += `*GRAND TOTAL:* ₹${order.grandTotal.toFixed(2)}\n\n`;
  text += `Please confirm order status and printing proof schedule. Thank you!`;

  return `https://wa.me/${phone}?text=${encodeURIComponent(text)}`;
}

/**
 * Modular WhatsApp Cloud API Adapter (Level 2 Optional)
 */
export async function sendWhatsappCloudApi(to: string, templateName: string, params: string[], phoneId?: string, apiToken?: string): Promise<{ success: boolean; message?: string }> {
  if (!phoneId || !apiToken) {
    return { success: false, message: 'WhatsApp Cloud API credentials not configured' };
  }

  try {
    const res = await fetch(`https://graph.facebook.com/v18.0/${phoneId}/messages`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        messaging_product: 'whatsapp',
        to,
        type: 'template',
        template: {
          name: templateName,
          language: { code: 'en_US' },
          components: [
            {
              type: 'body',
              parameters: params.map(p => ({ type: 'text', text: p })),
            },
          ],
        },
      }),
    });

    if (!res.ok) {
      const err = await res.text();
      return { success: false, message: err };
    }

    return { success: true };
  } catch (err: any) {
    return { success: false, message: err?.message || 'WhatsApp API network error' };
  }
}
