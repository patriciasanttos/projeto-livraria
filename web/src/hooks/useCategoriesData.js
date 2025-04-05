import { useQuery } from "@tanstack/react-query";
import { getAllCategories } from "../service/api/categories";

export const useCagegoriesData = () =>
  useQuery({
    queryKey: ["categories"],
    queryFn: getAllCategories,
    staleTime: 1000 * 60 * 5,
  });
