import React, { useEffect, useState } from "react";
import { Card, Button, Spinner, Container, Row, Col } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import moment from "moment";
import { getAllPendingReports } from "../../services/articleReportsService";
import { ARTICLE } from "../../constants";

export const ReportsComponent = () => {
  const [reportsArray, setReportsArray] = useState();

  const history = useHistory();
  const handleReportClick = (articleId) => {
    history.push(`${ARTICLE}/${articleId}`);
  };

  useEffect(() => {
    getAllPendingReports().then((response) => {
      console.log(response.data);
      console.log(reportsArray);
      setReportsArray(response.data);
    });
  }, []);
  // eslint-disable-next-line no-nested-ternary
  return !reportsArray ? (
    <Spinner animation="border" variant="info" />
  ) : (
    reportsArray.map((report) => (
      <Card key={report.id} style={{ width: "100%", margin: "1rem" }}>
        <Card.Body>
          <Container>
            <Row>
              <Col>
                <Card.Title>#{report.id}</Card.Title>
              </Col>
              <Col>
                {" "}
                <Card.Text>
                  <strong> {report.reason}</strong>{" "}
                  {report.otherReason ? `: ${report.otherReason}` : ` `}
                </Card.Text>
              </Col>
            </Row>
            <Row>
              <Col>
                {" "}
                <Card.Text>
                  by: <strong>{report.user.email}</strong>
                </Card.Text>
              </Col>
              <Col>
                {" "}
                <Button
                  variant="outline-primary"
                  className="col-12 text-truncate"
                  onClick={() => {
                    handleReportClick(report.article.id);
                  }}
                >
                  View News Article
                </Button>
              </Col>
            </Row>
          </Container>
        </Card.Body>
        <Card.Footer className="text-muted">
          {moment(report.createdAt).fromNow()}
        </Card.Footer>
      </Card>
    ))
  );
};
