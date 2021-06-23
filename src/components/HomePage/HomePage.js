import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { ArticlesTab } from "./ArticlesTab";
import { ArticleFilterComponent } from "./ArticleFilterComponent";
import { getAllArticles } from "../../services";

export const HomePage = () => {
  const [articles, setArticles] = useState([]);
  useEffect(() => {
    getAllArticles().then((data) => {
      setArticles(data, () => {
        console.log(articles);
      });
    });
  }, []);
  const filterArticles = (categoryId, locationId) => {
    getAllArticles(categoryId, locationId).then((data) => {
      setArticles(data, () => {
        console.log(articles);
      });
    });
  };
  return (
    <div className="pt-5">
      <Container>
        <Row>
          <Col md={8}>
            <ArticlesTab articles={articles} />
          </Col>
          <Col md={4}>
            <ArticleFilterComponent filterArticles={filterArticles} />
          </Col>
        </Row>
      </Container>
    </div>
  );
};
