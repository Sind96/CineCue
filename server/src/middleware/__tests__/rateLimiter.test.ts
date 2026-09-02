import express from "express";
import request from "supertest";
import { describe, expect, it } from "vitest";
import { authLimiter } from "../rateLimiter.js";

const testApp = express();

testApp.post("/login", authLimiter, (_req, res) => {
  res.status(200).json({ message: "Login reached" });
});

describe("POST /login", () => {
  it("returns 429 after exceeding the authentication rate limit", async () => {
    for (let i = 0; i < 10; i++) {
      const response = await request(testApp).post("/login");

      expect(response.status).toBe(200);
    }

    const response = await request(testApp).post("/login");

    expect(response.status).toBe(429);
    expect(response.body).toEqual({
      error: "Too many authentication attempts. Please try again later.",
    });
  });
});
