import { api } from "../api";
import { categoriesMock } from "../../mocks/apiMocks";

export const getAllCategories = async () => {
  try {
    const { data } = await api.get("/categories");
    return data;
  } catch {
    console.warn("API indisponível — usando dados mockeados para categorias");
    return categoriesMock;
  }
};

export const getAllAvailableCategories = async () => {
  try {
    const { data } = await api.get("/categories/available");
    return data;
  } catch {
    console.warn("API indisponível — usando dados mockeados para categorias");
    return categoriesMock;
  }
};

export const createCategory = async (newData) => {
  const { data } = await api.post("/categories", newData);

  return data;
};

export const updateCategory = async (updatedData) => {
  const { data } = await api.put("/categories", updatedData);

  return data;
};

export const deleteCategory = async (id) => {
  const { data } = await api.delete(`/categories/${id}`);

  return data;
};

export const addProductToCategory = async (categoryId, productId) => {
  const { data } = await api.patch(
    `/categories/${categoryId}/items/${productId}/add`
  );

  return data;
};

export const removeProductFromCategory = async (categoryId, productId) => {
  const { data } = await api.patch(
    `/categories/${categoryId}/items/${productId}/remove`
  );

  return data;
};
