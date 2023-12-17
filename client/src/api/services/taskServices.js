import { API_GATEWAY_BASE_URL } from "../config/axiosConfig";

export const createTask = async (body) => {
  try {
    const response = await fetch(`${API_GATEWAY_BASE_URL}/task/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
      credentials: 'include',
    });

    if (!response.ok) {
      const errorData = await response.json();
      return errorData;
    }
    const task = await response.json();
    return task;
  } catch (error) {}
};

export const fetchTasks = async (search) => {
  try {
    const response = await fetch(`${API_GATEWAY_BASE_URL}/task${search}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: 'include',
    });

    if (!response.ok) {
      const errorData = await response.json();
      return errorData;
    }
    const tasks = await response.json();
    return tasks;
  } catch (error) {}
};

export const fetchTaskById = async (taskId) => {
  try {
    const response = await fetch(`${API_GATEWAY_BASE_URL}/task/${taskId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: 'include',
    });

    if (!response.ok) {
      const errorData = await response.json();
      return errorData;
    }
    const tasks = await response.json();
    return tasks;
  } catch (error) {}
};

export const addMember = async (taskId, user) => {
  try {
    const response = await fetch(`${API_GATEWAY_BASE_URL}/task/invite/${taskId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: 'include',
      body : JSON.stringify({
        memberToAdd : user
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      return errorData
    }
    const userData = await response.json();
    return userData;
  } catch (error) {}
};

export const removeMember = async (taskId, user) => {
  try {
    const response = await fetch(`${API_GATEWAY_BASE_URL}/task/remove-member/${taskId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: 'include',
      body : JSON.stringify({
        memberToRemove : user
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      return errorData
    }
    const userData = await response.json();
    return userData;
  } catch (error) {}
};

export const updateTask = async (taskId, body) => {
  try {
    const response = await fetch(`${API_GATEWAY_BASE_URL}/task/update/${taskId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: 'include',
      body : JSON.stringify(body)
    });

    if (!response.ok) {
      const errorData = await response.json();
      return errorData
    }
    const userData = await response.json();
    return userData;
  } catch (error) {}
};

export const addComment = async (taskId, commentText) => {
  try {
    const response = await fetch(`${API_GATEWAY_BASE_URL}/task/${taskId}/comment`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: 'include',
      body : JSON.stringify({
        comment : commentText
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      return errorData
    }
    const userData = await response.json();
    return userData;
  } catch (error) {}
};

export const fetchAllComments = async (taskId) => {
  try {
    const response = await fetch(`${API_GATEWAY_BASE_URL}/task/${taskId}/comments`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: 'include',
    });

    if (!response.ok) {
      const errorData = await response.json();
      return errorData
    }
    const userData = await response.json();
    return userData?.data;
  } catch (error) {}
};

export const deleteComment = async (commentId) => {
  try {
    const response = await fetch(`${API_GATEWAY_BASE_URL}/task/${taskId}/comments`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: 'include',
    });

    if (!response.ok) {
      const errorData = await response.json();
      return errorData
    }
    const userData = await response.json();
    return userData?.data;
  } catch (error) {}
};