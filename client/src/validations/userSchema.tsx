import * as yup from "yup";

export const userSchema = yup.object({
  firstName: yup.string().trim().required("First name required").max(255),
  lastName: yup.string().trim().required("Last name required").max(255),
  email: yup
    .string()
    .trim()
    .email("Please enter a valid email")
    .required("Email required")
    .max(255),
  businessName: yup
    .string()
    .trim()
    .required("Business name required")
    .min(2, "Please enter a valid business name")
    .max(255),
  businessAddress: yup
    .string()
    .trim()
    .required("Business address required")
    .min(2, "Please enter a valid business address")
    .max(1000),
  city: yup.string().trim().required("City required").max(255),
  state: yup.string().trim().required("State required").max(255),
  zip: yup.string().trim().required("Zip code required").max(20),
  password: yup
    .string()
    .trim()
    .required("password required")
    .min(5, "Password length must be at least 5 characters")
    .max(255),

  confirmPassword: yup
    .string()
    .required("Please confirm password")
    .oneOf([yup.ref("password"), null], "Passwords not the same"),
});
