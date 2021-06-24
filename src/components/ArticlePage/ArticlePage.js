/* eslint-disable jsx-a11y/media-has-caption */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/jsx-no-comment-textnodes */
import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { getArticleCards } from "../../services";
import {ArticleCards} from './ArticleCards';
import { ArticleReport } from './ArticleReport';

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
        <Col xs={3}><ArticleReport/></Col>
      </Row>
      {cards.map((data) => (
        <Row key={data.id} className="justify-content-md-center mt-3">
          <ArticleCards data={data}/>
        </Row>
      ))}
    </Container>
  );
};
