import React, { useContext, useEffect } from "react";
import { ArticlesContext } from "../../context/ArticlesContext/ArticlesContext";
import { ArticleFilterContext } from "../../context/ArticleFilterContext/ArticleFilterContext";
import NewsCardsComponent from "../Utilities/NewsCardsComponent";

// eslint-disable-next-line arrow-body-style
export const ArticleFeedComponent = () => {
  return (
    <div className="p-3">
      <NewsCardsComponent />
    </div>
  );
};
