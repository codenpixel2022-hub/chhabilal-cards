import { Order, Enquiry, Quotation } from '../types';

interface EmailPayload {
  to: string;
  subject: string;
  html: string;
}

/**
 * Send email using Resend API (Free Tier).
 * If API key is missing or request fails, logs failure without throwing an exception,
 * ensuring orders and enquiries are ALWAYS saved in the database.
 */
export async function sendEmail(payload: EmailPayload, apiKey?: string): Promise<{ success: boolean; message?: string }> {
  const key = apiKey || import.meta.env.VITE_RESEND_API_KEY;
  if (!key) {
    console.log('[Email Simulation] (Resend API Key not set):', payload.subject, '->', payload.to);
    return { success: false, message: 'Resend API Key not configured in .env' };
  }

  try {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${key}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'Chhabilal Cards <orders@chhabilalcards.in>',
        to: payload.to,
        subject: payload.subject,
        html: payload.html,
      }),
    });

    if (!res.ok) {
      const errText = await res.text();
      console.warn('Resend Email API error response:', errText);
      return { success: false, message: errText };
    }

    return { success: true };
  } catch (err: any) {
    console.warn('Email sending failed cleanly:', err);
    return { success: false, message: err?.message || 'Network error' };
  }
}

export function buildOrderEmailHtml(order: Order, isOwner: boolean): string {
  const title = isOwner ? `New Chhabilal Order Request — ${order.orderNumber}` : `Order Confirmation — ${order.orderNumber}`;
  const itemsHtml = order.items.map(item => `
    <tr>
      <td style="padding: 8px; border-bottom: 1px solid #eee;">${item.productName} (${item.productCode})</td>
      <td style="padding: 8px; border-bottom: 1px solid #eee; text-align: center;">${item.quantity} units</td>
      <td style="padding: 8px; border-bottom: 1px solid #eee; text-align: right;">₹${item.unitPrice.toFixed(2)}</td>
      <td style="padding: 8px; border-bottom: 1px solid #eee; text-align: right;">₹${item.subtotal.toFixed(2)}</td>
    </tr>
  `).join('');

  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #D4AF37; padding: 24px; border-radius: 12px; background: #FAF9F6;">
      <h2 style="color: #8B0000; margin-top: 0;">${title}</h2>
      <p style="color: #333;"><strong>Customer Name:</strong> ${order.customerName}</p>
      <p style="color: #333;"><strong>Phone / WhatsApp:</strong> ${order.customerPhone}</p>
      <p style="color: #333;"><strong>Email:</strong> ${order.customerEmail}</p>
      ${order.businessName ? `<p style="color: #333;"><strong>Business / Institution:</strong> ${order.businessName}</p>` : ''}
      ${order.gstNumber ? `<p style="color: #333;"><strong>GST Number:</strong> ${order.gstNumber}</p>` : ''}
      
      <h3 style="color: #8B0000; margin-top: 20px;">Order Items</h3>
      <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
        <thead>
          <tr style="background: #F2EDE4; color: #8B0000;">
            <th style="padding: 8px; text-align: left;">Item</th>
            <th style="padding: 8px; text-align: center;">Qty</th>
            <th style="padding: 8px; text-align: right;">Price</th>
            <th style="padding: 8px; text-align: right;">Subtotal</th>
          </tr>
        </thead>
        <tbody>
          ${itemsHtml}
        </tbody>
      </table>

      <div style="text-align: right; margin-top: 16px; border-top: 2px solid #8B0000; padding-top: 12px;">
        <p style="font-size: 18px; font-weight: bold; color: #8B0000; margin: 0;">
          Estimated Total: ₹${order.grandTotal.toFixed(2)}
        </p>
      </div>

      <div style="margin-top: 24px; padding-top: 16px; border-top: 1px solid #ddd; font-size: 12px; color: #666; text-align: center;">
        <p>Chhabilal Cards & Stationery Hub — Brajarajnagar, Jharsuguda, Odisha (768216)</p>
        <p>Contact: +91 7873837941 | +91 9348341358 | Email: chhabilalcards@gmail.com</p>
      </div>
    </div>
  `;
}
