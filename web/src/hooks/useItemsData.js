import { useQuery } from "@tanstack/react-query";
import { getAllAvailablesItems } from "../service/api/items";

export const useAvailableItemsData = () =>
  useQuery({
    queryKey: ["availableItems"],
    queryFn: getAllAvailablesItems,
    staleTime: 1000 * 60 * 5,
  });
