import axios from "axios";
import { API_GET_ALL_CARDS } from "../constants";

export const getAllCardsByArticleId = async (articleId) => {
  try {
    const response = await axios.get(`${API_GET_ALL_CARDS}/${articleId}`);
    console.log(response.data);
    return response.data;
  } catch (err) {
    return err;
  }
};
