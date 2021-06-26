/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState } from "react";

export const PaginationComponent = ({
  data,
  RenderComponent,
  title,
  pageLimit,
  dataLimit,
}) => {
  const [currentPage, setCurrentPage] = useState(1);

  const goToNextPage = () => {
    setCurrentPage(currentPage + 1);
  };
  const goToPreviousPgae = () => {
    setCurrentPage(currentPage - 1);
  };

  return <div />;
};
