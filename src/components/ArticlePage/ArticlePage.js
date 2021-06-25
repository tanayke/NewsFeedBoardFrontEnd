import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { getAllCardsByArticleId, getArticle } from "../../services";
import { ArticleCards } from "./ArticleCards";
import { ArticleDescription } from "./ArticleDescription";
import { ArticleReport } from "./ArticleReport";

export const ArticlePage = () => {
  const [article, setArticle] = useState();
  const [cards, setCards] = useState([]);
  const defStyles = {
    fontSize: "22px",
    fontFamily: "Times New Roman, Times,serif",
  };
  useEffect(() => {
    getAllCardsByArticleId(13).then((data) => {
      setCards(data);
    });
  }, []);
  useEffect(() => {
    getArticle(13).then((data) => {
      setArticle(data);
      console.log(data);
    });
  }, []);
  return !article ? null : (
    <>
      <Container className="mt-2" style={defStyles}>
        <ArticleDescription article={article} />
        {cards.map((data) => (
          <Row key={data.id} className="justify-content-md-center mt-5">
            <ArticleCards card={data} />
          </Row>
        ))}
        <Row>
          <Col xs={2} />
          <Col />
          <Col xs={2}>
            <ArticleReport />
          </Col>
        </Row>
      </Container>
    </>
  );
};
