import axios from "axios";
import { API_GET_ALL_ARTICLES } from "../constants";

export const getAllArticles = async (filters) => {
  // eslint-disable-next-line prefer-const
  let { categoryId, locationId, search, trending } = filters;
  console.log(categoryId, locationId, search, trending);
  if (categoryId === "All") categoryId = undefined;
  if (locationId === "All") locationId = undefined;
  try {
    const respone = await axios.get(API_GET_ALL_ARTICLES, {
      params: { categoryId, locationId, search, trending },
    });
    console.log(respone.data);
    return respone.data;
  } catch (err) {
    return err;
  }
};

export const getAllArticlesForSearchInput = async (searchInput) => {
  try {
    const respone = await axios.get(`${API_GET_ALL_ARTICLES}/search`, {
      params: { search: searchInput },
    });
    console.log(respone.data);
    return respone.data;
  } catch (err) {
    return err;
  }
};

export const addArticle = async (data) => {
  try {
    const respone = await axios({
      method: "post",
      url: API_GET_ALL_ARTICLES,
      data,
    });
    return respone.data;
  } catch (error) {
    return error;
  }
};
