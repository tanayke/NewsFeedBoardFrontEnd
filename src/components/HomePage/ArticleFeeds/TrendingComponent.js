/* eslint-disable react/prop-types */
import React from "react";
import NewsCardsComponent from "../Utilities/NewsCardsComponent";

const TrendingComponent = ({ articles }) => {
  articles.sort((first, second) => second.viewCount - first.viewCount);

  return (
    <div className="p-3">
      <NewsCardsComponent articles={articles} />
    </div>
  );
};

TrendingComponent.propTypes = {};

export default TrendingComponent;
