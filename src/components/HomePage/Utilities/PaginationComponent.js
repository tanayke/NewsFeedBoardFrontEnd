/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useContext, useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import NewsCardsComponent from "./NewsCardsComponent";
import { getAllArticles } from "../../../services";
import { ArticlesContext } from "../../context/ArticlesContext/ArticlesContext";
import { ArticleFilterContext } from "../../context/ArticleFilterContext/ArticleFilterContext";

export const PaginationComponent = () => {
  const [pageLimit, setPageLimit] = useState(1);
  const [currentPage, setCurrentPage] = useState(0);
  const goToNextPage = () => {
    console.log(currentPage, pageLimit);
    if (currentPage !== pageLimit) setCurrentPage(currentPage + 1);
  };
  const goToPreviousPage = () => {
    if (currentPage !== 0) setCurrentPage(currentPage - 1);
  };

  // from articles feed
  const [articleFeed, setArticleFeed] = useState([]);
  const { articleFilters } = useContext(ArticleFilterContext);
  const { articles, setArticles } = useContext(ArticlesContext);

  useEffect(() => {
    getAllArticles({ ...articleFilters, page: currentPage }).then((data) => {
      console.log(data);
      setArticles(data.items);
      setPageLimit(data.totalPages - 1);
      setCurrentPage(data.currentPage);
      setArticleFeed(data.items);
    });
  }, [articleFilters, currentPage]);

  return (
    <>
      <div className="p-3">
        <NewsCardsComponent articleFeed={articleFeed} />
      </div>
      <Button onClick={goToPreviousPage}>Prev</Button>
      <Button onClick={goToNextPage}>Next</Button>
    </>
  );
};
