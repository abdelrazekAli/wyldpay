import * as yup from "yup";

export const resetPassSchema = yup.object({
  password: yup
    .string()
    .trim()
    .required("Password required")
    .min(5, "Password length must be at least 5 characters")
    .max(255),
  confirmPassword: yup
    .string()
    .required("Please confirm password")
    .oneOf([yup.ref("password"), null], "Passwords not the same"),
});
