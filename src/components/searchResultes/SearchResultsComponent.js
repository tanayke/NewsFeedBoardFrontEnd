import React, { useContext } from "react";
import { ArticleFilterContext } from "../context/ArticleFilterContext/ArticleFilterContext";
import { ArticleFeedComponent } from "../homePage/ArticleFeeds/ArticleFeedComponent";

export const SearchResultsComponent = () => {
  const { articleFilters } = useContext(ArticleFilterContext);
  return (
    <>
      <h1>search Resultes for :{articleFilters.search}</h1>
      <ArticleFeedComponent />
    </>
  );
};
