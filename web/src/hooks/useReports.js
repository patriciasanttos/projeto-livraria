import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getAllReports, createReport } from "../service/api/reports";

export const useReportsData = () =>
  useQuery({
    queryKey: ["reports"],
    queryFn: getAllReports,
    staleTime: 1000 * 60 * 5,
  });

export const useCreateReport = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data) => createReport(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["reports"] });
    },
    onError: (error) => {
      console.error("Error creating report: ", error);
    },
  });
};
