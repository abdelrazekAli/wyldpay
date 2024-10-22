import app from "../src/server";
import request from "supertest";
import { testUserId } from "./fakeData/user.data";
import { generateToken } from "../src/utils/token.util";
import {
  invalidRestaurantData,
  restaurantData,
  updateRestaurantData,
} from "./fakeData/restaurant.data";

// Load environment variable for API version
const { API_VERSION } = process.env;

// Setup supertest agent for API requests
const agent = request.agent(app);

// Mock the findUserById function in user service
jest.mock("../src/services/user.service", () => ({
  findUserById: jest.fn().mockResolvedValue({
    _id: "60a2f2b5b8df4e001f8e4d44",
    firstName: "John",
    email: "johndoe@example.com",
  }),
}));

// Define necessary variables
let testRestaurantId: string;
const accessToken = generateToken(
  { _id: testUserId, restaurantId: testRestaurantId },
  "1h"
);

// Test for Restaurant API
describe("Restaurant API Tests", () => {
  // Test for creating a restaurant
  describe("POST /restaurants", () => {
    it("should create a new restaurant", async () => {
      const response = await agent
        .post(`${API_VERSION}/restaurants`)
        .send(restaurantData);

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty("_id");
      expect(response.body).toHaveProperty("restaurantId");
      expect(response.body).toHaveProperty("accessToken");
      expect(response.header).toHaveProperty("auth-token");

      // Store the restaurant ID for later tests
      testRestaurantId = response.body.restaurantId;
    });

    it("should return 400 for invalid data", async () => {
      const response = await agent
        .post(`${API_VERSION}/restaurants`)
        .send(invalidRestaurantData);

      expect(response.status).toBe(400);
    });
  });

  // Test for fetching a restaurant by ID
  describe("GET /restaurants/:id", () => {
    it("should fetch a restaurant by ID", async () => {
      const response = await agent.get(
        `${API_VERSION}/restaurants/${testRestaurantId}`
      );

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty("_id", testRestaurantId);
    });
  });

  // Test for updating restaurant data
  describe("PUT /restaurants", () => {
    it("should update the restaurant data", async () => {
      const response = await agent
        .put(`${API_VERSION}/restaurants`)
        .set("auth-token", accessToken)
        .send(updateRestaurantData);

      expect(response.status).toBe(200);
      expect(response.body).toBe("Restaurant updated successfully");
    });
  });

  // Test for fetching restaurant categories
  describe("GET /restaurants/categories/:id", () => {
    it("should fetch restaurant categories", async () => {
      const response = await agent.get(
        `${API_VERSION}/restaurants/categories/${testRestaurantId}`
      );

      expect(response.status).toBe(200);
      expect(response.body).toEqual(["Italian", "Mexican"]);
    });
  });

  // Test for updating restaurant categories
  describe("PUT /restaurants/categories", () => {
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
});
