import reportsMock from "../../mocks/reportsMock.json";

const mockReports = reportsMock.data;

export const getAllReports = async () => {
  return mockReports;
};

export const createReport = async (data) => {
  console.log("[Mock] createReport:", data);
  return { ...data, id: Date.now() };
};
