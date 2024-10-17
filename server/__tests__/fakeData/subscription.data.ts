export const prices = { data: [{ id: "price_1", unit_amount: 1000 }] };

export const stripeUserData = {
  _id: "user_123",
  stripeCustomerId: "cus_123",
};

export const invalidStripeUserData = {
  userId: "nonexistent_user",
  priceId: "price_123",
};

export const userSubscription = {
  data: [{ id: "sub_123", status: "active" }],
};

export const paymentSession = {
  id: "session_123",
  url: "https://checkout.stripe.com/session_123",
};
