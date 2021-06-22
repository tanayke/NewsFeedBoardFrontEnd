import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import NewsCardsComponent from "./NewsCardsComponent";
import { getAllArticles } from "../../services";

const TrendingComponent = (props) => {
  const [articles, setArticles] = useState([]);
  useEffect(() => {
    getAllArticles().then((data) => {
      data.sort((first, second) => second.viewCount - first.viewCount);
      setArticles(data, () => {
        console.log(articles);
      });
    });
  }, []);
  return (
    <div className="p-3">
      <NewsCardsComponent articles={articles} />
    </div>
  );
};

TrendingComponent.propTypes = {};

export default TrendingComponent;
