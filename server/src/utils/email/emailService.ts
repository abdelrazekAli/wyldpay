import logger from "../logger";
import nodemailer from "nodemailer";
import { RegistrationEmailHTML, ResetPasswordEmailHTML } from "./templates";

// Create email transporter
const createTransporter = () => {
  return nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_ADDRESS!,
      pass: process.env.EMAIL_PASS!,
    },
    tls: {
      rejectUnauthorized: false,
    },
  });
};

// Send registration email
export const sendRegistrationEmail = async (email: string, token: string) => {
  const transporter = createTransporter();

  const mailOptions = {
    from: "Wyld",
    to: email,
    subject: "Wyld register magic link",
    html: RegistrationEmailHTML(token),
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    logger.info("Registration Email Sent: " + info.response);
  } catch (error) {
    logger.error("Error sending registration email: ", error);
    throw error;
  }
};

// Send reset password email
export const sendResetPassEmail = async (
  userId: string,
  email: string,
  token: string
) => {
  const transporter = createTransporter();

  const mailOptions = {
    from: "Wyld",
    to: email,
    subject: "Wyld Reset Password link",
    html: ResetPasswordEmailHTML(userId, token),
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    logger.info("Reset Password Email Sent: " + info.response);
  } catch (error) {
    logger.error("Error sending reset password email: ", error);
    throw error;
  }
};
