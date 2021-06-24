/* eslint-disable jsx-a11y/media-has-caption */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/jsx-no-comment-textnodes */
import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { BASE_URL } from "../../constants";
import { getArticleCards, getArticle } from "../../services";
import { ArticleCards } from "./ArticleCards";
import { ArticleReport } from "./ArticleReport";

export const ArticlePage = () => {
  const [cards, setCards] = useState([]);
  const [article, setArticle] = useState([]);
  useEffect(() => {
    getArticleCards(20).then((data) => {
      setCards(data);
    });
    getArticle(20).then((data) => {
      setArticle(data);
    });
  }, []);
  console.log(cards);
  console.log(article);
  return (
    <Container className="mt-2">
      <Row>
        <Col xs={2} className="mt-5" />
        <Col>
          <Row>
            <small className="ml-3">Created by</small>
          </Row>
          <Row>
            <small className="ml-3">john marshal</small>
          </Row>
        </Col>
        <Col xs={3}>
          <ArticleReport />
        </Col>
      </Row>

      <Row>
        <Col xs={2} />
        <Col>
          <h2>{article.title}</h2>
        </Col>
        <Col xs={2} />
      </Row>
      <Row>
        <Col xs={2} />
        <Col>
          <h5>{article.description}</h5>
        </Col>
        <Col xs={2} />
      </Row>
      <Row>
        <Col xs={2} />
        <Col  className="ml-5">
          <img
            src={BASE_URL + article.thumbnailImage}
            alt="img"
            width={500}
            height={400}
          />
        </Col>
        <Col xs={2} />
      </Row>
      {cards.map((data) => (
        <Row key={data.id} className="justify-content-md-center mt-3">
          <ArticleCards data={data} />
        </Row>
      ))}
    </Container>
  );
};
