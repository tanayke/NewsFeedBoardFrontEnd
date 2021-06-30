/* eslint-disable react/prop-types */
import React, { useContext, useState } from "react";
import { Tabs, Tab } from "react-bootstrap";
import { ArticleFeedComponent } from "./ArticleFeedComponent";
import { ArticleFilterContext } from "../../context/ArticleFilterContext/ArticleFilterContext";

export const ArticlesTab = () => {
  const [key, setKey] = useState("home");
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
    <div className="mt-2">
      <Tabs
        id="controlled-tab-example"
        activeKey={key}
        onSelect={(k) => {
          if (k === "home") handleYourFeedClick();
          if (k === "Trending") handleTrendingClick();
          setKey(k);
        }}
      >
        <Tab eventKey="home" title="Your Feed" onClick={handleYourFeedClick}>
          <ArticleFeedComponent />
        </Tab>
        <Tab eventKey="Trending" title="Trending" onClick={handleTrendingClick}>
          <ArticleFeedComponent />
        </Tab>
      </Tabs>
      {/* <ButtonGroup>
        <Button onClick={handleYourFeedClick} variant="light">
          Your Feed
        </Button>
        <Button onClick={handleTrendingClick} variant="light">
          Trending
        </Button>
      </ButtonGroup> */}
      <hr />
    </div>
  );
};
