import axios from "axios";
import { API_GET_ALL_CATEGORIES } from "../constants";

export const getAllCategories = async () => {
  try {
    const respone = await axios.get(API_GET_ALL_CATEGORIES, {
      headers: {
        "x-auth-token": `${sessionStorage.getItem("x-auth-token")}`,
      },
    });
    console.log(respone.data);
    return respone.data;
  } catch (err) {
    return err;
  }
};
