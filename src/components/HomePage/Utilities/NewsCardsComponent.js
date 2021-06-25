import React from "react";
import { Card, Container, Row, Col } from "react-bootstrap";

const NewsCardsComponent = (props) => {
  const { articles } = props;
  return articles.map((article) => (
    <Card key={article.id} style={{ width: "100%", margin: "1rem" }}>
      <Card.Body>
        <Container>
          <Row>
            <Col md={7}>
              <Card.Text>
                {`${article.reporter.name} at ${article.location.locality}, ${article.location.city}`}{" "}
              </Card.Text>
              <Card.Title>{article.title}</Card.Title>
              <Card.Text>{article.description}</Card.Text>
            </Col>
            <Col md={5}>
              <Card.Img
                variant="top"
                src={`http://localhost:5500${article.thumbnailImage}`}
              />
            </Col>
          </Row>
          <Row>
            <Col md={9}>
              <Card.Text className="text-muted">
                {article.uploadDateTime}
              </Card.Text>
            </Col>
            <Col md={3}>
              <Card.Text>{article.category.name}</Card.Text>
            </Col>
          </Row>
        </Container>
      </Card.Body>
    </Card>
  ));
};

NewsCardsComponent.propTypes = {};

export default NewsCardsComponent;
