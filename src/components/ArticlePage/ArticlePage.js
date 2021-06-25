import React, { useState, useEffect } from "react";
import { Container, Row } from "react-bootstrap";
import { getArticleCards} from "../../services";
import { ArticleCards } from "./ArticleCards";
import {ArticleDescription} from './ArticleDescription';

export const ArticlePage = () => {
  const [cards, setCards] = useState([]);
  const defStyles = {
    fontSize: "22px",
    fontFamily: "Times New Roman, Times,serif",
  };
  useEffect(() => {
    getArticleCards(20).then((data) => {
      setCards(data);
    });
   } , []);
  console.log(cards);
  return (
    <Container className="mt-2" style={defStyles}>
      <ArticleDescription/>
      {cards.map((data) => (
        <Row key={data.id} className="justify-content-md-center mt-5">
          <ArticleCards data={data} />
        </Row>
      ))}
    </Container>
  );
};
