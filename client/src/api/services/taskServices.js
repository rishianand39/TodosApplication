import { API_GATEWAY_BASE_URL } from "../config/axiosConfig";

export const createTask = async (body) => {
  try {
    const response = await fetch(`${API_GATEWAY_BASE_URL}/task/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
      credentials: "include",
    });

    if (!response.ok) {
      const errorData = await response.json();
      return errorData;
    }
    const task = await response.json();
    return task;
  } catch (error) {}
};
