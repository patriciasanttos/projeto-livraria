import { api } from "../api";

export const getAllReports = async () => {
  const { data } = await api.get("/reports");

  return {
    salesReports: data.salesReports,
    searchReports: data.searchReports,
  };
};

export const createReport = async (data) => {
  const response = await api.post("/reports", data);

  console.log(response);

  return response.data;
};
