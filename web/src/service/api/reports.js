import { api } from "../api";

export const getAllReports = async () => {
  const { data } = await api.get("/reports");

  return data;
};

export const createReport = async (data) => {
  const response = await api.post("/reports", data);

  return response.data;
};
