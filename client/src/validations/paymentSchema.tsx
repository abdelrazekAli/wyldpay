import * as yup from "yup";

export const paymentSchema = yup.object({
  name: yup
    .string()
    .required("Please enter bank name")
    .min(2, "Please enter a valid bank name")
    .max(100, "Please enter a valid bank name"),
  iban: yup
    .string()
    .required("Please enter iban")
    .min(5, "Please enter a valid iban")
    .max(34, "Please enter a valid iban"),

  bic: yup
    .string()
    .required("Please enter bic")
    .min(4, "Please enter a valid bic")
    .max(11, "Please enter a valid bic"),
});
