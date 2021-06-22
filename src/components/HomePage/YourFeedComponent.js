import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Pagination } from "react-bootstrap";
import { getAllArticles } from "../../services";
import NewsCardsComponent from "./NewsCardsComponent";

const YourFeedComponent = (props) => {
  const [articles, setArticles] = useState([]);
  useEffect(() => {
    getAllArticles().then((data) => {
      data.sort((first, second) => {
        if (second.uploadDateTime > first.uploadDateTime) return 1;
        if (second.uploadDateTime < first.uploadDateTime) return -1;
        return 0;
      });
      setArticles(data, () => {
        console.log(articles);
      });
    });
  }, []);
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
