import React, { useEffect, useState } from "react";
import { Card, Button, Spinner, Container, Row, Col } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import moment from "moment";
import { getAllPendingReports } from "../../services/articleReportsService";
import { ARTICLE } from "../../constants";
import PaginationComponent from "../homePage/Utilities/PaginationComponent";

export const ReportsComponent = () => {
  const [reportsArray, setReportsArray] = useState();
  const [currPage, setCurrPage] = useState(0);
  const [totPages, setTotPages] = useState(1);
  const history = useHistory();
  const handleReportClick = (articleId) => {
    history.push(`${ARTICLE}/${articleId}`);
  };

  useEffect(() => {
    getAllPendingReports(currPage, 2).then((response) => {
      console.log(response.data);
      console.log(reportsArray);
      setReportsArray(response.data.items);
      setTotPages(response.data.totalPages);
    });
  }, []);

  const afterPageClicked = async (page) => {
    setCurrPage(page - 1);
    console.log(currPage);

    // eslint-disable-next-line no-param-reassign
    page -= 1;
    try {
      getAllPendingReports(page, 2).then((response) => {
        console.log(response.data);
        console.log(reportsArray);
        setReportsArray(response.data.items);
      });
    } catch (error) {
      console.log(error);
    }
  };
  // eslint-disable-next-line no-nested-ternary
  return !reportsArray ? (
    <Spinner animation="border" variant="info" />
  ) : (
    <>
      {reportsArray.map((report) => (
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
      ))}
      <PaginationComponent
        totPages={totPages}
        currentPage={currPage + 1}
        pageClicked={(ele) => {
          afterPageClicked(ele);
        }}
      />
    </>
  );
};
