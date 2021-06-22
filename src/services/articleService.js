import axios from "axios";
import { API_GET_ALL_ARTICLES} from "../constants";

export const getAllArticles = async (...filters) => {
  const { categoryId, locationId, search} = filters;
  try {
    const respone = await axios.get(API_GET_ALL_ARTICLES);
    console.log(respone.data);
    return respone.data;
  } catch (err) {
    return err;
  }
};
