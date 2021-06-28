import React, { useState } from "react";
import { ArticleFilterContext } from "./ArticleFilterContext";

// eslint-disable-next-line arrow-body-style
// eslint-disable-next-line react/prop-types
const ArticlesContextProvider = ({ children }) => {
  const [articleFilters, setArticleFilters] = useState({
    locationId: undefined,
    categoryId: undefined,
    search: undefined,
    isTrending: undefined,
  });

  const value = {
    articleFilters,
    setArticleFilters,
  };

  return (
    <ArticleFilterContext.Provider value={value}>
      {children}
    </ArticleFilterContext.Provider>
  );
};

export default ArticlesContextProvider;
