import axios from "axios";
import { API_GET_ALL_ARTICLES, API_GET_CARDS } from "../constants";

export const getAllArticles = async () => {
  try {
    const respone = await axios.get(API_GET_ALL_ARTICLES);
    return respone.data;
  } catch (err) {
    return err;
  }
};
export const getCards = async (id) => {
    try {
      const respone = await axios.get(`${API_GET_CARDS}${id}`);
      return respone.data;
    } catch (err) {
      return err;
    }
  };