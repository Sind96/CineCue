import type { RouletteMovie } from "./MovieRoulette";
import MovieRoulette from "./MovieRoulette";

type MovieRouletteModalProps = {
  isOpen: boolean;
  onClose: () => void;
  movies: RouletteMovie[];
};

const MovieRouletteModal = ({
  isOpen,
  onClose,
  movies,
}: MovieRouletteModalProps) => {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4">
      <div className="relative w-full max-w-2xl min-h-[720px]">
        {" "}
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 z-10 rounded-full bg-black/60 px-3 py-1 text-lg text-white transition hover:bg-black"
          aria-label="Close movie roulette"
        >
          ×
        </button>
        <MovieRoulette movies={movies} />
      </div>
    </div>
  );
};

export default MovieRouletteModal;
