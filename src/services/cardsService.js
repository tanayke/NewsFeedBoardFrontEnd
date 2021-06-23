/* eslint-disable no-restricted-syntax */
import axios from "axios";
import { API_GET_ALL_CARD  } from "../constants";
// import { API_GET_ALL_CARD} from "../constants";

export const addCards =async (data)=>{
 
 
  try {
    const respone = await axios({
      method: 'post',
      url: API_GET_ALL_CARD,
      data
    });
    return respone.data;
  } catch (error) {
    return error;
  }
}
