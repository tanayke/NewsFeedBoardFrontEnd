import React from "react";
import PropTypes from "prop-types";
import { Container, Row, Col } from "react-bootstrap";
import { NavBarComponent } from "../sharedComponents/NavBarComponent";
import { RouterConfig } from "../routes/RouterConfig";
import CategoriesComponent from "../homePage/CategoriesComponent";

export const UserLayout = (props) => (
  <div>
    <NavBarComponent />
    <Container fluid="md">
      <Row>
        <Col md={8}>
          <RouterConfig />
        </Col>
        <Col>
          <CategoriesComponent />
        </Col>
      </Row>
    </Container>
  </div>
);

UserLayout.propTypes = {};
