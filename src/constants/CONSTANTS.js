export const LANDING = "/";
export const HOME = "/home";
export const WRITE = "/write";
export const ARTICLE = "/article";
export const ADMIN = "/admin";
export const REGISTER = "/registeration";
export const CARDS="/cards/:id";

/* eslint-disable import/prefer-default-export */
const BASE_API = "http://localhost:5500/api/";
export const API_GET_ALL_LOCATIONS = `${BASE_API}locations`;
export const API_GET_ALL_CATEGORIES = `${BASE_API}categories`;
export const API_GET_ALL_ARTICLES = `${BASE_API}articles`;
export const API_GET_CARDS = `${BASE_API}cards/`;

/* public base API */
export const API_PUBLIC_BASE="http://localhost:5500";