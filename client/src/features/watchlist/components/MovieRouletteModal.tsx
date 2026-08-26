import { X } from "lucide-react";
import type { RouletteMovie } from "./MovieRoulette";
import MovieRoulette from "./MovieRoulette";
import { useEffect } from "react";

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
  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 px-4 py-8 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Movie roulette"
        className="relative max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-2xl border border-border bg-surface shadow-2xl"
        onClick={(event) => event.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close movie roulette"
          className="absolute right-4 top-4 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-surface-elevated text-muted-foreground transition hover:text-foreground"
        >
          <X className="h-5 w-5" />
        </button>

        <MovieRoulette movies={movies} />
      </div>
    </div>
  );
};

export default MovieRouletteModal;
