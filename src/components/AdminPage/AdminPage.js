import React, { useEffect, useState } from "react";
import { Container, Card, Row, Col } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { ARTICLE } from "../../constants";
import { getAllPendingReports } from "../../services/articleReportsService";
import { getAllArticlesForAdmin } from "../../services/articleService";
import { getAllUsers } from "../../services/userService";
import { UserApprovalListComponent } from "./UserApprovalListComponent";
import { ReportsComponent } from "./ReportsComponent";

export const AdminPage = () => {
  const [reportsArray, setReportsArray] = useState();
  const [pendingApprovalArray, setPendingApprovalArray] = useState();
  const [topArticlesArray, setTopArticlesArray] = useState();
  const [toggleRender, setToggleRender] = useState();
  const history = useHistory();
  const handleCardClick = (articleId) => {
    history.push(`${ARTICLE}/${articleId}`);
  };
  useEffect(() => {
    getAllArticlesForAdmin().then((response) => {
      console.log(response.data);
      setTopArticlesArray(response.data);
    });
    getAllUsers(0, "REPORTER").then((response) => {
      console.log(response.data);
      setPendingApprovalArray(response.data);
    });
    getAllPendingReports().then((response) => {
      console.log(response.data);
      setReportsArray(response.data);
    });
  }, []);

  useEffect(() => {
    getAllUsers(0, "REPORTER").then((response) => {
      console.log(response.data);
      setPendingApprovalArray(response.data);
    });
  }, [toggleRender]);

  return (
    <div>
      <Container style={{ heigth: "500" }}>
        <Row className="h-50 mt-5">
          <Col md={9} className="scrollbar scrollbar-primary overflow-auto">
            <h2>List Of Reports</h2>
            <ReportsComponent
              className="row text-center"
              reportsArray={reportsArray}
            />
          </Col>
          <Col md={3}>{` `}</Col>
        </Row>
        <hr />
        <Row className="">
          <h2>User List To Approve</h2>
          <UserApprovalListComponent
            pendingApprovalArray={pendingApprovalArray}
            toggleRender={toggleRender}
            setToggleRender={setToggleRender}
          />
        </Row>
      </Container>
    </div>
  );
};
