import { useQuery } from "@tanstack/react-query";
import { getAllItems, getAllAvailablesItems } from "../service/api/items";

export const useAllItemsData = () =>
  useQuery({
    queryKey: ["items"],
    queryFn: getAllItems,
    staleTime: 1000 * 60 * 5,
  });

export const useAvailableItemsData = () =>
  useQuery({
    queryKey: ["availableItems"],
    queryFn: getAllAvailablesItems,
    staleTime: 1000 * 60 * 5,
  });
