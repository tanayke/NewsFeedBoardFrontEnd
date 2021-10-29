import React from "react";
import { Card, Container, Row, Col, Spinner } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import moment from "moment";
import { ARTICLE } from "../../../constants";

const NewsCardsComponent = ({ articleFeed }) => {
  const history = useHistory();
  const handleCardClick = (articleId) => {
    history.push(`${ARTICLE}/${articleId}`);
  };

  return !articleFeed ? (
    <Spinner className="spinner" animation="border" variant="info" />
  ) : (
    articleFeed.map((article) => (
      <Card key={article.id} style={{ width: "100%", margin: "1rem" }}>
        <Card.Body
          onClick={() => {
            handleCardClick(article.id);
          }}
        >
          <Container>
            <Row>
              <Col md={7}>
                <Card.Text>
                  <strong>{article.reporter.name}</strong> at{" "}
                  <span className="text-muted">
                    {article.location.locality},
                  </span>{" "}
                  <span className="font-weight-bold">
                    {" "}
                    {article.location.city}
                  </span>
                </Card.Text>
                <Card.Title className="font-weight-bolder  col-12 text-truncate text-wrap">
                  {article.title}
                </Card.Title>
                <Card.Text className="col-12 text-truncate text-wrap">
                  {article.description}
                </Card.Text>
              </Col>
              <Col md={5}>
                <Card.Img
                  variant="top"
                  height="150px"
                  src={`http://localhost:5500${article.thumbnailImage}`}
                />
              </Col>
            </Row>
            <Row>
              <Col md={9}>
                <Card.Text>
                  <strong className="text-monospace">
                    <mark>{article.category.name}</mark>
                  </strong>
                </Card.Text>
              </Col>
              <Col md={3}>
                <Card.Text className="text-muted">
                  {moment(article.uploadDateTime).fromNow()}
                </Card.Text>
              </Col>
            </Row>
          </Container>
        </Card.Body>
      </Card>
    ))
  );
};

NewsCardsComponent.propTypes = {};

export default NewsCardsComponent;
