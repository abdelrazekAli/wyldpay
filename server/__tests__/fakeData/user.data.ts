export const testUserId = "6123456789abcdef12345678";
export const unauthorizedUserId = "67075cab2930a039854c6cda";

export const userData = {
  email: "test@example.com",
  password: "securePassword123",
  firstName: "abdelrazek",
  lastName: "ali",
  phone: "20109208531",
  city: "cairo",
  state: "egypt",
  zip: "252154",
  businessName: "wyld",
  businessAddress: "67 cairo",
};

export const invalidRegisterData = {
  firstName: "",
  lastName: "ali",
  phone: 12,
  city: "cairo",
  state: "E",
  zip: "252154",
  businessName: "",
};

export const validLoginData = {
  email: "test@example.com",
  password: "securePassword123",
};

export const invalidLoginData = {
  email: "test@example.com",
  password: "wrongPassword",
};

export const incompleteLoginData = {
  email: "test@example.com",
};
