import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateCollection } from "../api/collection.api";
import { queryKeys } from "../../../lib/queryKeys";

export const useUpdateCollection = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateCollection,

    onSuccess: (_collection, variables) => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.collections.detail(variables.collectionId),
      });

      queryClient.invalidateQueries({
        queryKey: queryKeys.collections.all,
      });
    },
  });
};
