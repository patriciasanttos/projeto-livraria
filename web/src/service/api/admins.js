import adminsMock from "../../mocks/adminsMock.json";

const mockAdmins = adminsMock.data;

export const login = async (email, password) => {
  console.log("[Mock] login:", email);
  const admin = mockAdmins.find(a => a.email === email);
  if (admin) {
    return { status: 200, data: admin };
  }
  return { status: 401, data: { message: "Credenciais inválidas" } };
};

export const logout = async () => {
  console.log("[Mock] logout");
  return { status: 200, data: { message: "Logout realizado com sucesso" } };
};

export const validate = async () => {
  console.log("[Mock] validate");
  return { status: 200, data: mockAdmins[0] };
};

export const getAllAdmins = async () => {
  return mockAdmins;
};

export const createAdmin = async (newData) => {
  console.log("[Mock] createAdmin:", newData);
  return { ...newData, id: Date.now() };
};

export const updateAdmin = async (updatedData) => {
  console.log("[Mock] updateAdmin:", updatedData);
  return updatedData;
};

export const deleteAdmin = async (id) => {
  console.log("[Mock] deleteAdmin:", id);
  return { id };
};
