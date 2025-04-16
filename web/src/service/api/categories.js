import { api } from "../api";

export const getAllCategories = async () => {
  const { data } = await api.get("/categories");

  return data;
};

export const deleteCategory = async (id) => {
  const { data } = await api.delete(`/categories/${id}`);

  return data;
};
