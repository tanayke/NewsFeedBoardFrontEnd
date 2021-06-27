/* eslint-disable react/prop-types */
import React, { useContext } from "react";
import { ButtonGroup, Button } from "react-bootstrap";
import { ArticleFeedComponent } from "./ArticleFeedComponent";
import { ArticleFilterContext } from "../../context/ArticleFilterContext/ArticleFilterContext";

export const ArticlesTab = () => {
  const { articleFilters, setArticleFilters } =
    useContext(ArticleFilterContext);

  const handleYourFeedClick = () => {
    setArticleFilters({
      ...articleFilters,
      isTrending: undefined,
    });
  };
  const handleTrendingClick = () => {
    setArticleFilters({
      ...articleFilters,
      isTrending: true,
    });
  };
  return (
    <>
      <ButtonGroup>
        <Button onClick={handleYourFeedClick} variant="light">
          Your Feed
        </Button>
        <Button onClick={handleTrendingClick} variant="light">
          Trending
        </Button>
      </ButtonGroup>
      <hr />
      <ArticleFeedComponent />
    </>
  );
};
