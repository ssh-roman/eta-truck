// app/api/contact/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { sendEmail } from '@/lib/email';

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { name, phone, email, subject, message } = body;

        // Validate required fields
        if (!name || !phone || !email || !subject || !message) {
            return NextResponse.json(
                { error: 'All fields are required' },
                { status: 400 }
            );
        }

        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return NextResponse.json(
                { error: 'Invalid email format' },
                { status: 400 }
            );
        }

        // Send email to business
        await sendEmail({
            to: process.env.EMAIL_TO || 'r3dyozn@gmail.com',
            subject: `New Contact Form Submission: ${subject}`,
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                    <h2 style="color: #1D4E1A;">New Contact Form Submission</h2>

                    <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
                        <h3 style="margin-top: 0;">Contact Details</h3>
                        <p><strong>Name:</strong> ${name}</p>
                        <p><strong>Email:</strong> ${email}</p>
                        <p><strong>Phone:</strong> ${phone}</p>
                        <p><strong>Subject:</strong> ${subject}</p>
                    </div>

                    <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
                        <h3 style="margin-top: 0;">Message</h3>
                        <p style="white-space: pre-wrap;">${message}</p>
                    </div>

                    <p style="color: #666; font-size: 14px;">
                        This email was sent from your GoCoffee website's contact form.
                    </p>
                </div>
            `,
            text: `
                New Contact Form Submission

                Name: ${name}
                Email: ${email}
                Phone: ${phone}
                Subject: ${subject}

                Message:
                ${message}

                This email was sent from your GoCoffee website's contact form.
            `,
        });

        // Send confirmation email to customer
        await sendEmail({
            to: email,
            subject: 'Thank you for contacting GoCoffee!',
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                    <h2 style="color: #1D4E1A;">Thank you for contacting us!</h2>

                    <p>Dear ${name},</p>

                    <p>Thank you for reaching out to GoCoffee. We have received your message and will get back to you as soon as possible.</p>

                    <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
                        <h3 style="margin-top: 0;">Your Message</h3>
                        <p><strong>Subject:</strong> ${subject}</p>
                        <p><strong>Message:</strong></p>
                        <p style="white-space: pre-wrap;">${message}</p>
                    </div>

                    <p>If you have any urgent questions, please don't hesitate to contact us.</p>

                    <p>Best regards,<br>The GoCoffee Team</p>
                </div>
            `,
            text: `
                Thank you for contacting us!

                Dear ${name},

                Thank you for reaching out to GoCoffee. We have received your message and will get back to you as soon as possible.

                Your Message:
                Subject: ${subject}
                Message: ${message}

                If you have any urgent questions, please don't hesitate to contact us.

                Best regards,
                The GoCoffee Team
            `,
        });

        return NextResponse.json(
            {
                message: 'Emails sent successfully',
            },
            { status: 200 }
        );

    } catch (error) {
        console.error('Error sending email:', error);
        return NextResponse.json(
            { error: 'Failed to send email. Please make sure your Gmail App Password is configured correctly.' },
            { status: 500 }
        );
    }
}
