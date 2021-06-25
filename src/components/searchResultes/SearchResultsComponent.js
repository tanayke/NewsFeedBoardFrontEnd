import React, { useContext } from "react";
import { ArticleFilterContext } from "../context/ArticleFilterContext/ArticleFilterContext";

export const SearchResultsComponent = () => {
  const { articleFilters } = useContext(ArticleFilterContext);
  return <h1>search searchResultes:{articleFilters.search}</h1>;
};
