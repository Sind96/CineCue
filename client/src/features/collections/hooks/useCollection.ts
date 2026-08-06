import { useQuery } from "@tanstack/react-query";
import { getCollection } from "../api/collection.api";
import { queryKeys } from "../../../lib/queryKeys";
import { queryOptions } from "../../../lib/queryOptions";

export const useCollection = (collectionId?: string) => {
  return useQuery({
    queryKey: queryKeys.collections.detail(collectionId),
    queryFn: () => getCollection(collectionId as string),
    enabled: Boolean(collectionId),
    staleTime: queryOptions.collections.detailStaleTime,
  });
};
