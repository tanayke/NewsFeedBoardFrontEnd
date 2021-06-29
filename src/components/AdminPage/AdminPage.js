import React, { useEffect, useState } from "react";
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
          <Row style={{ maxHeight: "calc(40vh)", overflowY: "auto" }}>
            <ReportsComponent className="row text-center" />
          </Row>
        </Col>
        <Col md={4}>
          <CategoryViewsStatComponent />
        </Col>
      </Row>
      <hr />
      <Row>
        <Row>
          <h2>User List To Approve</h2>
        </Row>
        <Row style={{ maxHeight: "calc(30vh)", overflowY: "auto" }}>
          <UserApprovalListComponent />
        </Row>
      </Row>
    </Container>
  </div>
);
