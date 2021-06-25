import React, { useContext } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { ArticlesTab } from "./ArticlesTab";
import { CategoriesComponent } from "./CategoriesComponent";
import { UserContext } from "../context/UserContext/UserContext";

export const HomePage = () => {
  const currUser = useContext(UserContext);
  console.log("from HomePage context ", currUser.user);
  return (
    <div className='pt-5'>
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
};
