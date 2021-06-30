import React, { useContext, useEffect, useState } from "react";
import { ArticleFilterContext } from "../../context/ArticleFilterContext/ArticleFilterContext";
import NewsCardsComponent from "../Utilities/NewsCardsComponent";
import { getAllArticles } from "../../../services";
import { PaginationComponent } from "../Utilities/PaginationComponent";

// eslint-disable-next-line arrow-body-style
export const ArticleFeedComponent = () => {
  const [articleFeed, setArticleFeed] = useState([]);
  const { articleFilters } = useContext(ArticleFilterContext);

  useEffect(() => {
    getAllArticles(articleFilters).then((data) => {
      setArticleFeed(data.items);
      console.log(data);
    });
  }, [articleFilters]);

  useEffect(() => {
    console.log(articleFeed);
  }, [articleFeed]);

  return (
    <div className="p-3">
      <NewsCardsComponent articleFeed={articleFeed} />
      <PaginationComponent setArticleFeed={setArticleFeed} />
    </div>
  );
};
