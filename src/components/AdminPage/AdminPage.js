import React, { useEffect, useState } from "react";
import { Container, Card, Row, Col } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { Pie } from "react-chartjs-2";
import { ARTICLE } from "../../constants";
import { getAllPendingReports } from "../../services/articleReportsService";
import { getAllArticlesForAdmin } from "../../services/articleService";
import { getAllUsers } from "../../services/userService";
import { UserApprovalListComponent } from "./UserApprovalListComponent";
import { ReportsComponent } from "./ReportsComponent";

const state = {
  labels: [
    "Politics",
    "Entertainment",
    "Business",
    "Sports",
    "Covid-19",
    "Education",
    "Technology",
    "StartUps",
    "Fashion",
  ],
  datasets: [
    {
      label: "News",
      backgroundColor: [
        "#B21F00",
        "#C9DE00",
        "#2FDE00",
        "#00A6B4",
        "#6800B4",
        "#23431H",
        "#B34567",
        "#696969",
        "#484848",
      ],
      hoverBackgroundColor: [
        "#501800",
        "#4B5000",
        "#175000",
        "#003350",
        "#35014F",
      ],
      data: [265, 591, 80, 181, 156, 323, 123, 12, 343],
    },
  ],
};
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
      <Container>
        <Row className="mt-5">
          <Col md={8}>
            <h2>List Of Reports</h2>
            <Row style={{ maxHeight: "calc(40vh)", overflowY: "auto" }}>
              <ReportsComponent
                className="row text-center"
                reportsArray={reportsArray}
              />
            </Row>
          </Col>
          <Col md={4}>
            {" "}
            <Pie
              data={state}
              options={{
                title: {
                  display: true,
                  fontSize: 20,
                },
                legend: {
                  display: true,
                  position: "right",
                },
              }}
            />
          </Col>
        </Row>
        <hr />
        <Row>
          <Row>
            <h2>User List To Approve</h2>
          </Row>
          <Row style={{ maxHeight: "calc(30vh)", overflowY: "auto" }}>
            <UserApprovalListComponent
              pendingApprovalArray={pendingApprovalArray}
              toggleRender={toggleRender}
              setToggleRender={setToggleRender}
            />
          </Row>
        </Row>
      </Container>
    </div>
  );
};
