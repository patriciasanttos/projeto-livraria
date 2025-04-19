import { api } from "../api";

export const getAllCategories = async () => {
  const { data } = await api.get("/categories");

  return data;
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
