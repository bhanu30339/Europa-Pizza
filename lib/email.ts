import nodemailer from 'nodemailer';

const GMAIL_USER = process.env.GMAIL_USER;
const GMAIL_APP_PASSWORD = process.env.GMAIL_APP_PASSWORD;
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'admin@pizzaparadise.com';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: GMAIL_USER,
    pass: GMAIL_APP_PASSWORD,
  },
});

export async function sendOrderConfirmationEmail(
  customerEmail: string,
  customerName: string,
  orderNumber: string,
  otp: string,
  orderDetails: {
    items: Array<{ name: string; quantity: number; price: number }>;
    totalAmount: number;
    pickupTime: string;
  }
) {
  if (!GMAIL_USER || !GMAIL_APP_PASSWORD) {
    console.warn('Gmail credentials not configured. Skipping email.');
    return;
  }

  const itemsList = orderDetails.items
    .map((item) => `<li>${item.quantity}x ${item.name} - $${item.price.toFixed(2)}</li>`)
    .join('');

  const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: #ef4444; color: white; padding: 20px; text-align: center; }
        .content { padding: 20px; background: #f9f9f9; }
        .otp { font-size: 32px; font-weight: bold; color: #ef4444; text-align: center; padding: 20px; background: white; border: 2px dashed #ef4444; margin: 20px 0; }
        .footer { text-align: center; padding: 20px; font-size: 12px; color: #666; }
        ul { list-style: none; padding: 0; }
        li { padding: 5px 0; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>🍕 Pizza Paradise</h1>
          <p>Order Confirmation</p>
        </div>
        <div class="content">
          <h2>Thank you, ${customerName}!</h2>
          <p>Your order has been placed successfully.</p>

          <p><strong>Order Number:</strong> ${orderNumber}</p>
          <p><strong>Pickup Time:</strong> ${new Date(orderDetails.pickupTime).toLocaleString()}</p>

          <h3>Your OTP for Pickup:</h3>
          <div class="otp">${otp}</div>
          <p style="text-align: center; color: #666;">Please share this OTP when collecting your order.</p>

          <h3>Order Summary:</h3>
          <ul>
            ${itemsList}
          </ul>
          <p><strong>Total Amount: $${orderDetails.totalAmount.toFixed(2)}</strong></p>

          <p>We're preparing your delicious pizzas! See you soon!</p>
        </div>
        <div class="footer">
          <p>Pizza Paradise - The Best Pizza in Town</p>
          <p>If you have any questions, please contact us.</p>
        </div>
      </div>
    </body>
    </html>
  `;

  try {
    await transporter.sendMail({
      from: `Pizza Paradise <${GMAIL_USER}>`,
      to: customerEmail,
      subject: `Order Confirmation - ${orderNumber}`,
      html: htmlContent,
    });
    console.log('Order confirmation email sent to customer');
  } catch (error) {
    console.error('Failed to send customer email:', error);
  }
}

export async function sendAdminNotificationEmail(
  orderNumber: string,
  customerName: string,
  customerPhone: string,
  orderDetails: {
    items: Array<{ name: string; quantity: number }>;
    totalAmount: number;
    pickupTime: string;
  }
) {
  if (!GMAIL_USER || !GMAIL_APP_PASSWORD) {
    console.warn('Gmail credentials not configured. Skipping email.');
    return;
  }

  const itemsList = orderDetails.items
    .map((item) => `<li>${item.quantity}x ${item.name}</li>`)
    .join('');

  const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: #ef4444; color: white; padding: 20px; text-align: center; }
        .content { padding: 20px; background: #f9f9f9; }
        .alert { background: #fef2f2; border-left: 4px solid #ef4444; padding: 15px; margin: 20px 0; }
        ul { list-style: none; padding: 0; }
        li { padding: 5px 0; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>🔔 New Order Received!</h1>
        </div>
        <div class="content">
          <div class="alert">
            <strong>Action Required:</strong> New order needs your attention!
          </div>

          <p><strong>Order Number:</strong> ${orderNumber}</p>
          <p><strong>Customer Name:</strong> ${customerName}</p>
          <p><strong>Contact:</strong> ${customerPhone}</p>
          <p><strong>Pickup Time:</strong> ${new Date(orderDetails.pickupTime).toLocaleString()}</p>

          <h3>Order Items:</h3>
          <ul>
            ${itemsList}
          </ul>
          <p><strong>Total Amount: $${orderDetails.totalAmount.toFixed(2)}</strong></p>

          <p>Please log in to the admin dashboard to accept this order.</p>
        </div>
      </div>
    </body>
    </html>
  `;

  try {
    await transporter.sendMail({
      from: `Pizza Paradise System <${GMAIL_USER}>`,
      to: ADMIN_EMAIL,
      subject: `🔔 New Order - ${orderNumber}`,
      html: htmlContent,
    });
    console.log('Admin notification email sent');
  } catch (error) {
    console.error('Failed to send admin email:', error);
  }
}
