import axios from "axios";
import { API_GET_ALL_LOCATIONS } from "../constants";

export const getAllLocations = async () => {
  try {
    const respone = await axios.get(API_GET_ALL_LOCATIONS);
    return respone.data;
  } catch (err) {
    return err;
  }
};
