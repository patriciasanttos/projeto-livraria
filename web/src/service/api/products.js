import productsMock from "../../mocks/productsMock.json";

const mockProducts = productsMock.data;

export const getAllProducts = async () => {
  return mockProducts;
};

export const getAllAvailableProducts = async () => {
  return mockProducts.filter(product => product.status === true);
};

export const createProduct = async (newData) => {
  console.log("[Mock] createProduct:", newData);
  return { ...newData, id: Date.now() };
};

export const updateProduct = async (updatedData) => {
  console.log("[Mock] updateProduct:", updatedData);
  return updatedData;
};

export const deleteProduct = async (id) => {
  console.log("[Mock] deleteProduct:", id);
  return { id };
};
