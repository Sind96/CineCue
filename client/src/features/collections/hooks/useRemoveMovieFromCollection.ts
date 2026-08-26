import { useMutation, useQueryClient } from "@tanstack/react-query";
import { removeMovieFromCollection } from "../api/collection.api";
import { queryKeys } from "../../../lib/queryKeys";

export const useRemoveMovieFromCollection = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: removeMovieFromCollection,

    onSuccess: async (_data, variables) => {
      await queryClient.invalidateQueries({
        queryKey: queryKeys.collections.detail(variables.collectionId),
      });
    },
  });
};
