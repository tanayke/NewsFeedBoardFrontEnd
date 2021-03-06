import React, { useContext, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";

import { ArticleFilterContext } from "../context/ArticleFilterContext/ArticleFilterContext";
import { ArticlesTab } from "./ArticleFeeds/ArticlesTab";
import { ArticleFilterComponent } from "./Filters/ArticleFilterComponent";

export const HomePage = () => {
  const { articleFilters, setArticleFilters } =
    useContext(ArticleFilterContext);

  useEffect(() => {
    setArticleFilters({
      locationId: undefined,
      categoryId: undefined,
      search: undefined,
      isTrending: undefined,
    });
  }, []);
  return (
    <div className="pt-5">
      <Container>
        <Row>
          <Col
            md={8}
            style={{ maxHeight: "calc(100vh - 9rem)", overflowY: "auto" }}
          >
            <ArticlesTab />
          </Col>
          <Col md={4}>
            <ArticleFilterComponent />
          </Col>
        </Row>
      </Container>
    </div>
  );
};
