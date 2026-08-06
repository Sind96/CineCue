import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createCollection } from "../api/collection.api";
import { queryKeys } from "../../../lib/queryKeys";

export const useCreateCollection = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createCollection,

    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: queryKeys.collections.all,
      });
    },
  });
};
