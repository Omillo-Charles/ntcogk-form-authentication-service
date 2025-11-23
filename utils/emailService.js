import nodemailer from 'nodemailer';
import config from '../config/env.js';

// Create reusable transporter
const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST || 'smtp.gmail.com',
  port: parseInt(process.env.EMAIL_PORT) || 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
  tls: {
    rejectUnauthorized: false, // Accept self-signed certificates
  },
});

// Verify transporter configuration
transporter.verify((error, success) => {
  if (error) {
    console.error('✗ Email transporter verification failed:', error.message);
    console.error('Please check your EMAIL_HOST, EMAIL_PORT, EMAIL_USER, and EMAIL_PASS environment variables');
  } else {
    console.log('✓ Email server is ready to send messages');
    console.log(`✓ Email configured: ${process.env.EMAIL_USER}`);
  }
});

// Send OTP email
export const sendOTPEmail = async (email, otp, userName = '') => {
  try {
    const mailOptions = {
      from: {
        name: 'NTCG Kenya',
        address: process.env.EMAIL_USER,
      },
      to: email,
      subject: 'Email Verification - NTCG Kenya',
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body {
              font-family: Arial, sans-serif;
              line-height: 1.6;
              color: #333;
            }
            .container {
              max-width: 600px;
              margin: 0 auto;
              padding: 20px;
            }
            .header {
              background: linear-gradient(135deg, #E02020 0%, #1E4E9A 100%);
              color: white;
              padding: 30px;
              text-align: center;
              border-radius: 10px 10px 0 0;
            }
            .content {
              background: #f9f9f9;
              padding: 30px;
              border-radius: 0 0 10px 10px;
            }
            .otp-box {
              background: white;
              border: 2px solid #1E4E9A;
              border-radius: 10px;
              padding: 20px;
              text-align: center;
              margin: 20px 0;
            }
            .otp-code {
              font-size: 32px;
              font-weight: bold;
              color: #1E4E9A;
              letter-spacing: 5px;
              margin: 10px 0;
            }
            .footer {
              text-align: center;
              margin-top: 20px;
              color: #666;
              font-size: 12px;
            }
            .button {
              display: inline-block;
              padding: 12px 30px;
              background: #E02020;
              color: white;
              text-decoration: none;
              border-radius: 5px;
              margin: 10px 0;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>Email Verification</h1>
              <p>New Testament Church of God Kenya</p>
            </div>
            <div class="content">
              <p>Hello${userName ? ' ' + userName : ''},</p>
              <p>Thank you for registering with NTCG Kenya. Please use the following verification code to complete your registration:</p>
              
              <div class="otp-box">
                <p style="margin: 0; color: #666;">Your Verification Code</p>
                <div class="otp-code">${otp}</div>
                <p style="margin: 0; color: #666; font-size: 14px;">This code will expire in 10 minutes</p>
              </div>
              
              <p>If you didn't request this code, please ignore this email.</p>
              
              <p style="margin-top: 30px;">
                <strong>Need help?</strong><br>
                Contact us at: <a href="mailto:info@ntcogk.org">info@ntcogk.org</a><br>
                Phone: +254 759 120 222
              </p>
            </div>
            <div class="footer">
              <p>© ${new Date().getFullYear()} New Testament Church of God Kenya. All rights reserved.</p>
              <p>This is an automated message, please do not reply to this email.</p>
            </div>
          </div>
        </body>
        </html>
      `,
      text: `
Hello${userName ? ' ' + userName : ''},

Thank you for registering with NTCG Kenya.

Your verification code is: ${otp}

This code will expire in 10 minutes.

If you didn't request this code, please ignore this email.

Need help? Contact us at info@ntcogk.org or call +254 759 120 222

© ${new Date().getFullYear()} New Testament Church of God Kenya. All rights reserved.
      `,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('OTP email sent successfully:', info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('Error sending OTP email:', error);
    throw error;
  }
};

// Send password reset email
export const sendPasswordResetEmail = async (email, resetToken, userName = '') => {
  try {
    const resetUrl = `${process.env.FRONTEND_URL}/reset-password?token=${resetToken}`;
    
    const mailOptions = {
      from: {
        name: 'NTCG Kenya',
        address: process.env.EMAIL_USER,
      },
      to: email,
      subject: 'Password Reset Request - NTCG Kenya',
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body {
              font-family: Arial, sans-serif;
              line-height: 1.6;
              color: #333;
            }
            .container {
              max-width: 600px;
              margin: 0 auto;
              padding: 20px;
            }
            .header {
              background: linear-gradient(135deg, #E02020 0%, #1E4E9A 100%);
              color: white;
              padding: 30px;
              text-align: center;
              border-radius: 10px 10px 0 0;
            }
            .content {
              background: #f9f9f9;
              padding: 30px;
              border-radius: 0 0 10px 10px;
            }
            .button {
              display: inline-block;
              padding: 15px 30px;
              background: #E02020;
              color: white !important;
              text-decoration: none;
              border-radius: 5px;
              margin: 20px 0;
              font-weight: bold;
            }
            .footer {
              text-align: center;
              margin-top: 20px;
              color: #666;
              font-size: 12px;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>Password Reset Request</h1>
              <p>New Testament Church of God Kenya</p>
            </div>
            <div class="content">
              <p>Hello${userName ? ' ' + userName : ''},</p>
              <p>We received a request to reset your password. Click the button below to create a new password:</p>
              
              <div style="text-align: center;">
                <a href="${resetUrl}" class="button">Reset Password</a>
              </div>
              
              <p>This link will expire in 1 hour for security reasons.</p>
              
              <p>If you didn't request a password reset, please ignore this email or contact us if you have concerns.</p>
              
              <p style="margin-top: 30px; font-size: 12px; color: #666;">
                If the button doesn't work, copy and paste this link into your browser:<br>
                <a href="${resetUrl}">${resetUrl}</a>
              </p>
            </div>
            <div class="footer">
              <p>© ${new Date().getFullYear()} New Testament Church of God Kenya. All rights reserved.</p>
            </div>
          </div>
        </body>
        </html>
      `,
      text: `
Hello${userName ? ' ' + userName : ''},

We received a request to reset your password.

Click this link to reset your password: ${resetUrl}

This link will expire in 1 hour.

If you didn't request a password reset, please ignore this email.

© ${new Date().getFullYear()} New Testament Church of God Kenya. All rights reserved.
      `,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Password reset email sent successfully:', info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('Error sending password reset email:', error);
    throw error;
  }
};

export default {
  sendOTPEmail,
  sendPasswordResetEmail,
};
