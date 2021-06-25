import { createContext } from "react";

export const ArticlesContext = createContext({
  articles: [],
  setArticles: () => {},
});
