const baseUrl = "http://127.0.0.1:3000/";

export const getFavouriteList = async () => {
  const movieList = await fetch(baseUrl);
  const result = await movieList.json();
  return result;
};

export const addToFavouriteList = async (movie: any) => {
  console.log(movie, "api");
  const response = await fetch(baseUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      imdbId: movie.imdbId,
      title: movie.title,
      imageURL: movie.imageSet.horizontalPoster.w1440,
    }),
  });
  const result = await response.json();
  return result;
};
