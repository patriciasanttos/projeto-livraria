import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getAllProducts,
  getAllAvailablesProducts,
  deleteProduct,
} from "../service/api/products";

export const useAllProductsData = () =>
  useQuery({
    queryKey: ["products"],
    queryFn: getAllProducts,
    staleTime: 1000 * 60 * 5,
  });

export const useAvailableProductsData = () =>
  useQuery({
    queryKey: ["availableProducts"],
    queryFn: getAllAvailablesProducts,
    staleTime: 1000 * 60 * 5,
  });

export const useDeleteProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id) => deleteProduct(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
    onError: (error) => {
      console.error("Error deleting product: ", error);
    },
  });
};
