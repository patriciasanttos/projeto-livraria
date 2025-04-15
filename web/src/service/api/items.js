import { api } from "../api";

export const getAllItems = async () => {
  const { data } = await api.get("/items");

  return data;
};

export const getAllAvailablesItems = async () => {
  const { data } = await api.get("/items/available");

  return data;
};
