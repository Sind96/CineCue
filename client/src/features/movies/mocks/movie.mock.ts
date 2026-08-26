import type { Movie } from "../types/movie.types";

export const mockMovies: Movie[] = [
  {
    externalId: "mock-interstellar",
    imdbId: "tt0816692",
    tmdbId: "157336",
    title: "Interstellar",
    overview:
      "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival.",
    releaseYear: 2014,
    genres: [
      { id: "science-fiction", name: "Science Fiction" },
      { id: "drama", name: "Drama" },
    ],
    rating: 8.7,
    posterUrl:
      "https://image.tmdb.org/t/p/w500/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg",
    backdropUrl:
      "https://image.tmdb.org/t/p/original/xJHokMbljvjADYdit5fK5VQsXEG.jpg",
    streamingProviders: [
      {
        id: "mock-provider-1",
        name: "MockFlix",
        type: "subscription",
        link: "#",
        expiresSoon: false,
      },
    ],
  },
  {
    externalId: "mock-inception",
    imdbId: "tt1375666",
    tmdbId: "27205",
    title: "Inception",
    overview:
      "A skilled thief enters people's dreams to steal information and is given a chance to erase his past.",
    releaseYear: 2010,
    genres: [
      { id: "science-fiction", name: "Science Fiction" },
      { id: "thriller", name: "Thriller" },
    ],
    rating: 8.8,
    posterUrl:
      "https://image.tmdb.org/t/p/w500/oYuLEt3zVCKq57qu2F8dT7NIa6f.jpg",
    backdropUrl:
      "https://image.tmdb.org/t/p/original/s3TBrRGB1iav7gFOCNx3H31MoES.jpg",
    streamingProviders: [],
  },
  {
    externalId: "mock-dark-knight",
    imdbId: "tt0468569",
    tmdbId: "155",
    title: "The Dark Knight",
    overview:
      "Batman faces a criminal mastermind whose reign of chaos pushes Gotham and its heroes to their limits.",
    releaseYear: 2008,
    genres: [
      { id: "action", name: "Action" },
      { id: "crime", name: "Crime" },
      { id: "drama", name: "Drama" },
    ],
    rating: 9,
    posterUrl:
      "https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haRef0WH.jpg",
    backdropUrl:
      "https://image.tmdb.org/t/p/original/hkBaDkMWbLaf8B1lsWsKX7Ew3Xq.jpg",
    streamingProviders: [],
  },
  {
    externalId: "mock-spirited-away",
    imdbId: "tt0245429",
    tmdbId: "129",
    title: "Spirited Away",
    overview:
      "A young girl enters a mysterious world ruled by spirits and must find a way to rescue her parents.",
    releaseYear: 2001,
    genres: [
      { id: "animation", name: "Animation" },
      { id: "fantasy", name: "Fantasy" },
    ],
    rating: 8.6,
    streamingProviders: [],
  },
];
