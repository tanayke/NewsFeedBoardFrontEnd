import React, { useContext, useEffect, useState } from "react";
import { ArticleFilterContext } from "../../context/ArticleFilterContext/ArticleFilterContext";
import NewsCardsComponent from "../Utilities/NewsCardsComponent";
import { getAllArticles } from "../../../services";
import { PaginationComponent } from "../Utilities/PaginationComponent";

const setOfContext = new Set();

// eslint-disable-next-line arrow-body-style
export const ArticleFeedComponent = () => {
  const [articleFeed, setArticleFeed] = useState([]);
  const { articleFilters } = useContext(ArticleFilterContext);
  const { pageLimit, setPageLimit } = useState(0);
  const fetchAndSetDataForPageChange = async (page) => {
    try {
      const data = await getAllArticles({ ...articleFilters, page });
      setArticleFeed(data.items);
      setPageLimit(data.totalPages);
    } catch (error) {
      console.log(error);
    }
  };
  setOfContext.add(articleFilters);
  console.log(setOfContext);
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
      <PaginationComponent
        fetchAndSetDataForPageChange={fetchAndSetDataForPageChange}
        pageLimit={pageLimit}
      />
    </div>
  );
};
