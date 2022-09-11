import * as yup from "yup";

// const passwordRules = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}$/;
// min 5 characters, 1 upper case letter, 1 lower case letter, 1 numeric digit.

export const userSchema = yup.object({
  firstName: yup.string().trim().required("First name required").max(100),
  lastName: yup.string().trim().required("Last name required").max(100),
  email: yup
    .string()
    .trim()
    .email("Please enter a valid email")
    .required("Email required")
    .max(100),
  businessName: yup
    .string()
    .trim()
    .required("Business name required")
    .min(2, "Please enter a valid business name")
    .max(100),
  businessAddress: yup
    .string()
    .trim()
    .required("Business address required")
    .min(2, "Please enter a valid business address")
    .max(1000),
  city: yup.string().trim().required("City required").max(50),
  state: yup.string().trim().required("State required").max(50),
  zip: yup.string().trim().required("Zip code required").max(20),
  password: yup
    .string()
    .trim()
    .required("password required")
    .min(5, "Password length must be at least 5 characters")
    .max(100),
  // .matches(passwordRules, { message: "Please create a stronger password" })
  // confirmPassword: yup
  //   .string()
  //   .oneOf([yup.ref("password"), null], "Passwords must match")
  //   .required("Required"),
});
