import React, { useContext } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { ArticleFilterContext } from "../context/ArticleFilterContext/ArticleFilterContext";
import { ArticleFeedComponent } from "../HomePage/ArticleFeeds/ArticleFeedComponent";

export const SearchResultsComponent = () => {
  const { articleFilters } = useContext(ArticleFilterContext);
  return (
    <>
      <div className="pt-5">
        <Container className="d-flex justify-content-center">
          <Row>
            <Col md={2} />
            <Col md={8}>
              <h3 className="font-weight-normal">
                Search Resultes For :{" "}
                <span className="font-weight-bolder">
                  {articleFilters.search}
                </span>
              </h3>
              <ArticleFeedComponent />
            </Col>
            <Col md={2} />
          </Row>
        </Container>
      </div>
    </>
  );
};
