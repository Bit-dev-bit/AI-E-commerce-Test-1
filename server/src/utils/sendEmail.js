import nodemailer from 'nodemailer';

const sendEmail = async (options) => {
  // If email credentials are not set up, just log the OTP for testing
  if (!process.env.EMAIL_USERNAME || !process.env.EMAIL_PASSWORD) {
    console.log('====================================');
    console.log('EMAIL CREDENTIALS NOT CONFIGURED');
    console.log(`To: ${options.email}`);
    console.log(`Subject: ${options.subject}`);
    console.log('Message Body:');
    console.log(options.html);
    console.log('====================================');
    return;
  }

  // Create a transporter
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD, // App Password
    },
  });

  // Define the email options
  const mailOptions = {
    from: `E-MART Support <${process.env.EMAIL_USERNAME}>`,
    to: options.email,
    subject: options.subject,
    html: options.html,
  };

  // Send the email
  await transporter.sendMail(mailOptions);
};

export default sendEmail;
