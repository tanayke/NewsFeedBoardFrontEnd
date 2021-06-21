import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { NavBarComponent } from "../sharedComponents/NavBarComponent";
import { RouterConfig } from "../routes/RouterConfig";

export const UserLayout = () => (
  <div>
    <NavBarComponent />
    <Container fluid="md">
      <Row>
        <Col>
          <RouterConfig />
        </Col>
      </Row>
    </Container>
  </div>
);
