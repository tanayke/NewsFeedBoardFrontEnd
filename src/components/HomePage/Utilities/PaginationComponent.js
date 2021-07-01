/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useContext, useEffect, useState } from "react";
import { PageItem, Pagination } from "react-bootstrap";
import { getAllArticles } from "../../../services";
import { ArticleFilterContext } from "../../context/ArticleFilterContext/ArticleFilterContext";

export const PaginationComponent = ({
  fetchAndSetDataForPageChange,
  pageLimit,
}) => {
  const [currentPage, setCurrentPage] = useState(0);

  const goToNextPage = () => {
    if (currentPage !== pageLimit) setCurrentPage(currentPage + 1);
  };
  const goToPreviousPage = () => {
    if (currentPage !== 0) setCurrentPage(currentPage - 1);
  };

  useEffect(() => {
    fetchAndSetDataForPageChange(currentPage);
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
