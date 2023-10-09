import axios from "axios";

export const baseUrl = "http://localhost:8080/api/";

const apiEndpoints = {
  signup: "auth/signup",
  signin: "auth/signin",
  users: "auth/users",
  myProfile: "auth/me",
};

export const signInApi = async (userData) => {
  const endpointUrl = `${baseUrl}${apiEndpoints.signin}`;
  try {
    const response = await axios.post(endpointUrl, userData);
    return response.data;
  } catch (error) {
    return {
      error: error,
      message: error.response.data.message,
    };
  }
};
export const usersApi = async () => {
  const endpointUrl = `${baseUrl}${apiEndpoints.users}`;
  try {
    const response = await axios.get(endpointUrl, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    return response.data;
  } catch (error) {
    return {
      error: error,
      message: error.response.data.message,
    };
  }
};

export const signUpApi = async (userData) => {
  const endpointUrl = `${baseUrl}${apiEndpoints.signup}`;
  try {
    const response = await axios.post(endpointUrl, userData);
    return response.data;
  } catch (error) {
    return {
      error: error,
      message: error.response.data.message,
    };
  }
};

export const myProfileApi = async () => {
  const endpointUrl = `${baseUrl}${apiEndpoints.myProfile}`;
  try {
    const response = await axios.get(endpointUrl, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    return response.data;
  } catch (error) {
    return {
      error: error,
      message: error.response.data.message,
    };
  }
};
