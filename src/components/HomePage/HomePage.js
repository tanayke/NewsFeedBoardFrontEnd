import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { ArticlesTab } from "./ArticlesTab";
import { CategoriesComponent } from "./CategoriesComponent";

export const HomePage = () => (
  <div className="pt-5">
    <Container>
      <Row>
        <Col md={8}>
          <ArticlesTab />
        </Col>
        <Col md={4}>
          <CategoriesComponent />
        </Col>
      </Row>
    </Container>
  </div>
);
