import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addToWatchlist } from "../api/watchlist.api";

export const useAddToWatchlist = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addToWatchlist,

    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["watchlist"],
      });
    },
  });
};
