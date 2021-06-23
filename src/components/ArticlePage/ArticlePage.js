/* eslint-disable jsx-a11y/media-has-caption */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/jsx-no-comment-textnodes */
import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { getArticleCards } from "../../services";
import {ArticleCards} from './ArticleCards';
import { BASE_URL } from "../../constants";

function RenderContent(data) {
  const { type, content } = data;
  if (type === "IMAGE") {
    return (
      <>
        <Col xs={2} />
        <Col>
          <img src={BASE_URL + content} alt="img" width={600} height={400} />
        </Col>
        <Col xs={2} />
      </>
    );
  }
  if (type === "TEXT") {
    return (
      <>
        <Col xs={2} />
        <Col className="mr-3">
          <p>{content}</p>
        </Col>
        <Col xs={2} />
      </>
    );
  }
  return (
    <>
      <Col xs={2} />
      <Col>
        <video width="500" height="280" controls autoPlay="false">
          <source src={BASE_URL + content} type="video/mp4" />
        </video>
      </Col>
      <Col xs={2} />
    </>
  );
}

export const ArticlePage = () => {
  const [cards, setCards] = useState([]);
  useEffect(() => {
    getArticleCards(20).then((data) => {
      setCards(data);
    });
  }, []);
  console.log(cards);
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
        <Col xs={2} />
      </Row>
      {cards.map((data) => (
        <Row key={data.id} className="justify-content-md-center mt-3">
          <ArticleCards data={data}/>
        </Row>
      ))}
    </Container>
  );
};
