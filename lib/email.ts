import nodemailer from 'nodemailer';
import { getRegistrationEmailTemplate } from './email-template';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export async function sendRegistrationEmail(
  email: string,
  name: string,
  studentNumber: string
) {
  try {
    const mailOptions = {
      from: `"NOTxRASA" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: 'Welcome to NOTxRASA - Registration Confirmed!',
      html: getRegistrationEmailTemplate(name, studentNumber),
    };

    await transporter.sendMail(mailOptions);
    return { success: true };
  } catch (error) {
    console.error('Error sending email:', error);
    throw new Error('Failed to send confirmation email');
  }
}