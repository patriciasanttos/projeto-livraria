import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createAdmin,
  deleteAdmin,
  getAllAdmins,
  updateAdmin,
} from "../service/api/admins";

export const useAdminsData = () =>
  useQuery({
    queryKey: ["admins"],
    queryFn: getAllAdmins,
    staleTime: 1000 * 60 * 5,
  });

export const useCreateAdmin = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data) => createAdmin(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admins"] });
    },
    onError: (error) => {
      console.error("Error creating admin: ", error);
    },
  });
};

export const useUpdateAdmin = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data) => updateAdmin(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admins"] });
    },
    onError: (error) => {
      console.error("Error updating admin: ", error);
    },
  });
};

export const useDeleteAdmin = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id) => deleteAdmin(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admins"] });
    },
    onError: (error) => {
      console.error("Error deleting admin: ", error);
    },
  });
};
