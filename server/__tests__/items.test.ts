import request from "supertest";
import app from "../src/server";
import { generateToken } from "../src/utils/token.util";
import { testUserId, unauthorizedUserId } from "./fakeData/user.data";
import {
  itemData,
  nonExistItemId,
  updatedItemData,
} from "./fakeData/item.data";

const { API_VERSION } = process.env;

// Pass supertest agent for each test
const agent = request.agent(app);

let testItemId: string;

// Authorized user's token
const accessToken = generateToken(
  { _id: testUserId, restaurantId: itemData.restId },
  "1h"
);

// Unauthorized user's token
const unauthorizedToken = generateToken(
  { _id: unauthorizedUserId, restaurantId: "differentRestaurantId" },
  "1h"
);

// Test suite for Item API
describe("Item API Tests", () => {
  // Test creating a new item
  it("should create a new item", async () => {
    const response = await agent
      .post(`${API_VERSION}/items`)
      .set("auth-token", accessToken)
      .send(itemData);

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("_id");
    testItemId = response.body._id; // Store item ID for later tests
  });

  // Test creating item with invalid data
  it("should return validation error when creating item with invalid data", async () => {
    const invalidItemData = { ...itemData, price: -100 };
    const response = await agent
      .post(`${API_VERSION}/items`)
      .set("auth-token", accessToken)
      .send(invalidItemData);

    expect(response.status).toBe(400);
  });

  // Test fetching an item by item ID
  it("should fetch an item by ID", async () => {
    const response = await agent.get(`${API_VERSION}/items/${testItemId}`);
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("_id", testItemId);
  });

  // Test fetching items by restaurant ID
  it("should fetch all items for a restaurant", async () => {
    const response = await agent.get(
      `${API_VERSION}/items/restaurant/${itemData.restId}`
    );
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  // Test updating an item by ID
  it("should update an item by ID", async () => {
    const response = await agent
      .put(`${API_VERSION}/items/id/${testItemId}`)
      .set("auth-token", accessToken)
      .send(updatedItemData);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("_id", testItemId);
    expect(response.body.name).toBe(updatedItemData.name);
  });

  // Test updating an item by ID (unauthorized user)
  it("should return 403 when trying to update an item not owned by the user", async () => {
    const response = await agent
      .put(`${API_VERSION}/items/id/${testItemId}`)
      .set("auth-token", unauthorizedToken)
      .send(updatedItemData);

    expect(response.status).toBe(403);
    expect(response.body).toBe(
      "Unauthorized. You can only modify your own restaurant's items."
    );
  });

  // Test updating a non-existent item
  it("should return 404 when trying to update a non-existent item", async () => {
    const response = await agent
      .put(`${API_VERSION}/items/id/${nonExistItemId}`)
      .set("auth-token", accessToken)
      .send(updatedItemData);

    expect(response.status).toBe(404);
    expect(response.body).toBe(`Item not found: ${nonExistItemId}`);
  });

  // Test deleting an item by ID
  it("should delete an item by ID", async () => {
    const response = await agent
      .delete(`${API_VERSION}/items/id/${testItemId}`)
      .set("auth-token", accessToken);

    expect(response.status).toBe(200);
    expect(response.body).toBe(
      `Successfully deleted item with id: ${testItemId}`
    );
  });

  // Test deleting a non-existent item
  it("should return 404 when trying to delete a non-existent item", async () => {
    const response = await agent
      .delete(`${API_VERSION}/items/id/${nonExistItemId}`)
      .set("auth-token", accessToken);

    expect(response.status).toBe(404);
    expect(response.body).toBe(`Item not found: ${nonExistItemId}`);
  });
});
