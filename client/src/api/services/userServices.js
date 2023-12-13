import { API_GATEWAY_BASE_URL } from "../config/axiosConfig";
export const handleSignIn = async (userInfo) => {
  try {
    const response = await fetch(`${API_GATEWAY_BASE_URL}/user/signin`, {
      method: "POST",
      credentials : 'include',
      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        email: userInfo.email,
        password: userInfo.password,
    }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      return errorData
    }
    const {token, ...res} = await response.json();
    return res;
  } catch (error) {}
};
export const handleSignUp = async (userInfo) => {
  try {
    const response = await fetch(`${API_GATEWAY_BASE_URL}/user/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name : userInfo.name,
        email: userInfo.email,
        password: userInfo.password,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      return errorData
    }
    const userData = await response.json();
    return userData;
  } catch (error) {}
};

export const findMember = async (searchText) => {
  try {
    const response = await fetch(`${API_GATEWAY_BASE_URL}/user/search?name=${searchText}`, {
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
    return userData;
  } catch (error) {}
};

export const fetchUserData = async (userId) => {
  try {
    const response = await fetch(`${API_GATEWAY_BASE_URL}/user/${userId}`, {
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
    return userData;
  } catch (error) {}
};

export const updateUserDetails = async () => {
  try {
    const response = await fetch(`${API_GATEWAY_BASE_URL}/user/update`, {
      method: "PATCH",
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
    return userData;
  } catch (error) {}
};