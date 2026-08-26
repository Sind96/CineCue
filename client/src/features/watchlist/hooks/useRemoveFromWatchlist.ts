import { useMutation, useQueryClient } from "@tanstack/react-query";
import { removeFromWatchlist } from "../api/watchlist.api";
import type { WatchlistItem } from "../types/watchlist.types";
import { queryKeys } from "../../../lib/queryKeys";

export const useRemoveFromWatchlist = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: removeFromWatchlist,

    onMutate: async (imdbId: string) => {
      await queryClient.cancelQueries({
        queryKey: queryKeys.watchlist.all,
      });

      const previousWatchlist = queryClient.getQueryData<WatchlistItem[]>(
        queryKeys.watchlist.all,
      );

      queryClient.setQueryData<WatchlistItem[]>(
        queryKeys.watchlist.all,
        (currentWatchlist = []) =>
          currentWatchlist.filter((movie) => movie.imdbId !== imdbId),
      );

      return {
        previousWatchlist,
      };
    },

    onError: (_error, _imdbId, context) => {
      if (context?.previousWatchlist) {
        queryClient.setQueryData(
          queryKeys.watchlist.all,
          context.previousWatchlist,
        );
      }
    },

    onSettled: async () => {
      await queryClient.invalidateQueries({
        queryKey: queryKeys.watchlist.all,
      });
    },
  });
};
