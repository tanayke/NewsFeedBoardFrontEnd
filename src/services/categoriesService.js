import axios from "axios";
import { API_GET_ALL_CATEGORIES } from "../constants";

export const getAllCategories = async () => {
  try {
    const respone = await axios.get(API_GET_ALL_CATEGORIES);
    console.log(respone.data);
    return respone.data;
  } catch (err) {
    return err;
  }
};
