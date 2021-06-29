import axios from "axios";
import { API_GET_ALL_CATEGORIES } from "../constants";

export const getAllCategories = async () => {
  try {
    const respone = await axios.get(API_GET_ALL_CATEGORIES);
    return respone.data;
  } catch (err) {
    return err;
  }
};

export const getAllCategoryViews = async () => {
  try {
    const response = await axios.get(`${API_GET_ALL_CATEGORIES}/views`);
    return response;
  } catch (err) {
    return err.response;
  }
};
