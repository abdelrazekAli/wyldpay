import app from "../src/server";
import request from "supertest";
import { testUserId } from "./fakeData/user.data";
import { generateToken } from "../src/utils/token.util";
import {
  invalidRestaurantData,
  restaurantData,
  updateRestaurantData,
} from "./fakeData/restaurant.data";

const { API_VERSION } = process.env;

const agent = request.agent(app);
// let userId;
// Mock the findUserById function
jest.mock("../src/services/user.service", () => ({
  findUserById: jest.fn().mockResolvedValue({
    _id: "60a2f2b5b8df4e001f8e4d44",
    firstName: "John",
    email: "johndoe@example.com",
  }),
}));

let testRestaurantId: string;
const accessToken = generateToken(
  { _id: testUserId, restaurantId: testRestaurantId },
  "1h"
);

// Test suite for restaurant routes
describe("Restaurant API Tests", () => {
  // Test creating a new restaurant
  it("should create a new restaurant", async () => {
    const response = await agent
      .post(`${API_VERSION}/restaurants`)
      .send(restaurantData);

    expect(response.body).toHaveProperty("_id");
    expect(response.body).toHaveProperty("restaurantId");
    expect(response.body).toHaveProperty("accessToken");
    expect(response.header).toHaveProperty("auth-token");
    testRestaurantId = response.body.restaurantId; // Store the restaurant ID for later tests
  });

  // Test creating a new restaurant with invalid data
  it("should return a validation error for invalid restaurant data", async () => {
    const response = await agent
      .post(`${API_VERSION}/restaurants`)
      .send(invalidRestaurantData);

    expect(response.status).toBe(400);
  });

  // Test getting restaurant by restaurant ID
  it("should fetch a restaurant by ID", async () => {
    const response = await agent.get(
      `${API_VERSION}/restaurants/${testRestaurantId}`
    );
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("_id", testRestaurantId);
  });

  // Test updating restaurant data
  it("should update the restaurant data", async () => {
    const response = await agent
      .put(`${API_VERSION}/restaurants`)
      .set("auth-token", accessToken)
      .send(updateRestaurantData);

    expect(response.status).toBe(200);
    expect(response.body).toBe("Restaurant updated successfully");
  });

  // Test fetching restaurant categories
  it("should fetch restaurant categories", async () => {
    const response = await agent.get(
      `${API_VERSION}/restaurants/categories/${testRestaurantId}`
    );
    expect(response.status).toBe(200);
    expect(response.body).toEqual(["Italian", "Mexican"]);
  });

  // Test updating restaurant categories
  it("should update the restaurant categories", async () => {
    const updatedCategories = {
      restaurantId: testRestaurantId,
      categories: ["Japanese", "Chinese"],
    };

    const response = await agent
      .put(`${API_VERSION}/restaurants/categories`)
      .set("auth-token", accessToken)
      .send(updatedCategories);

    expect(response.status).toBe(200);
    expect(response.body.categories).toEqual(["Japanese", "Chinese"]);
  });
});
