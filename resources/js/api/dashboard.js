import apiClient from "./axiosConfig.js.js";

export const dashboard = async () => {
  try {
    const response = await apiClient.get("/api/dashboard");
    console.log("response", response);
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || "An error occurred during registration.";
  }
};
