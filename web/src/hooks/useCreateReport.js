import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createReport } from "../service/api/reports";

export const useCreateReport = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data) => createReport(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["reports"] });
    },
    onError: (error) => {
      console.error("Error creating report", error);
    },
  });
};
