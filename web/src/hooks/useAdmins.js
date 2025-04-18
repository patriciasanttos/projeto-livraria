import { useQuery } from "@tanstack/react-query";
import { getAllAdmins } from "../service/api/admins";

export const useAdminsData = () =>
  useQuery({
    queryKey: ["admins"],
    queryFn: getAllAdmins,
    staleTime: 1000 * 60 * 5,
  });
