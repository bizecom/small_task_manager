import apiClient from "./axiosConfig.js.js";

export const getTasks = async (page = 1, perPage = 5) => {
  try {
    const response = await apiClient.get(`/api/tasks?page=${page}&per_page=${perPage}`);
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || "An error occurred during registration.";
  }
};

// Create a new task
export const createTask = async (taskData) => {
  try {
    const response = await apiClient.post("/api/tasks", taskData);
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || "An error occurred while creating the task.";
  }
};

// Update an existing task
export const updateTask = async (id, updatedData) => {
  try {
    const response = await apiClient.put(`/api/tasks/${id}`, updatedData);
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || "An error occurred while updating the task.";
  }
};

// Delete a task
export const deleteTask = async (id) => {
  try {
    await apiClient.delete(`/api/tasks/${id}`);
  } catch (error) {
    throw error.response?.data?.message || "An error occurred while deleting the task.";
  }
};