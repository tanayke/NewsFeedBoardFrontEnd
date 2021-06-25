import React, { useState } from "react";
import { ArticlesContext } from "./ArticlesContext";

// eslint-disable-next-line arrow-body-style
// eslint-disable-next-line react/prop-types
const ArticlesContextProvider = ({ children }) => {
  const [articles, setArticles] = useState({});

  const value = {
    articles,
    setArticles,
  };

  return (
    <ArticlesContext.Provider value={value}>
      {children}
    </ArticlesContext.Provider>
  );
};

export default ArticlesContextProvider;
