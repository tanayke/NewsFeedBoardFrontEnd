// route paths
export const HOME = "/home";
export const WRITE = "/write";
export const ARTICLE = "/article";
export const ADMIN = "/admin";
export const REGISTER = "/registeration";
export const LOGIN = "/login";
export const ROUTE_SEARCH = "/search";
export const BASE_URL = "http://localhost:5500";

/* eslint-disable import/prefer-default-export */
export const BASE_API = "http://localhost:5500/api/";
export const API_GET_ALL_LOCATIONS = `${BASE_API}locations`;
export const API_GET_ALL_CATEGORIES = `${BASE_API}categories`;
export const API_GET_ALL_ARTICLES = `${BASE_API}articles`;
export const API_GET_ALL_CARDS = `${BASE_API}cards`;
export const API_GET_ALL_USERS = `${BASE_API}users`;
export const API_ALL_REPORTS = `${BASE_API}reports`;
export const API_POST_USERS = `${BASE_API}users`;
export const API_AUTHENTICATE_USER = `${BASE_API}auth`;

export const NAVBAR_GUEST = [HOME, LOGIN];
export const NAVBAR_READER = [HOME];
export const NAVBAR_REPORTER = [HOME, WRITE];
export const NAVBAR_ADMIN = [HOME, ADMIN];
