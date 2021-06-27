import axios from "axios";
import {
  API_GET_ALL_USERS,
  API_POST_USERS,
  API_AUTHENTICATE_USER,
} from "../constants/CONSTANTS";

// const authAxios = axios.create({
//   headers: {
//     "x-auth-token": `${sessionStorage.getItem("x-auth-token")}`,
//   },
// });

export const getAllUsers = async (isApproved, role) => {
  try {
    const response = await axios.get(API_GET_ALL_USERS, {
      params: { isApproved, role },
    });
    console.log(response.data);
    return response;
  } catch (err) {
    console.log(err.response);
    return err.response;
  }
};

export const postUser = async (formdata) => {
  try {
    const response = await axios.post(API_POST_USERS, formdata);
    console.log(response.data);
    return response;
  } catch (err) {
    console.log(err.response.data);
    return err.reponse;
  }
};

export const authenticateUser = async (data) => {
  try {
    const response = await axios.post(API_AUTHENTICATE_USER, data);
    console.log(response.data);
    return response;
  } catch (error) {
    console.log(error.response);
    return error.response;
  }
};

export const getAuthUser = async () => {
  try {
    const response = await axios.get(API_AUTHENTICATE_USER);
    // eslint-disable-next-line no-unused-expressions
    // response.data.headers["x-auth-token"];
    console.log(response.status);
    return response;
  } catch (error) {
    console.log(error.response);
    return error.response;
  }
};
