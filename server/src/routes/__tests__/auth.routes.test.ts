import request from "supertest";
import { describe, expect, it, vi } from "vitest";
import { app } from "../../app.js";
import { signAccessToken } from "../../utils/token.js";
import { prisma } from "../../lib/prisma.js";

vi.mock("../../lib/prisma.js", () => ({
  prisma: {
    user: {
      findUnique: vi.fn(),
    },
  },
}));

describe("POST /api/auth/register", () => {
  it("returns 400 when registration data is invalid", async () => {
    const response = await request(app).post("/api/auth/register").send({
      name: "",
      email: "not-an-email",
      password: "short",
    });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe("Name is required");
  });
});

describe("GET /api/auth/me", () => {
  it("returns 401 when no access token is provided", async () => {
    const response = await request(app).get("/api/auth/me");

    expect(response.status).toBe(401);
    expect(response.body.message).toBe("Authentication required");
  });

  it("returns 401 when an invalid access token is provided", async () => {
    const response = await request(app)
      .get("/api/auth/me")
      .set("Cookie", ["accessToken=not-a-valid-token"]);

    expect(response.status).toBe(401);
    expect(response.body.message).toBe("Authentication required");
  });

  it("returns the authenticated user when the access token is valid", async () => {
    const user = {
      id: "user-123",
      name: "Sindhu",
      email: "sindhu@example.com",
    };

    vi.mocked(prisma.user.findUnique).mockResolvedValue(user as never);

    const accessToken = signAccessToken({
      userId: user.id,
      type: "access",
    });

    const response = await request(app)
      .get("/api/auth/me")
      .set("Cookie", [`accessToken=${accessToken}`]);

    expect(response.status).toBe(200);
    expect(response.body.user).toEqual(user);
  });
});
