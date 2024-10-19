import request from "supertest";
import app from "../src/server";
import * as stripeService from "../src/services/stripe.service";
import {
  validLoginData,
  userData,
  invalidLoginData,
  incompleteLoginData,
  invalidRegisterData,
} from "./fakeData/user.data";

const { API_VERSION } = process.env;

// Pass supertest agent for each test
const agent = request.agent(app);

// Test Authentication and Authorization
describe("Auth API Tests", () => {
  describe("Post /auth/register", () => {
    it("should register a new user successfully", async () => {
      // Mock the Stripe service
      jest.spyOn(stripeService, "createStripeCustomer").mockResolvedValue({
        id: "test_stripe_id",
      });

      const response = await agent
        .post(`${API_VERSION}/auth/register`)
        .send(userData);

      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty("_id");
      expect(response.body).toHaveProperty("email", userData.email);
    });

    it("should return 409 if the email is already used", async () => {
      const response = await agent
        .post(`${API_VERSION}/auth/register`)
        .send(userData);

      expect(response.status).toBe(409);
      expect(response.body).toBe("Email is already used");
    });

    it("should return 400 for invalid data", async () => {
      const response = await agent
        .post(`${API_VERSION}/auth/register`)
        .send(invalidRegisterData);
      console.log(response.body);
      expect(response.status).toBe(400);
    });
  });

  describe("Post /auth/login", () => {
    it("should login a user and return a token", async () => {
      const response = await agent
        .post(`${API_VERSION}/auth/login`)
        .send(validLoginData);

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty("_id");
      expect(response.body).toHaveProperty("accessToken");
    });

    it("should return 401 for invalid email or password", async () => {
      const response = await agent
        .post(`${API_VERSION}/auth/login`)
        .send(invalidLoginData);

      expect(response.status).toBe(401);
      expect(response.body).toBe("Invalid email or password");
    });

    it("should return 400 for missing required fields", async () => {
      const response = await agent
        .post(`${API_VERSION}/auth/login`)
        .send(incompleteLoginData);

      expect(response.status).toBe(400);
    });
  });

  describe("Protected Route Access", () => {
    it("should return 403 when no access token", async () => {
      const response = await agent.get(`${API_VERSION}/coupons`);

      expect(response.status).toBe(403);
      expect(response.body).toBe("Access Denied. No token provided.");
    });

    it("should return 498 for an invalid token", async () => {
      const response = await agent
        .get(`${API_VERSION}/coupons`)
        .set("auth-token", "Bearer invalidToken");

      expect(response.status).toBe(498);
      expect(response.body).toBe("Invalid token.");
    });
  });
});
