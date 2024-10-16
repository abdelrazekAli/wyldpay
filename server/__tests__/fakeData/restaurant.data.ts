export const testRestaurantId = "6704245be5d8ee4a0d127f9f";
export const testDiffRestaurantId = "67075cab2930a039854c6cda";

export const restaurantData = {
  logo: "logo_url.com",
  background: "background_url.com",
  vatNum: "123456",
  vatPercentage: 15,
  currency: "USD",
  categories: ["Italian", "Mexican"],
  userId: "60a2f2b5b8df4e001f8e4d44",
};

export const updateRestaurantData = {
  logo: "updated_logo_url.com",
  background: "updated_background_url.com",
  vatNum: "654321",
  vatPercentage: 20,
};

export const invalidRestaurantData = {
  name: "",
  address: "123 Test St",
  phone: "1234567890",
  // Missing other required fields
};
