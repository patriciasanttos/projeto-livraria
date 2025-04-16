import { api } from "../api";

export const getAllProducts = async () => {
  const { data } = await api.get("/items");

  return data;
};

export const getAllAvailablesProducts = async () => {
  const { data } = await api.get("/items/available");

  return data;
};

export const updateProduct = async (updatedData) => {
  const { data } = await api.put("/items", updatedData);

  return data;
};

export const deleteProduct = async (id) => {
  const { data } = await api.delete(`/items/${id}`);

  return data;
};
