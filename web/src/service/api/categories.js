import { api } from "../api";

export const getAllCategories = async () => {
  const { data } = await api.get("/categories");

  return data;
};
