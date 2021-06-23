import axios from "axios";
import { API_GET_ALL_ARTICLES,API_GET_ALL_CARDS} from "../constants";

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
// eslint-disable-next-line consistent-return
export const getArticleCards = async (id) => {
  try{
    const response = await axios.get(`${API_GET_ALL_CARDS}/${id}`);
    console.log(response.data);
    return response.data;
  }catch (err) {
    return err;
  }
}
