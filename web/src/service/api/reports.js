import { api } from "../api";

export const getAllReports = async () => {
  const { data } = await api.get("/reports");

  return {
    salesReports: data.salesReports,
    searchReports: data.searchReports,
  };
};
