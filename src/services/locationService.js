import axios from "axios";

import { API_GET_ALL_LOCATIONS } from "../constants";

export const getAllLocations = async (state) => {
  try {
    const respone = await axios.get(API_GET_ALL_LOCATIONS, {
      params: { state: state === "All" ? undefined : state },
    });
    return respone.data;
  } catch (err) {
    return err;
  }
};

export const getAllCities = async (states) => {
  try {
    const respone = await axios.get(`${API_GET_ALL_LOCATIONS}${states}`);
    return respone.data;
  } catch (err) {
    return err;
  }
};

export const addLocation = async (data) => {
  try {
    console.log(data);
    console.log("in Add Service");
    const respone = await axios({
      method: "post",
      url: API_GET_ALL_LOCATIONS,
      data,
    });
    return respone.data;
  } catch (error) {
    return error;
  }
};
