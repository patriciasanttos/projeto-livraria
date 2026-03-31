import { api } from "../api";
import { productsMock } from "../../mocks/apiMocks";

export const getAllProducts = async () => {
  try {
    const { data } = await api.get("/items");
    return data;
  } catch {
    console.warn("API indisponível — usando dados mockeados para produtos");
    return productsMock;
  }
};

export const getAllAvailableProducts = async () => {
  try {
    const { data } = await api.get("/items/available");
    return data;
  } catch {
    console.warn("API indisponível — usando dados mockeados para produtos");
    return productsMock;
  }
};

export const createProduct = async (neData) => {
  const { data } = await api.post("/items", neData);

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
