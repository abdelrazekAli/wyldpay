import request from "supertest";
import app from "../src/server";
import { testUserId } from "./fakeData/user.data";
import { generateToken } from "../src/utils/token.util";
import { itemData, updatedItemData } from "./fakeData/item.data";

const agent = request.agent(app);

let testItemId: string;
const accessToken = generateToken(
  { _id: testUserId, restaurantId: itemData.restId },
  "1h"
);

// Test suite for Item API
describe("Item API Tests", () => {
  // Test creating a new item
  it("should create a new item", async () => {
    const response = await agent
      .post("/api/v1/items")
      .set("auth-token", accessToken)
      .send(itemData);

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("_id");
    testItemId = response.body._id; // Store item ID for later tests
  });

  // Test fetching an item by item ID
  it("should fetch an item by ID", async () => {
    const response = await agent.get(`/api/v1/items/${testItemId}`);
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("_id", testItemId);
  });

  // Test fetching items by restaurant ID
  it("should fetch all items for a restaurant", async () => {
    const response = await agent.get(
      `/api/v1/items/restaurant/${itemData.restId}`
    );
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  // Test updating an item by ID
  it("should update an item by ID", async () => {
    const response = await agent
      .put(`/api/v1/items/id/${testItemId}`)
      .set("auth-token", accessToken)
      .send(updatedItemData);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("_id", testItemId);
    expect(response.body.name).toBe(updatedItemData.name);
  });

  // Test deleting an item by ID
  it("should delete an item by ID", async () => {
    const response = await agent
      .delete(`/api/v1/items/id/${testItemId}`)
      .set("auth-token", accessToken);

    expect(response.status).toBe(200);
    expect(response.body).toBe(
      `Successfully deleted item with id: ${testItemId}`
    );
  });

  // Test creating item with invalid data
  it("should return validation error when creating item with invalid data", async () => {
    const invalidItemData = { ...itemData, price: -100 };
    const response = await agent
      .post("/api/v1/items")
      .set("auth-token", accessToken)
      .send(invalidItemData);

    expect(response.status).toBe(400);
  });
});
