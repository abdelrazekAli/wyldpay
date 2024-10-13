import app from "../src/server";
import request from "supertest";
import { testUserId } from "./fakeData/user.data";
import { generateToken } from "../src/utils/token.util";
import { invalidOrderData, orderData } from "./fakeData/order.data";

const agent = request.agent(app);

let testOrderId: string;
const accessToken = generateToken({ _id: testUserId }, "1h");

// Test suite for order routes
describe("Order API Tests", () => {
  // Test creating a new order
  it("should create a new order", async () => {
    const response = await agent
      .post("/api/v1/orders")
      .set("auth-token", accessToken)
      .send(orderData);

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("_id");
    testOrderId = response.body._id;
  });

  // Test fetching an order by ID
  it("should fetch an order by ID", async () => {
    const response = await agent.get(`/api/v1/orders/${testOrderId}`);
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("_id", testOrderId);
  });

  // Test getting orders for a restaurant
  it("should fetch orders by restaurant id", async () => {
    const page = 1;
    const limit = 10;
    const response = await agent
      .get(`/api/v1/orders?page=${page}&limit=${limit}`)
      .set("auth-token", accessToken);

    expect(response.status).toBe(200);
    expect(Array.isArray(response.body.orders)).toBe(true);
    expect(response.body).toHaveProperty("orders");
    expect(response.body).toHaveProperty("totalPages");
  });

  // Test handling not found for an order by ID
  it("should return 404 if order not found", async () => {
    const invalidOrderId = "670432a5fe5547ad58b8e762";
    const response = await agent.get(`/api/v1/orders/${invalidOrderId}`);

    expect(response.status).toBe(404);
    expect(response.body).toBe(`Order not found with id: ${invalidOrderId}`);
  });

  // Test validation error when creating an order with invalid data
  it("should return validation error if order data is invalid", async () => {
    const response = await agent
      .post("/api/v1/orders")
      .set("auth-token", accessToken)
      .send(invalidOrderData);
    expect(response.status).toBe(400);
  });
});
