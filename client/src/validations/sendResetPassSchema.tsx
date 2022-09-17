import * as yup from "yup";

export const sendResetPassSchema = yup.object({
  email: yup
    .string()
    .trim()
    .email("Please enter a valid email")
    .required("Email required")
    .max(255),
});
