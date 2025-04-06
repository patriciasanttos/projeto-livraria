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

export const validate = async () => {
  const response = await api
    .get("/admins/auth/me")
    .then((res) => res)
    .catch((err) => err);

  return response;
};
