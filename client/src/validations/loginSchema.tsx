import * as yup from "yup";

export const loginSchema = yup.object({
  email: yup
    .string()
    .trim()
    .email("Please enter a valid email")
    .required("Email required")
    .max(255),

  password: yup.string().trim().required("Password required").max(255),
});
