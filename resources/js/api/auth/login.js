import Cookies from "js-cookie";
import apiClient from "./../axiosConfig.js";

export const login = async (email, password) => {
  const response = await apiClient.post("/api/login", { email, password });
  return response.data;
};

export const logout = async () => {
  await apiClient.post("/api/logout");
  Cookies.remove("token");
  Cookies.remove("user");
};