import { api } from "../api";

export const login = async (email, password) => {
  const response = await api
    .get("/admins/login", {
      headers: {
        Authorization: `${email}:${password}`,
      },
    })
    .then((res) => res)
    .catch((err) => err);

  return response;
};

export const logout = async () => {
  const response = await api
    .get("/admins/logout")
    .then((res) => res)
    .catch((err) => err);

  return response;
};

export const validate = async () => {
  const response = await api
    .get("/admins/auth/me")
    .then((res) => res)
    .catch((err) => err);

  return response;
};

export const getAllAdmins = async () => {
  const { data } = await api.get("/admins");

  return data;
};

export const createAdmin = async (newData) => {
  const { data } = await api.post("/admins", newData);

  return data;
};

export const updateAdmin = async (updatedData) => {
  const { data } = await api.put("/admins", updatedData);

  return data;
};

export const deleteAdmin = async (id) => {
  const { data } = await api.delete(`/admins/${id}`);

  return data;
};
