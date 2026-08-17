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
    collection: {
      findMany: vi.fn(),
      findFirst: vi.fn(),
      create: vi.fn(),
      update: vi.fn(),
      delete: vi.fn(),
    },
    movie: {
      findUnique: vi.fn(),
      upsert: vi.fn(),
    },
    collectionMovie: {
      findUnique: vi.fn(),
      create: vi.fn(),
      delete: vi.fn(),
    },
  },
}));

beforeEach(() => {
  vi.clearAllMocks();
});

describe("GET /api/collections", () => {
  it("returns the authenticated user's collections", async () => {
    const user = {
      id: "user-123",
      name: "Sindhu",
      email: "sindhu@example.com",
    };

    const collections = [
      {
        id: "collection-1",
        ownerId: user.id,
        name: "Friday Night Movies",
        description: "Movies to watch on Friday",
        visibility: "PRIVATE",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];

    vi.mocked(prisma.user.findUnique).mockResolvedValue(user as never);

    vi.mocked(prisma.collection.findMany).mockResolvedValue(
      collections as never,
    );

    const accessToken = signAccessToken({
      userId: user.id,
      type: "access",
    });

    const response = await request(app)
      .get("/api/collections")
      .set("Cookie", [`accessToken=${accessToken}`]);

    expect(response.status).toBe(200);
    expect(response.body.collections).toHaveLength(1);

    expect(response.body.collections[0]).toMatchObject({
      id: "collection-1",
      name: "Friday Night Movies",
      description: "Movies to watch on Friday",
    });
  });
});

describe("POST /api/collections", () => {
  it("returns 201 when a collection is created", async () => {
    const user = {
      id: "user-123",
      name: "Sindhu",
      email: "sindhu@example.com",
    };

    const newCollection = {
      id: "collection-1",
      ownerId: user.id,
      name: "Friday Night Movies",
      description: "Movies to watch on Friday",
      visibility: "PRIVATE",
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    vi.mocked(prisma.user.findUnique).mockResolvedValue(user as never);

    vi.mocked(prisma.collection.create).mockResolvedValue(
      newCollection as never,
    );

    const accessToken = signAccessToken({
      userId: user.id,
      type: "access",
    });

    const response = await request(app)
      .post("/api/collections")
      .set("Cookie", [`accessToken=${accessToken}`])
      .send({
        name: "Friday Night Movies",
        description: "Movies to watch on Friday",
      });

    expect(response.status).toBe(201);

    expect(response.body.collection).toMatchObject({
      id: "collection-1",
      name: "Friday Night Movies",
      description: "Movies to watch on Friday",
    });
  });
});

describe("GET /api/collections/:collectionId", () => {
  it("returns 404 when the collection cannot be found for the authenticated user", async () => {
    const user = {
      id: "user-123",
      name: "Sindhu",
      email: "sindhu@example.com",
    };

    vi.mocked(prisma.user.findUnique).mockResolvedValue(user as never);

    vi.mocked(prisma.collection.findFirst).mockResolvedValue(null as never);

    const accessToken = signAccessToken({
      userId: user.id,
      type: "access",
    });

    const response = await request(app)
      .get("/api/collections/collection-999")
      .set("Cookie", [`accessToken=${accessToken}`]);

    expect(response.status).toBe(404);
    expect(response.body.message).toBe("Collection not found");
  });
});

describe("POST /api/collections/:collectionId/movies", () => {
  it("returns 201 when a movie is successfully added to a collection", async () => {
    const user = {
      id: "user-123",
      name: "Sindhu",
      email: "sindhu@example.com",
    };

    const collection = {
      id: "collection-1",
      ownerId: user.id,
      name: "Friday Night Movies",
      description: "Movies to watch on Friday",
      visibility: "PRIVATE",
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const movie = {
      id: "movie-1",
      imdbId: "tt0816692",
      title: "Interstellar",
      year: 2014,
      posterUrl: "https://example.com/interstellar.jpg",
      overview: "Test",
      runtimeMinutes: 169,
      genres: ["scifi", "drama"],
      externalSource: "streaming-availability",
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const collectionMovie = {
      id: "collection-movie-1",
      collectionId: collection.id,
      movieId: movie.id,
      addedById: user.id,
      createdAt: new Date(),
      movie,
    };

    vi.mocked(prisma.user.findUnique).mockResolvedValue(user as never);

    vi.mocked(prisma.collection.findFirst).mockResolvedValue(
      collection as never,
    );

    vi.mocked(prisma.movie.upsert).mockResolvedValue(movie as never);

    vi.mocked(prisma.collectionMovie.findUnique).mockResolvedValue(
      null as never,
    );

    vi.mocked(prisma.collectionMovie.create).mockResolvedValue(
      collectionMovie as never,
    );

    const accessToken = signAccessToken({
      userId: user.id,
      type: "access",
    });

    const response = await request(app)
      .post(`/api/collections/${collection.id}/movies`)
      .set("Cookie", [`accessToken=${accessToken}`])
      .send({
        imdbId: movie.imdbId,
        title: movie.title,
        year: movie.year,
        posterUrl: movie.posterUrl,
        overview: movie.overview,
        runtimeMinutes: movie.runtimeMinutes,
        genres: movie.genres,
        externalSource: movie.externalSource,
      });

    expect(response.status).toBe(201);

    expect(response.body.collectionMovie).toMatchObject({
      collectionId: collection.id,
      movieId: movie.id,
      addedById: user.id,
      movie: {
        imdbId: "tt0816692",
        title: "Interstellar",
      },
    });
  });

  it("returns 409 when a duplicate movie is added to a collection", async () => {
    const user = {
      id: "user-123",
      name: "Sindhu",
      email: "sindhu@example.com",
    };

    const collection = {
      id: "collection-1",
      ownerId: user.id,
      name: "Friday Night Movies",
      description: "Movies to watch on Friday",
      visibility: "PRIVATE",
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const movie = {
      id: "movie-1",
      imdbId: "tt0816692",
      title: "Interstellar",
      year: 2014,
      posterUrl: "https://example.com/interstellar.jpg",
      overview: "Test",
      runtimeMinutes: 169,
      genres: ["scifi", "drama"],
      externalSource: "streaming-availability",
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const existingCollectionMovie = {
      id: "collection-movie-1",
      collectionId: collection.id,
      movieId: movie.id,
      addedById: user.id,
      createdAt: new Date(),
      movie,
    };

    vi.mocked(prisma.user.findUnique).mockResolvedValue(user as never);

    vi.mocked(prisma.collection.findFirst).mockResolvedValue(
      collection as never,
    );

    vi.mocked(prisma.movie.upsert).mockResolvedValue(movie as never);

    vi.mocked(prisma.collectionMovie.findUnique).mockResolvedValue(
      existingCollectionMovie as never,
    );

    const accessToken = signAccessToken({
      userId: user.id,
      type: "access",
    });

    const response = await request(app)
      .post(`/api/collections/${collection.id}/movies`)
      .set("Cookie", [`accessToken=${accessToken}`])
      .send({
        imdbId: movie.imdbId,
        title: movie.title,
        year: movie.year,
        posterUrl: movie.posterUrl,
        overview: movie.overview,
        runtimeMinutes: movie.runtimeMinutes,
        genres: movie.genres,
        externalSource: movie.externalSource,
      });

    expect(response.status).toBe(409);
    expect(response.body.message).toBe(
      "Movie already exists in this collection",
    );

    expect(prisma.collectionMovie.create).not.toHaveBeenCalled();
  });
});
