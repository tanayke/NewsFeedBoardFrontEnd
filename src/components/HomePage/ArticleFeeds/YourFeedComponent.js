/* eslint-disable react/prop-types */
import React from "react";
import { Pagination } from "react-bootstrap";
import NewsCardsComponent from "../Utilities/NewsCardsComponent";

const YourFeedComponent = ({ articles }) => {
  articles.sort((first, second) => {
    if (second.uploadDateTime > first.uploadDateTime) return 1;
    if (second.uploadDateTime < first.uploadDateTime) return -1;
    return 0;
  });

  return (
    <>
      <div className="p-3">
        <NewsCardsComponent articles={articles} />
        <Pagination size="lg" className="justify-content-md-center">
          <Pagination.Prev />
          <Pagination.Next />
        </Pagination>
      </div>
    </>
  );
};

YourFeedComponent.propTypes = {};

export default YourFeedComponent;
