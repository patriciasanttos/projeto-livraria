import { useQuery } from "@tanstack/react-query";
import { getAllReports } from "../service/api/reports";

export const useReportsData = () =>
  useQuery({
    queryKey: ["reports"],
    queryFn: getAllReports,
    staleTime: 1000 * 60 * 5,
  });
