import app from "../src/server";
import request from "supertest";
import { testUserId } from "./fakeData/user.data";
import { generateToken } from "../src/utils/token.util";
import {
  restaurantData,
  updateRestaurantData,
} from "./fakeData/restaurant.data";

const agent = request.agent(app);

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
      .post("/api/v1/restaurants")
      .send(restaurantData);

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("_id");
    testRestaurantId = response.body._id; // Store the restaurant ID for later tests
  });

  // Test getting restaurant by restaurant ID
  it("should fetch a restaurant by ID", async () => {
    const response = await agent.get(`/api/v1/restaurants/${testRestaurantId}`);
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("_id", testRestaurantId);
  });

  // Test updating restaurant data
  it("should update the restaurant data", async () => {
    const response = await agent
      .put("/api/v1/restaurants")
      .set("auth-token", accessToken)
      .send(updateRestaurantData);

    expect(response.status).toBe(200);
    expect(response.body).toBe("Restaurant updated successfully");
  });

  // Test fetching restaurant categories
  it("should fetch restaurant categories", async () => {
    const response = await agent.get(
      `/api/v1/restaurants/categories/${testRestaurantId}`
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
      .put("/api/v1/restaurants/categories")
      .set("auth-token", accessToken)
      .send(updatedCategories);

    expect(response.status).toBe(200);
    expect(response.body.categories).toEqual(["Japanese", "Chinese"]);
  });
});
