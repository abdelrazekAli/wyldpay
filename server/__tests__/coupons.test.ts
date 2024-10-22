import app from "../src/server";
import request from "supertest";
import { testUserId } from "./fakeData/user.data";
import { generateToken } from "../src/utils/token.util";
import {
  testDiffRestaurantId,
  testRestaurantId,
} from "./fakeData/restaurant.data";
import {
  couponData,
  fakeCouponId,
  invalidCouponData,
} from "./fakeData/coupon.data";

const { API_VERSION } = process.env;

// Setup supertest agent for API requests
const agent = request.agent(app);

let testCouponId: string;
const accessToken = generateToken(
  { _id: testUserId, restaurantId: testRestaurantId },
  "1h"
);

const anotherAccessToken = generateToken(
  { restaurantId: testDiffRestaurantId },
  "1h"
);

// Test suite for Coupon API
describe("Coupon API Tests", () => {
  // Test suite for creating a coupon
  describe("POST /coupons", () => {
    it("should create a new coupon", async () => {
      const response = await agent
        .post(`${API_VERSION}/coupons`)
        .set("auth-token", accessToken)
        .send(couponData);

      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty("_id");

      // Store the coupon ID for later tests
      testCouponId = response.body._id;
    });

    it("should return validation error for invalid coupon data", async () => {
      const response = await agent
        .post(`${API_VERSION}/coupons`)
        .set("auth-token", accessToken)
        .send(invalidCouponData);

      expect(response.status).toBe(400);
    });
  });

  // Test suite for fetching coupons by restaurant ID
  describe("GET /coupons", () => {
    it("should fetch coupons by restaurant ID", async () => {
      const response = await agent
        .get(`${API_VERSION}/coupons`)
        .set("auth-token", accessToken);

      expect(response.status).toBe(200);
      expect(response.body).toBeInstanceOf(Array);
      expect(response.body).toContainEqual(
        expect.objectContaining({ _id: testCouponId })
      );
    });
  });

  // Test suite for applying a coupon
  describe("POST /coupons/apply/:restaurantId", () => {
    it("should apply the coupon", async () => {
      const response = await agent
        .post(`${API_VERSION}/coupons/apply/${testRestaurantId}`)
        .set("auth-token", accessToken)
        .send({ code: couponData.code });

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty("code");
    });

    it("should return 404 when coupon is not found", async () => {
      const response = await agent
        .post(`${API_VERSION}/coupons/apply/${testRestaurantId}`)
        .send(invalidCouponData);

      expect(response.status).toBe(404);
      expect(response.body).toBe(`Coupon: ${invalidCouponData.code} not found`);
    });
  });

  // Test suite for deleting a coupon
  describe("DELETE /coupons/:id", () => {
    it("should not allow a user to delete a coupon from another restaurant", async () => {
      const response = await agent
        .delete(`${API_VERSION}/coupons/${testCouponId}`)
        .set("auth-token", anotherAccessToken);

      expect(response.status).toBe(403); // Forbidden
      expect(response.body).toBe(
        "Unauthorized. You can only delete your own restaurant's coupons."
      );
    });
    it("should delete the coupon", async () => {
      const response = await agent
        .delete(`${API_VERSION}/coupons/${testCouponId}`)
        .set("auth-token", accessToken);

      expect(response.status).toBe(200);
      expect(response.body).toBe("Coupon deleted successfully");
    });

    it("should return 404 if the coupon not found", async () => {
      const response = await agent
        .delete(`${API_VERSION}/coupons/${fakeCouponId}`)
        .set("auth-token", accessToken);

      expect(response.status).toBe(404);
      expect(response.body).toBe("Coupon not found");
    });
  });
});
