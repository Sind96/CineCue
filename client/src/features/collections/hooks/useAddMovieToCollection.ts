import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addMovieToCollection } from "../api/collection.api";
import { queryKeys } from "../../../lib/queryKeys";

export const useAddMovieToCollection = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addMovieToCollection,

    onSuccess: async (_collectionMovie, variables) => {
      await queryClient.invalidateQueries({
        queryKey: queryKeys.collections.detail(variables.collectionId),
      });
    },
  });
};
