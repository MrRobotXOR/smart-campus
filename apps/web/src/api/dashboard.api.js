import api from "./client";

export const getDashboardApi = async () => {
  const { data } = await api.get("/dashboard");
  return data;
};