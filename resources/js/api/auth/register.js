import apiClient from "./../axiosConfig.js";

export const register = async (data) => {
  try {
    const response = await apiClient.post("/api/register", data);
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || "An error occurred during registration.";
  }
};
