import { Quotation, Order } from '../types';
import { BUSINESS_INFO } from '../data/reviews';

/**
 * Client-side HTML window print/PDF generator for Quotations and Orders
 */
export function generatePrintableQuotation(doc: Quotation | Order): void {
  const printWindow = window.open('', '_blank', 'width=800,height=900');
  if (!printWindow) return;

  const isQuotation = 'quotationNumber' in doc;
  const docNumber = isQuotation ? (doc as Quotation).quotationNumber : (doc as Order).orderNumber;
  const docDate = isQuotation ? (doc as Quotation).createdAt.substring(0, 10) : (doc as Order).createdAt.substring(0, 10);
  const items = doc.items;
  const grandTotal = doc.grandTotal;

  const itemsRows = items.map((item, idx) => `
    <tr>
      <td style="padding: 10px; border-bottom: 1px solid #ddd; text-align: center;">${idx + 1}</td>
      <td style="padding: 10px; border-bottom: 1px solid #ddd;">
        <strong>${item.productName}</strong><br/>
        <span style="font-size: 11px; color: #666;">Code: ${item.productCode}</span>
        ${item.selectedColor ? `<br/><span style="font-size: 11px; color: #8B0000;">Color: ${item.selectedColor}</span>` : ''}
      </td>
      <td style="padding: 10px; border-bottom: 1px solid #ddd; text-align: center;">${item.quantity} units</td>
      <td style="padding: 10px; border-bottom: 1px solid #ddd; text-align: right;">₹${item.unitPrice.toFixed(2)}</td>
      <td style="padding: 10px; border-bottom: 1px solid #ddd; text-align: right; font-weight: bold;">₹${item.subtotal.toFixed(2)}</td>
    </tr>
  `).join('');

  const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <title>Chhabilal Cards — ${docNumber}</title>
        <style>
          body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; margin: 40px; color: #2D2926; background: #fff; }
          .header { display: flex; justify-content: space-between; align-items: flex-start; border-bottom: 3px solid #8B0000; padding-bottom: 20px; }
          .brand { color: #8B0000; }
          .brand h1 { margin: 0; font-size: 28px; font-family: 'Georgia', serif; }
          .brand p { margin: 4px 0 0 0; font-size: 12px; color: #555; }
          .doc-details { text-align: right; font-size: 13px; }
          .doc-title { font-size: 20px; font-weight: bold; color: #8B0000; margin-bottom: 6px; }
          .address-grid { display: flex; justify-content: space-between; margin: 30px 0; font-size: 13px; line-height: 1.6; }
          .address-box { width: 48%; background: #FAF9F6; padding: 15px; border-radius: 8px; border: 1px solid #E5E1DA; }
          table { width: 100%; border-collapse: collapse; margin-top: 20px; font-size: 13px; }
          th { background: #58141C; color: #FAF9F6; padding: 12px; text-align: left; }
          .totals { margin-top: 30px; float: right; width: 300px; font-size: 14px; }
          .totals table { margin: 0; }
          .totals td { padding: 6px 0; }
          .totals .grand-total { font-size: 18px; font-weight: bold; color: #8B0000; border-top: 2px solid #8B0000; }
          .footer { margin-top: 80px; text-align: center; font-size: 11px; color: #777; border-top: 1px solid #eee; padding-top: 20px; clear: both; }
          @media print {
            body { margin: 20px; }
            .no-print { display: none; }
          }
        </style>
      </head>
      <body>
        <div className="no-print" style="margin-bottom: 20px; text-align: right;">
          <button onclick="window.print()" style="background: #8B0000; color: #fff; border: none; padding: 10px 20px; border-radius: 6px; cursor: pointer; font-weight: bold;">
            🖨️ Print / Save as PDF
          </button>
        </div>

        <div class="header">
          <div class="brand">
            <h1>CHHABILAL CARDS</h1>
            <p>Opulent Wedding Invitations & Bulk Stationery Hub</p>
            <p>GSTIN: ${BUSINESS_INFO.gst}</p>
          </div>
          <div class="doc-details">
            <div class="doc-title">${isQuotation ? 'OFFICIAL QUOTATION' : 'ORDER SPECIFICATION'}</div>
            <div><strong>No:</strong> ${docNumber}</div>
            <div><strong>Date:</strong> ${docDate}</div>
          </div>
        </div>

        <div class="address-grid">
          <div class="address-box">
            <strong style="color: #8B0000;">ISSUED BY:</strong><br/>
            <strong>Chhabilal Cards Workshop</strong><br/>
            ${BUSINESS_INFO.address}<br/>
            Brajarajnagar, Jharsuguda, Odisha - 768216<br/>
            Phone: ${BUSINESS_INFO.phone1} | ${BUSINESS_INFO.phone2}<br/>
            Email: ${BUSINESS_INFO.email}
          </div>
          <div class="address-box">
            <strong style="color: #8B0000;">PREPARED FOR:</strong><br/>
            <strong>${doc.customerName}</strong><br/>
            ${doc.businessName ? `Org: ${doc.businessName}<br/>` : ''}
            Phone: ${doc.customerPhone}<br/>
            Email: ${doc.customerEmail}<br/>
            ${doc.gstNumber ? `GSTIN: ${doc.gstNumber}` : ''}
          </div>
        </div>

        <table>
          <thead>
            <tr>
              <th style="width: 40px; text-align: center;">#</th>
              <th>Description</th>
              <th style="width: 80px; text-align: center;">Quantity</th>
              <th style="width: 100px; text-align: right;">Rate (₹)</th>
              <th style="width: 120px; text-align: right;">Amount (₹)</th>
            </tr>
          </thead>
          <tbody>
            ${itemsRows}
          </tbody>
        </table>

        <div class="totals">
          <table>
            <tr>
              <td>Subtotal:</td>
              <td style="text-align: right;">₹${doc.subtotal.toFixed(2)}</td>
            </tr>
            ${doc.discountAmount > 0 ? `
              <tr>
                <td>Discount:</td>
                <td style="text-align: right; color: green;">- ₹${doc.discountAmount.toFixed(2)}</td>
              </tr>
            ` : ''}
            <tr class="grand-total">
              <td style="padding-top: 10px;">Grand Total:</td>
              <td style="text-align: right; padding-top: 10px;">₹${grandTotal.toFixed(2)}</td>
            </tr>
          </table>
        </div>

        <div class="footer">
          <p>This is a computer-generated document from Chhabilal Cards Brajarajnagar. Valid for 30 days.</p>
          <p>Thank you for choosing Chhabilal Cards for your wedding and educational stationery!</p>
        </div>
      </body>
    </html>
  `;

  printWindow.document.write(html);
  printWindow.document.close();
}
