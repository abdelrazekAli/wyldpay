import * as yup from "yup";

export const paymentSchema = yup.object({
  routingNumber: yup
    .number()
    .typeError("Please enter Routing number")
    .positive("Routing number must be a positive number")
    .integer("Routing number should be an integer number")
    .test(
      "len",
      "Please enter a valid Routing number",
      (val) => val?.toString().length! >= 5 && val?.toString().length! < 34
    ),
  accountNumber: yup
    .number()
    .typeError("Please enter Account number")
    .positive("Account number must be a positive number")
    .integer("Account number should be an integer number")
    .test(
      "len",
      "Please enter a valid Account number",
      (val) => val?.toString().length! >= 5 && val?.toString().length! < 34
    ),

  confirmAccountNumber: yup
    .number()
    .typeError("Please confirm account number")
    .oneOf([yup.ref("accountNumber"), null], "Account numbers not the same"),
});
