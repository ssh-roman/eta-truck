import nodemailer from 'nodemailer';

// Create reusable transporter
export const createTransporter = () => {
  return nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: Number(process.env.EMAIL_PORT),
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD,
    },
  });
};

export const sendEmail = async ({
  to,
  subject,
  html,
  text,
}: {
  to: string;
  subject: string;
  html: string;
  text?: string;
}) => {
  const transporter = createTransporter();

  const mailOptions = {
    from: `GoCoffee <${process.env.EMAIL_FROM}>`,
    to,
    subject,
    html,
    text,
  };

  return await transporter.sendMail(mailOptions);
};
