import { useQuery } from "@tanstack/react-query";
import { getWatchlist } from "../api/watchlist.api";
import { queryKeys } from "../../../lib/queryKeys";
import { queryOptions } from "../../../lib/queryOptions";

export const useWatchlist = () => {
  return useQuery({
    queryKey: queryKeys.watchlist.all,
    queryFn: getWatchlist,
    staleTime: queryOptions.watchlist.staleTime,
  });
};
