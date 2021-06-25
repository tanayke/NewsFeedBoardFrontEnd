import React, { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { NavBarComponent } from "../sharedComponents/NavBarComponent";
import { RouterConfig } from "../routes/RouterConfig";
import UserContextProvider from "../context/UserContext/UserContextProvider";
import ArticleFilterContextProvider from "../context/ArticleFilterContext/ArticleFilterContextProvider";
import ArticlesContextProvider from "../context/ArticlesContext/ArticlesContextProvider";

export const UserLayout = () => (
  <div>
    <UserContextProvider>
      <ArticleFilterContextProvider>
        <ArticlesContextProvider>
          <NavBarComponent />
          <Container fluid="md">
            <Row>
              <Col>
                <RouterConfig />
              </Col>
            </Row>
          </Container>
        </ArticlesContextProvider>
      </ArticleFilterContextProvider>
    </UserContextProvider>
  </div>
);
