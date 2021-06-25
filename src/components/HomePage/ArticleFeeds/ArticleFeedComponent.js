import React, { useContext, useEffect } from "react";
import { ArticlesContext } from "../../context/ArticlesContext/ArticlesContext";
import { ArticleFilterContext } from "../../context/ArticleFilterContext/ArticleFilterContext";
import NewsCardsComponent from "../Utilities/NewsCardsComponent";
import { getAllArticles } from "../../../services";

export const ArticleFeedComponent = () => {
  const { articleFilters, setArticleFilters } =
    useContext(ArticleFilterContext);
  const { articles, setArticles } = useContext(ArticlesContext);

  useEffect(() => {
    // TODO write service to handle all filters
    getAllArticles(articleFilters).then((data) => {
      setArticles(data);
    });
  }, [articleFilters]);
  return (
    <div className="p-3">
      <NewsCardsComponent articles={articles} />
    </div>
  );
};
