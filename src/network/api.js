import axios from "axios";

const baseUrl = "https://peopleconnect-d0zy.onrender.com/api/";

const apiEndpoints = {
  signup: "auth/signup",
  signin: "auth/signin",
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
