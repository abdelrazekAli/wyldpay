import request from "supertest";
import app from "../src/server";
import * as stripeService from "../src/services/stripe.service";
import {
  validLoginData,
  userData,
  invalidLoginData,
  incompleteLoginData,
} from "./fakeData/user.data";

const { API_VERSION } = process.env;

// Pass supertest agent for each test
const agent = request.agent(app);

// Test User Authentication
describe("Authentication API Tests", () => {
  console.log(process.env.API_VERSION);
  it("should register a new user successfully", async () => {
    // Mock the Stripe service to avoid calling the actual Stripe API
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

  // Test User Login
  it("should login a user and return a token", async () => {
    const response = await agent
      .post(`${API_VERSION}/auth/login`)
      .send(validLoginData);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("_id");
    expect(response.body).toHaveProperty("accessToken");
  });

  // Test User Login - Invalid credentials
  it("should return 401 for invalid email or password", async () => {
    const response = await agent
      .post(`${API_VERSION}/auth/login`)
      .send(invalidLoginData);

    expect(response.status).toBe(401);
    expect(response.body).toBe("Invalid email or password");
  });

  // Check for Required Fields
  it("should return 400 for missing required fields", async () => {
    const response = await agent
      .post(`${API_VERSION}/auth/login`)
      .send(incompleteLoginData);

    expect(response.status).toBe(400);
  });
});
