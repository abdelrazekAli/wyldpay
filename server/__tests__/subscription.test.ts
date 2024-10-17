import app from "../src/server";
import request from "supertest";
import { findUserById } from "../src/services/user.service";
import {
  checkSubscriptions,
  initiatePaymentSession,
  fetchSubscriptionPrices,
} from "../src/services/stripe.service";
import {
  prices,
  paymentSession,
  stripeUserData,
  userSubscription,
  invalidStripeUserData,
} from "./fakeData/subscription.data";

jest.mock("../src/services/stripe.service");
jest.mock("../src/services/user.service");

// Test suite for Subscriptions routes
describe("Subscriptions API Tests", () => {
  // Test to get subscriptions prices
  describe("GET /subscriptions/prices", () => {
    it("should return subscription prices", async () => {
      (fetchSubscriptionPrices as jest.Mock).mockResolvedValue(prices);

      const response = await request(app).get("/api/v1/subscriptions/prices");

      expect(response.status).toBe(200);
      expect(response.body).toEqual(prices.data);
    });

    it("should return server error if fetching prices fails", async () => {
      (fetchSubscriptionPrices as jest.Mock).mockRejectedValue(
        new Error("Stripe error")
      );

      const response = await request(app).get("/api/v1/subscriptions/prices");

      expect(response.status).toBe(500);
    });
  });

  // Test to create payment session for user
  describe("POST /subscriptions/session", () => {
    it("should create a payment session for a user", async () => {
      // Mock user data
      (findUserById as jest.Mock).mockResolvedValue(stripeUserData);

      // Mock payment session creation
      (initiatePaymentSession as jest.Mock).mockResolvedValue(paymentSession);

      const response = await request(app)
        .post("/api/v1/subscriptions/session")
        .send(stripeUserData);

      expect(response.status).toBe(200);
      expect(response.body).toEqual(paymentSession);
    });

    it("should return a 404 if the user is not found", async () => {
      // Mock no user found
      (findUserById as jest.Mock).mockResolvedValue(null);

      const response = await request(app)
        .post("/api/v1/subscriptions/session")
        .send(invalidStripeUserData);

      expect(response.status).toBe(404);
    });

    it("should handle errors during session creation", async () => {
      const errorMessage = "Session creation error";
      (findUserById as jest.Mock).mockResolvedValue(stripeUserData);
      (initiatePaymentSession as jest.Mock).mockRejectedValue(
        new Error(errorMessage)
      );

      const response = await request(app)
        .post("/api/v1/subscriptions/session")
        .send(stripeUserData);

      expect(response.status).toBe(500);
    });
  });

  // Test to check user subscription
  describe("POST /subscriptions/users/check", () => {
    it("should check user subscriptions", async () => {
      // Mock user data
      (findUserById as jest.Mock).mockResolvedValue(stripeUserData);

      // Mock subscription check
      (checkSubscriptions as jest.Mock).mockResolvedValue(userSubscription);

      const response = await request(app)
        .post("/api/v1/subscriptions/users/check")
        .send({ userId: stripeUserData._id });

      expect(response.status).toBe(200);
      expect(response.body).toEqual(userSubscription);
    });

    it("should return a 404 if the user is not found", async () => {
      // Mock no user found
      (findUserById as jest.Mock).mockResolvedValue(null);

      const response = await request(app)
        .post("/api/v1/subscriptions/users/check")
        .send({ userId: invalidStripeUserData.userId });

      expect(response.status).toBe(404);
    });

    it("should return errors if subscription check failed", async () => {
      const errorMessage = "Subscription check error";
      (findUserById as jest.Mock).mockResolvedValue(stripeUserData);
      (checkSubscriptions as jest.Mock).mockRejectedValue(
        new Error(errorMessage)
      );

      const response = await request(app)
        .post("/api/v1/subscriptions/users/check")
        .send({ userId: stripeUserData._id });

      expect(response.status).toBe(500);
    });
  });
});
