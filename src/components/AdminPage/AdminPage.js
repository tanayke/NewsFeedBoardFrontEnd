import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { UserApprovalListComponent } from "./UserApprovalListComponent";
import { ReportsComponent } from "./ReportsComponent";
import { CategoryViewsStatComponent } from "./CategoryViewsStatComponent";

export const AdminPage = () => (
  <div>
    <Container>
      <Row className="mt-5">
        <Col md={8}>
          <h2>List Of Reports</h2>
          <Row style={{ maxHeight: "40vh", overflowY: "auto" }}>
            <ReportsComponent className="row text-center" />
          </Row>
        </Col>
        <Col md={4}>
          <CategoryViewsStatComponent />
        </Col>
      </Row>
      <hr />
      <Row className="d-flex justify-content-center">
        <h2 className="text-center">User List To Approve</h2>
        <Row className="mt-3" style={{ maxHeight: "30vh", overflowY: "auto" }}>
          <UserApprovalListComponent />
        </Row>
      </Row>
    </Container>
  </div>
);
