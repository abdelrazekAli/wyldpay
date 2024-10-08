import logger from "../config/logger.config";
import { mailOptions, transporter } from "../config/mail.config";
import { RegistrationEmailHTML } from "../utils/emailTemplates/registration";
import { ResetPasswordEmailHTML } from "../utils/emailTemplates/passwordReset";

// Send registration email
export const sendRegistrationEmail = async (email: string, token: string) => {
  const mailDetails = {
    ...mailOptions,
    to: email,
    subject: "Wyld register magic link",
    html: RegistrationEmailHTML(token),
  };

  try {
    const info = await transporter.sendMail(mailDetails);
    logger.info("Registration Email Sent: " + info.response);
  } catch (error: unknown) {
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
  const mailDetails = {
    ...mailOptions,
    to: email,
    subject: "Wyld Reset Password link",
    html: ResetPasswordEmailHTML(userId, token),
  };

  try {
    const info = await transporter.sendMail(mailDetails);
    logger.info("Reset Password Email Sent: " + info.response);
  } catch (error: unknown) {
    logger.error("Error sending reset password email: ", error);
    throw error;
  }
};
