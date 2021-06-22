import axios from "axios";

import { API_GET_ALL_ARTICLE} from "../constants";

export const addArticle =async (data)=>{
  try {
    const respone = await axios({
      method: 'post',
      url: API_GET_ALL_ARTICLE,
      data
    });
    return respone.data;
  } catch (error) {
    return error;
  }
}
