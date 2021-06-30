import React, { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { NavBarComponent } from "../sharedComponents/NavBarComponent";
import { RouterConfig } from "../routes/RouterConfig";
import UserContextProvider from "../context/UserContext/UserContextProvider";
import ArticleFilterContextProvider from "../context/ArticleFilterContext/ArticleFilterContextProvider";

export const UserLayout = () => (
  <div>
    <UserContextProvider>
      <ArticleFilterContextProvider>
        <NavBarComponent />
        <Container fluid="md" className="mt-5">
          <Row>
            <Col>
              <RouterConfig />
            </Col>
          </Row>
        </Container>
      </ArticleFilterContextProvider>
    </UserContextProvider>
  </div>
);
