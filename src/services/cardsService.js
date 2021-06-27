/* eslint-disable no-restricted-syntax */
import axios from "axios";
import { API_GET_ALL_CARDS } from "../constants";
// import { API_GET_ALL_CARD} from "../constants";

export const addCards = async (data) => {
  try {
    const respone = await axios({
      method: "post",
      url: API_GET_ALL_CARDS,
      data,
    });
    return respone.data;
  } catch (error) {
    return error;
  }
};

export const getAllCardsByArticleId = async (articleId) => {
  try {
    const response = await axios.get(`${API_GET_ALL_CARDS}/${articleId}`);
    console.log(response.data);
    return response.data;
  } catch (err) {
    return err;
  }
};
