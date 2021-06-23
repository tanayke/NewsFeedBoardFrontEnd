/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import NewsCardsComponent from "./NewsCardsComponent";
import { getAllArticles } from "../../services";

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
