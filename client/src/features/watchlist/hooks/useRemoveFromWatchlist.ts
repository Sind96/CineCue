import { useMutation, useQueryClient } from "@tanstack/react-query";
import { removeFromWatchlist } from "../api/watchlist.api";
import type { WatchlistItem } from "../types/watchlist.types";

export const useRemoveFromWatchlist = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: removeFromWatchlist,

    onMutate: async (imdbId: string) => {
      await queryClient.cancelQueries({
        queryKey: ["watchlist"],
      });

      const previousWatchlist = queryClient.getQueryData<WatchlistItem[]>([
        "watchlist",
      ]);

      queryClient.setQueryData<WatchlistItem[]>(
        ["watchlist"],
        (currentWatchlist = []) =>
          currentWatchlist.filter((movie) => movie.imdbId !== imdbId),
      );

      return {
        previousWatchlist,
      };
    },

    onError: (_error, _imdbId, context) => {
      if (context?.previousWatchlist) {
        queryClient.setQueryData(["watchlist"], context.previousWatchlist);
      }
    },

    onSettled: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["watchlist"],
      });
    },
  });
};
