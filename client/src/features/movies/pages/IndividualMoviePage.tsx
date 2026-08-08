import { MdOutlineStarOutline } from "react-icons/md";
import { useParams } from "react-router-dom";
import Navbar from "../../../components/navigation/Navbar";
import AddToWatchlistButton from "../../watchlist/components/AddToWatchlistButton";
import { useMovie } from "../hooks/useMovie";
import AddToCollectionButton from "../../collections/components/AddToCollectionButton";
import { ScaleLoader } from "react-spinners";

const IndividualMoviePage = () => {
  const { imdbID } = useParams();
  const movieQuery = useMovie(imdbID);
  const movie = movieQuery.data;

  if (movieQuery.isPending) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-black pt-100">
        <ScaleLoader color="#e50914" />
      </div>
    );
  }

  if (movieQuery.isError || !movie) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-black text-white">
        Movie details could not be loaded.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      <Navbar />

      <section className="relative w-full h-[65vh] sm:h-[70vh] lg:h-[80vh]">
        <img
          src={movie?.backdropUrl ?? movie?.posterUrl}
          alt={movie?.title}
          className="absolute inset-0 w-full h-full object-top object-cover"
        />

        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent/80 to-black flex items-end">
          <div className="px-6 md:px-12 pb-10 max-w-4xl">
            <h1 className="text-3xl md:text-5xl font-bold drop-shadow-lg">
              {movie?.title}
            </h1>
            <div className="flex items-center gap-2 mt-4">
              <MdOutlineStarOutline className="text-yellow-400 text-3xl" />
              <p className="text-lg font-semibold">
                {movie?.rating ? `${movie.rating}/100` : "N/A"}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 md:px-12 py-8 space-y-6">
        {movie?.genres && (
          <div className="flex flex-wrap gap-2">
            {movie.genres.map((g) => (
              <span
                key={g.id}
                className="bg-red-600 px-3 py-1 rounded-full text-sm font-medium"
              >
                {g.name}
              </span>
            ))}
          </div>
        )}

        <p className="text-gray-300 leading-relaxed">{movie?.overview}</p>

        {movie?.streamingProviders.length > 0 && (
          <div>
            <p className="font-bold mb-2">Watch Now On:</p>

            <div className="flex flex-wrap gap-4">
              {movie.streamingProviders.map((provider) => (
                <a
                  key={`${provider.id}-${provider.type}-${provider.link}`}
                  href={provider.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transform hover:scale-105 transition duration-300"
                >
                  {provider.logoUrl ? (
                    <img
                      src={provider.logoUrl}
                      alt={provider.name}
                      className="w-20 rounded-md shadow-md"
                    />
                  ) : (
                    <span>{provider.name}</span>
                  )}
                </a>
              ))}
            </div>
          </div>
        )}

        {movie && (
          <div className="flex flex-wrap justify-center gap-4">
            <AddToWatchlistButton
              imdbId={movie.imdbId}
              title={movie.title}
              posterUrl={movie.posterUrl}
              releaseYear={movie.releaseYear}
              rating={movie.rating}
            />

            <AddToCollectionButton
              imdbId={movie.imdbId}
              title={movie.title}
              year={movie.releaseYear}
              posterUrl={movie.posterUrl}
              overview={movie.overview}
              genres={movie.genres.map((genre) => genre.id)}
              externalSource={movie.externalId}
            />
          </div>
        )}
      </section>
    </div>
  );
};

export default IndividualMoviePage;
