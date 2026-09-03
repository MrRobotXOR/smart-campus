import api from "./client";

export const loginApi = async (data) => {
  const response = await api.post("/auth/login", data);
  return response.data;
};

export const registerApi = async (data) => {
  const response = await api.post("/auth/register", data);
  return response.data;
};

export const getCurrentUserApi = async (token) => {
  const response = await api.get("/auth/me", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};