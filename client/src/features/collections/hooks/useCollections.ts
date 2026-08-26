import { useQuery } from "@tanstack/react-query";
import { getCollections } from "../api/collection.api";
import { queryKeys } from "../../../lib/queryKeys";
import { queryOptions } from "../../../lib/queryOptions";

export const useCollections = () => {
  return useQuery({
    queryKey: queryKeys.collections.all,
    queryFn: getCollections,
    staleTime: queryOptions.collections.listStaleTime,
  });
};
