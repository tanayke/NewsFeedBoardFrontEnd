import axios from "axios";
import { API_ALL_REPORTS } from "../constants";

export const getAllReports = async (articleId, userId) => {
  try {
    const respone = await axios.get(API_ALL_REPORTS, {
      params: { articleId, userId },
    });
    return respone;
  } catch (err) {
    return err.response;
  }
};

export const getAllPendingReports = async (page, size) => {
  try {
    const response = await axios.get(`${API_ALL_REPORTS}/unresolved`, {
      params: { page, size },
    });
    return response;
  } catch (err) {
    return err.response;
  }
};
export const addReport = async (report) => {
  try {
    const respone = await axios.post(API_ALL_REPORTS, report);
    return respone;
  } catch (err) {
    return err.response.data;
  }
};
