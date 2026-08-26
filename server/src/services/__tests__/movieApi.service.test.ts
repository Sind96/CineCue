import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { clearCache } from "../../lib/cache.js";
import { getTopMovies } from "../movieApi.service.js";

const mockFetch = vi.fn();

vi.stubGlobal("fetch", mockFetch);

beforeEach(() => {
  clearCache();
  vi.clearAllMocks();
});

afterEach(() => {
  vi.useRealTimers();
});

describe("getTopMovies", () => {
  it("uses the cached result after the first API request", async () => {
    const apiResponse = {
      shows: [
        {
          id: "tt0816692",
          imdbId: "tt0816692",
          title: "Interstellar",
          releaseYear: 2014,
          rating: 87,
        },
      ],
    };

    mockFetch.mockResolvedValue({
      ok: true,
      json: vi.fn().mockResolvedValue(apiResponse),
    });

    const firstResult = await getTopMovies("gb");
    const secondResult = await getTopMovies("gb");

    expect(firstResult).toEqual(secondResult);

    expect(mockFetch).toHaveBeenCalledTimes(1);
  });

  it("fetches again after the cached result expires", async () => {
    vi.useFakeTimers();

    const apiResponse = {
      shows: [
        {
          id: "tt0816692",
          imdbId: "tt0816692",
          title: "Interstellar",
          releaseYear: 2014,
          rating: 87,
        },
      ],
    };

    mockFetch.mockResolvedValue({
      ok: true,
      json: vi.fn().mockResolvedValue(apiResponse),
    });

    await getTopMovies("gb");

    expect(mockFetch).toHaveBeenCalledTimes(1);

    vi.advanceTimersByTime(1000 * 60 * 60 + 1);

    await getTopMovies("gb");

    expect(mockFetch).toHaveBeenCalledTimes(2);
  });
});
