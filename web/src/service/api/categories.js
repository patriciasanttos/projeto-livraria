import categoriesMock from "../../mocks/categoriesMocks.json";

const mockCategories = categoriesMock.data;

export const getAllCategories = async () => {
  return mockCategories;
};

export const getAllAvailableCategories = async () => {
  return mockCategories;
};

export const createCategory = async (newData) => {
  console.log("[Mock] createCategory:", newData);
  return { ...newData, id: Date.now() };
};

export const updateCategory = async (updatedData) => {
  console.log("[Mock] updateCategory:", updatedData);
  return updatedData;
};

export const deleteCategory = async (id) => {
  console.log("[Mock] deleteCategory:", id);
  return { id };
};

export const addProductToCategory = async (categoryId, productId) => {
  console.log("[Mock] addProductToCategory:", categoryId, productId);
  return { categoryId, productId };
};

export const removeProductFromCategory = async (categoryId, productId) => {
  console.log("[Mock] removeProductFromCategory:", categoryId, productId);
  return { categoryId, productId };
};
