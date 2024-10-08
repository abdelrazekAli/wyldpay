import app from "../src/server";
import request from "supertest";
import { testUserId } from "./fakeData/user.data";
import { generateToken } from "../src/utils/token.util";
import { testRestaurantId } from "./fakeData/restaurant.data";
import { couponData, invalidCouponData } from "./fakeData/coupon.data";

const agent = request.agent(app);

let testCouponId;
const accessToken = generateToken(
  { _id: testUserId, restaurantId: testRestaurantId },
  "1h"
);

// Test suite for Coupon routes
describe("Coupon API Tests", () => {
  // Test creating a new coupon
  it("should create a new coupon", async () => {
    const response = await agent
      .post("/api/v1/coupons")
      .set("auth-token", accessToken)
      .send(couponData);
    console.log(response.body);
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("_id");
    testCouponId = response.body._id; // Store the coupon ID for later tests
  });

  // Test fetching coupons by restaurant ID
  it("should fetch coupons by restaurant ID", async () => {
    const response = await agent
      .get("/api/v1/coupons")
      .set("auth-token", accessToken);

    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
    expect(response.body).toContainEqual(
      expect.objectContaining({ _id: testCouponId })
    );
  });

  // Test applying a coupon
  it("should apply the coupon", async () => {
    const response = await agent
      .post(`/api/v1/coupons/apply/${testRestaurantId}`)
      .set("auth-token", accessToken)
      .send({ code: couponData.code });
    console.log(couponData.code, response.body);
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("code");
  });

  // Test applying an invalid coupon
  it("should return 409 when coupon is invalid", async () => {
    const response = await agent
      .post(`/api/v1/coupons/apply/${testRestaurantId}`)
      .send(invalidCouponData);

    expect(response.status).toBe(409);
    expect(response.body).toBe(`Coupon: ${invalidCouponData.code} not found`);
  });

  // Test deleting a coupon
  it("should delete the coupon", async () => {
    const response = await agent
      .delete(`/api/v1/coupons/${testCouponId}`)
      .set("auth-token", accessToken);

    expect(response.status).toBe(200);
    expect(response.body).toBe("Coupon deleted successfully");
  });
});
