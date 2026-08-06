import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteCollection } from "../api/collection.api";
import { queryKeys } from "../../../lib/queryKeys";

export const useDeleteCollection = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteCollection,

    onSuccess: async (_data, collectionId) => {
      queryClient.removeQueries({
        queryKey: queryKeys.collections.detail(collectionId),
      });

      await queryClient.invalidateQueries({
        queryKey: queryKeys.collections.all,
      });
    },
  });
};
