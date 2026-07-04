import type { MovieSummary, StreamingApiShow } from "../types/movie.types.js";

export const mapToMovieSummary = (
  show: StreamingApiShow,
  countryCode = "gb",
): MovieSummary => {
  const streamingOptions = show.streamingOptions?.[countryCode] ?? [];

  return {
    externalId: show.id,
    imdbId: show.imdbId,
    tmdbId: show.tmdbId,
    title: show.title,
    overview: show.overview,
    releaseYear: show.releaseYear ?? 0,
    genres: show.genres ?? [],
    rating: show.rating ?? 0,
    posterUrl:
      show.imageSet?.verticalPoster?.w600 ??
      show.imageSet?.verticalPoster?.w480,
    backdropUrl:
      show.imageSet?.horizontalBackdrop?.w1080 ??
      show.imageSet?.horizontalBackdrop?.w720,
    streamingProviders: streamingOptions.map((option) => ({
      id: option.service.id,
      name: option.service.name,
      type: option.type,
      link: option.link,
      logoUrl:
        option.service.imageSet?.darkThemeImage ??
        option.service.imageSet?.lightThemeImage ??
        option.service.imageSet?.whiteImage,
      price: option.price?.formatted,
      expiresSoon: option.expiresSoon ?? false,
      expiresOn: option.expiresOn,
      availableSince: option.availableSince,
    })),
  };
};
