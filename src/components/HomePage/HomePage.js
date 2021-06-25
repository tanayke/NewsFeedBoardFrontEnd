import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { ArticlesTab } from "./ArticleFeeds/ArticlesTab";
import { ArticleFilterComponent } from "./Filters/ArticleFilterComponent";

export const HomePage = () => (
  <div className="pt-5">
    <Container>
      <Row>
        <Col md={8}>
          <ArticlesTab />
        </Col>
        <Col md={4}>
          <ArticleFilterComponent />
        </Col>
      </Row>
    </Container>
  </div>
);
