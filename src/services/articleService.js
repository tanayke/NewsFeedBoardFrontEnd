import axios from "axios";
import { API_GET_ALL_ARTICLES } from "../constants";

export const getAllArticles = async (filters) => {
  // eslint-disable-next-line prefer-const
  let { categoryId, locationId, search, isTrending, page, size } = filters;
  console.log(categoryId, locationId, search, isTrending, page);
  if (categoryId === "All") categoryId = undefined;
  if (locationId === "All") locationId = undefined;
  try {
    const respone = await axios.get(API_GET_ALL_ARTICLES, {
      params: { categoryId, locationId, search, isTrending, page, size },
    });
    return respone.data;
  } catch (err) {
    return err;
  }
};

export const updateIsActiveStatus = async (isActive, articleId) => {
  try {
    console.log(isActive, articleId);
    const response = await axios.patch(API_GET_ALL_ARTICLES, {
      isActive,
      articleId,
    });
    console.log(response.data);
    return response;
  } catch (err) {
    console.log(err.response);
    return err.response;
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

export const updateViewCount = (articleId) => {
  try {
    const respone = axios.patch(
      `${API_GET_ALL_ARTICLES}/viewCount/${articleId}`
    );
    return respone;
  } catch (err) {
    return err.response;
  }
};

export const getArticle = async (articleId) => {
  try {
    const response = await axios.get(`${API_GET_ALL_ARTICLES}/${articleId}`);
    console.log(response.data);
    return response.data;
  } catch (err) {
    return err;
  }
};
