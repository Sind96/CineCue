import request from "supertest";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { app } from "../../app.js";
import { prisma } from "../../lib/prisma.js";
import { signAccessToken } from "../../utils/token.js";

vi.mock("../../lib/prisma.js", () => ({
  prisma: {
    user: {
      findUnique: vi.fn(),
    },
    watchlist: {
      findMany: vi.fn(),
      findUnique: vi.fn(),
      create: vi.fn(),
      delete: vi.fn(),
    },
  },
}));

beforeEach(() => {
  vi.clearAllMocks();
});

describe("GET /api/watchlist", () => {
  it("returns the authenticated user's watchlist", async () => {
    const user = {
      id: "user-123",
      name: "Sindhu",
      email: "sindhu@example.com",
    };

    const watchlistItems = [
      {
        id: "watchlist-1",
        userId: user.id,
        imdbId: "tt0816692",
        title: "Interstellar",
        posterUrl: "https://example.com/interstellar.jpg",
        releaseYear: 2014,
        rating: 87,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];

    vi.mocked(prisma.user.findUnique).mockResolvedValue(user as never);

    vi.mocked(prisma.watchlist.findMany).mockResolvedValue(
      watchlistItems as never,
    );

    const accessToken = signAccessToken({
      userId: user.id,
      type: "access",
    });

    const response = await request(app)
      .get("/api/watchlist")
      .set("Cookie", [`accessToken=${accessToken}`]);

    expect(response.status).toBe(200);
    expect(response.body.watchlist).toHaveLength(1);

    expect(response.body.watchlist[0]).toMatchObject({
      imdbId: "tt0816692",
      title: "Interstellar",
      releaseYear: 2014,
      rating: 87,
    });
  });
});

describe("POST /api/watchlist", () => {
  it("returns 409 when the movie already exists in the watchlist", async () => {
    const user = {
      id: "user-123",
      name: "Sindhu",
      email: "sindhu@example.com",
    };

    const existingWatchlistItem = {
      id: "watchlist-1",
      userId: user.id,
      imdbId: "tt0816692",
      title: "Interstellar",
      posterUrl: "https://example.com/interstellar.jpg",
      releaseYear: 2014,
      rating: 87,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    vi.mocked(prisma.user.findUnique).mockResolvedValue(user as never);

    vi.mocked(prisma.watchlist.findUnique).mockResolvedValue(
      existingWatchlistItem as never,
    );

    const accessToken = signAccessToken({
      userId: user.id,
      type: "access",
    });

    const response = await request(app)
      .post("/api/watchlist")
      .set("Cookie", [`accessToken=${accessToken}`])
      .send({
        imdbId: "tt0816692",
        title: "Interstellar",
        posterUrl: "https://example.com/interstellar.jpg",
        releaseYear: 2014,
        rating: 87,
      });

    expect(response.status).toBe(409);
    expect(response.body.message).toBe("Movie already in watchlist");
  });

  it("returns 201 when the movie is added to the watchlist", async () => {
    const user = {
      id: "user-123",
      name: "Sindhu",
      email: "sindhu@example.com",
    };

    const newWatchlistItem = {
      id: "watchlist-1",
      userId: user.id,
      imdbId: "tt0816692",
      title: "Interstellar",
      posterUrl: "https://example.com/interstellar.jpg",
      releaseYear: 2014,
      rating: 87,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    vi.mocked(prisma.user.findUnique).mockResolvedValue(user as never);

    vi.mocked(prisma.watchlist.findUnique).mockResolvedValue(null as never);

    vi.mocked(prisma.watchlist.create).mockResolvedValue(
      newWatchlistItem as never,
    );

    const accessToken = signAccessToken({
      userId: user.id,
      type: "access",
    });

    const response = await request(app)
      .post("/api/watchlist")
      .set("Cookie", [`accessToken=${accessToken}`])
      .send({
        imdbId: "tt0816692",
        title: "Interstellar",
        posterUrl: "https://example.com/interstellar.jpg",
        releaseYear: 2014,
        rating: 87,
      });

    expect(response.status).toBe(201);

    expect(response.body.watchlistItem).toMatchObject({
      imdbId: "tt0816692",
      title: "Interstellar",
      releaseYear: 2014,
      rating: 87,
    });
  });
});

describe("DELETE /api/watchlist/:imdbId", () => {
  it("returns 200 when the movie is removed from the watchlist", async () => {
    const user = {
      id: "user-123",
      name: "Sindhu",
      email: "sindhu@example.com",
    };

    const imdbId = "tt0816692";

    const deletedWatchlistItem = {
      id: "watchlist-1",
      userId: user.id,
      imdbId,
      title: "Interstellar",
      posterUrl: "https://example.com/interstellar.jpg",
      releaseYear: 2014,
      rating: 87,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    vi.mocked(prisma.user.findUnique).mockResolvedValue(user as never);

    vi.mocked(prisma.watchlist.delete).mockResolvedValue(
      deletedWatchlistItem as never,
    );

    const accessToken = signAccessToken({
      userId: user.id,
      type: "access",
    });

    const response = await request(app)
      .delete(`/api/watchlist/${imdbId}`)
      .set("Cookie", [`accessToken=${accessToken}`]);

    expect(response.status).toBe(200);
    expect(response.body.message).toBe("Movie removed from watchlist");
  });
});
