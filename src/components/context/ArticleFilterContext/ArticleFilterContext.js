import { createContext } from "react";

export const ArticleFilterContext = createContext({
  articleFilters: {},
  setArticleFilters: () => {},
});
