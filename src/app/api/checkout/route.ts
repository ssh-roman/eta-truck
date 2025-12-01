import { NextResponse } from 'next/server';
import { sendEmail } from '@/lib/email';

interface CartItem {
  productId: string;
  name: string;
  price: number;
  quantity: number;
  image?: string;
}

interface CustomerData {
  name: string;
  phone: string;
  email: string;
  address: string;
  city: string;
  notes?: string;
}

interface CheckoutRequest {
  customerData: CustomerData;
  cartItems: CartItem[];
  totalPrice: number;
}

export async function POST(request: Request) {
  try {
    const { customerData, cartItems, totalPrice }: CheckoutRequest = await request.json();

    // Validate required fields
    if (!customerData.name || !customerData.email || !customerData.phone || !customerData.address || !customerData.city) {
      return NextResponse.json(
        { error: 'All required fields must be filled' },
        { status: 400 }
      );
    }

    if (!cartItems || cartItems.length === 0) {
      return NextResponse.json(
        { error: 'Cart is empty' },
        { status: 400 }
      );
    }

    // Create order items HTML
    const orderItemsHTML = cartItems.map(item => `
      <tr>
        <td style="padding: 10px; border-bottom: 1px solid #ddd;">${item.name}</td>
        <td style="padding: 10px; border-bottom: 1px solid #ddd;">${item.quantity}</td>
        <td style="padding: 10px; border-bottom: 1px solid #ddd;">${item.price.toFixed(2)} lei</td>
        <td style="padding: 10px; border-bottom: 1px solid #ddd;">${(item.price * item.quantity).toFixed(2)} lei</td>
      </tr>
    `).join('');

    const orderDetailsHTML = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #1D4E1A;">New Order Received</h2>

        <h3>Customer Information:</h3>
        <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <p><strong>Name:</strong> ${customerData.name}</p>
          <p><strong>Email:</strong> ${customerData.email}</p>
          <p><strong>Phone:</strong> ${customerData.phone}</p>
          <p><strong>City:</strong> ${customerData.city}</p>
          <p><strong>Address:</strong> ${customerData.address}</p>
          ${customerData.notes ? `<p><strong>Notes:</strong> ${customerData.notes}</p>` : ''}
        </div>

        <h3>Order Details:</h3>
        <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
          <thead>
            <tr style="background-color: #1D4E1A; color: white;">
              <th style="padding: 10px; text-align: left;">Product</th>
              <th style="padding: 10px; text-align: left;">Quantity</th>
              <th style="padding: 10px; text-align: left;">Price</th>
              <th style="padding: 10px; text-align: left;">Subtotal</th>
            </tr>
          </thead>
          <tbody>
            ${orderItemsHTML}
          </tbody>
        </table>

        <div style="margin-top: 20px; text-align: right;">
          <h3 style="color: #1D4E1A;">Total: ${totalPrice.toFixed(2)} lei</h3>
        </div>
      </div>
    `;

    // Send email to store owner
    await sendEmail({
      to: process.env.EMAIL_TO || 'r3dyozn@gmail.com',
      subject: `New Order from ${customerData.name}`,
      html: orderDetailsHTML,
      text: `
        New Order Received

        Customer Information:
        Name: ${customerData.name}
        Email: ${customerData.email}
        Phone: ${customerData.phone}
        City: ${customerData.city}
        Address: ${customerData.address}
        ${customerData.notes ? `Notes: ${customerData.notes}` : ''}

        Order Details:
        ${cartItems.map(item => `
          ${item.name} x${item.quantity} - ${item.price.toFixed(2)} lei = ${(item.price * item.quantity).toFixed(2)} lei
        `).join('\n')}

        Total: ${totalPrice.toFixed(2)} lei
      `,
    });

    // Send confirmation email to customer
    await sendEmail({
      to: customerData.email,
      subject: 'Order Confirmation - GoCoffee',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #1D4E1A;">Thank you for your order!</h2>
          <p>Hi ${customerData.name},</p>
          <p>We've received your order and will contact you shortly to confirm the details.</p>

          <h3>Order Summary:</h3>
          <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
            <thead>
              <tr style="background-color: #1D4E1A; color: white;">
                <th style="padding: 10px; text-align: left;">Product</th>
                <th style="padding: 10px; text-align: left;">Quantity</th>
                <th style="padding: 10px; text-align: left;">Price</th>
                <th style="padding: 10px; text-align: left;">Subtotal</th>
              </tr>
            </thead>
            <tbody>
              ${orderItemsHTML}
            </tbody>
          </table>

          <div style="margin-top: 20px; text-align: right;">
            <h3 style="color: #1D4E1A;">Total: ${totalPrice.toFixed(2)} lei</h3>
          </div>

          <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="margin-top: 0;">Delivery Information:</h3>
            <p><strong>Address:</strong> ${customerData.address}</p>
            <p><strong>City:</strong> ${customerData.city}</p>
            ${customerData.notes ? `<p><strong>Notes:</strong> ${customerData.notes}</p>` : ''}
          </div>

          <p>If you have any questions, please don't hesitate to contact us.</p>
          <p>Best regards,<br>The GoCoffee Team</p>
        </div>
      `,
      text: `
        Thank you for your order!

        Hi ${customerData.name},

        We've received your order and will contact you shortly to confirm the details.

        Order Summary:
        ${cartItems.map(item => `${item.name} x${item.quantity} - ${(item.price * item.quantity).toFixed(2)} lei`).join('\n')}

        Total: ${totalPrice.toFixed(2)} lei

        Delivery to: ${customerData.address}, ${customerData.city}
        ${customerData.notes ? `Notes: ${customerData.notes}` : ''}

        If you have any questions, please don't hesitate to contact us.

        Best regards,
        The GoCoffee Team
      `,
    });

    return NextResponse.json({ success: true, message: 'Order placed successfully' });
  } catch (error) {
    console.error('Error processing checkout:', error);
    let errorMessage = 'Failed to process order. Please make sure your Gmail App Password is configured correctly.';
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
