/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useContext, useEffect, useState } from "react";
import { PageItem, Pagination } from "react-bootstrap";
import { getAllArticles } from "../../../services";
import { ArticleFilterContext } from "../../context/ArticleFilterContext/ArticleFilterContext";

export const PaginationComponent = ({ setArticleFeed }) => {
  const [pageLimit, setPageLimit] = useState(1);
  const [currentPage, setCurrentPage] = useState(0);
  const { articleFilters } = useContext(ArticleFilterContext);

  const goToNextPage = () => {
    console.log(currentPage, pageLimit);
    if (currentPage !== pageLimit) setCurrentPage(currentPage + 1);
  };
  const goToPreviousPage = () => {
    if (currentPage !== 0) setCurrentPage(currentPage - 1);
  };

  useEffect(() => {
    getAllArticles({ ...articleFilters, page: currentPage }).then((data) => {
      console.log(data);
      setArticleFeed(data.items);
      setPageLimit(data.totalPages - 1);
    });
  }, [currentPage]);

  return (
    <div className="d-flex justify-content-center">
      <Pagination>
        <PageItem onClick={goToPreviousPage}> {`<`} </PageItem>
        <PageItem onClick={goToNextPage}> {`>`} </PageItem>
      </Pagination>
    </div>
  );
};
