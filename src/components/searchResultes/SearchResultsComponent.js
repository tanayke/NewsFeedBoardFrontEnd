import React, { useContext } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { ArticleFilterContext } from "../context/ArticleFilterContext/ArticleFilterContext";
import { ArticleFeedComponent } from "../homePage/ArticleFeeds/ArticleFeedComponent";

export const SearchResultsComponent = () => {
  const { articleFilters } = useContext(ArticleFilterContext);
  return (
    <>
      <div className='pt-5'>
        <Container>
          <Row>
            <Col md={8}>
              <h3>search Resultes for :{articleFilters.search}</h3>
              <ArticleFeedComponent />
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
};
