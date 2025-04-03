import { api } from "../api";

export const getAllAvailablesItems = async () => {
  const { data } = await api.get("/items/available");

  return data;
};
