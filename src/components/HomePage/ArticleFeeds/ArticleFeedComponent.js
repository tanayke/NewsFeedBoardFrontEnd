import React, { useContext, useEffect, useState } from "react";
import { ArticlesContext } from "../../context/ArticlesContext/ArticlesContext";
import { ArticleFilterContext } from "../../context/ArticleFilterContext/ArticleFilterContext";
import NewsCardsComponent from "../Utilities/NewsCardsComponent";
import { getAllArticles } from "../../../services";

// eslint-disable-next-line arrow-body-style
export const ArticleFeedComponent = () => {
  const [articleFeed, setArticleFeed] = useState([]);
  const { articleFilters } = useContext(ArticleFilterContext);
  const { articles, setArticles } = useContext(ArticlesContext);

  useEffect(() => {
    getAllArticles(articleFilters).then((data) => {
      setArticles(data);
      setArticleFeed(data);
    });
  }, [articleFilters]);
  useEffect(() => {
    console.log(articles);
  }, [articles]);

  return (
    <div className="p-3">
      <NewsCardsComponent articleFeed={articleFeed} />
    </div>
  );
};
