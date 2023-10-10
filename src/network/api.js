import axios from "axios";

export const baseUrl = "https://peopleconnect-d0zy.onrender.com/";

const apiEndpoints = {
  signup: "api/auth/signup",
  signin: "api/auth/signin",
  users: "api/auth/users",
  myProfile: "api/auth/me",
  fetchMessage: "api/message/fetchMessage?receiverId=",
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

export const fetchMessageApi = async (receiverId) => {
  const endpointUrl = `${baseUrl}${apiEndpoints.fetchMessage}${receiverId}`;
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
