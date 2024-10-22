import request from "supertest";
import app from "../src/server";
import { generateToken } from "../src/utils/token.util";
import * as stripeService from "../src/services/stripe.service";
import {
  userData,
  validLoginData,
  updatedUserData,
  invalidUserEmail,
  invalidLoginData,
  unauthorizedUserId,
  incompleteLoginData,
  invalidRegisterData,
} from "./fakeData/user.data";

let userId, accessToken;
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

      userId = response.body._id;
      accessToken = generateToken({ _id: userId }, "1h");

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

// Test users API
describe("User API Tests", () => {
  describe("GET /users/:userId", () => {
    it("should get user by ID successfully", async () => {
      const response = await agent.get(`${API_VERSION}/users/${userId}`);

      expect(response.status).toBe(200);
      console.log(response.body);
      expect(response.body).toHaveProperty("_id", userId);
      expect(response.body).toHaveProperty("email", userData.email);
    });

    it("should return 404 if user is not found", async () => {
      const response = await agent.get(
        `${API_VERSION}/users/${unauthorizedUserId}`
      );

      expect(response.status).toBe(404);
      expect(response.body).toBe(
        `User with id ${unauthorizedUserId} not found`
      );
    });
    it("should return 400 if id is invalid objectId", async () => {
      const response = await agent.get(`${API_VERSION}/users/1`);

      expect(response.status).toBe(400);
      expect(response.body).toBe("Invalid ID format");
    });
  });

  describe("PATCH /users", () => {
    it("should update the user successfully", async () => {
      const response = await agent
        .patch(`${API_VERSION}/users`)
        .send(updatedUserData)
        .set("auth-token", accessToken);

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty("_id", userId);
      expect(response.body).toHaveProperty("email", updatedUserData.email);
    });

    it("should return 400 for invalid data", async () => {
      const response = await agent
        .patch(`${API_VERSION}/users`)
        .send(invalidUserEmail)
        .set("auth-token", accessToken);

      expect(response.status).toBe(400);
    });
  });
});
