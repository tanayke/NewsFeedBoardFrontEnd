import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { getArticleCards } from "../../services";
import profile from "./profile.png";
import BASE_URL from '../..constants';

export const ArticlePage = () => {
  const [cards, setCards] = useState([]);
  useEffect(() => {
    getArticleCards(20).then((data) => {
      setCards(data);
    });
  }, []);
  console.log(cards);
  return (
    <Container>
      <Row>
        <Col xs={2} className="mt-5" />
        <Col>
          <img
            src={profile}
            alt="Avatar"
            className="avatar"
            width={100}
            height={100}
          />
          <Row>
            <small className="ml-3">Created by</small>
          </Row>
          <Row>
            <small className="ml-3">john cena</small>
          </Row>
        </Col>
        <Col xs={2} />
      </Row>
      {cards.map((data) => (
        <Row key={data.id} className="justify-content-md-center mt-2">
          if(data.type === 'IMAGE') 
          <Col>
               <img src={BASE_URL}{data.content}/>
          </Col>
          if(data.type === 'TEXT')
          <Col>
               <p>{data.content}</p>
          </Col>
          else
          <Col xs={2}>{data.order}</Col>
        </Row>
      ))}
    </Container>
  );
};
