const ONE_MINUTE = 1000 * 60;

export const queryOptions = {
  movies: {
    homepageStaleTime: ONE_MINUTE * 10,
    detailStaleTime: ONE_MINUTE * 30,
    genreStaleTime: ONE_MINUTE * 10,
  },

  watchlist: {
    staleTime: 0,
  },
  collections: {
    listStaleTime: ONE_MINUTE * 5,
    detailStaleTime: ONE_MINUTE * 5,
  },
};
