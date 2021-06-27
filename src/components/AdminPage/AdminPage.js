import React, { useEffect, useState } from "react";
import { Container, Card, Row, Col } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { ARTICLE } from "../../constants";
import { getAllArticlesForAdmin } from "../../services/articleService";
import { getAllUsers } from "../../services/userService";
import NewsCardsComponent from "../homePage/Utilities/NewsCardsComponent";
import { UserApprovalListComponent } from "./UserApprovalListComponent";

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
  }, []);

  useEffect(() => {
    getAllUsers(0, "REPORTER").then((response) => {
      console.log(response.data);
      setPendingApprovalArray(response.data);
    });
  }, [toggleRender]);

  return (
    <div>
      <h1>Admin Page</h1>
      <Container>
        <Row>
          <Col md={9}>
            {/* <NewsCardsComponent articleFeed={topArticlesArray} /> */}
          </Col>
          <Col md={3}>New Reporter Approval requests</Col>
        </Row>
        <Row>
          <h2>User List to Approve</h2>
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
