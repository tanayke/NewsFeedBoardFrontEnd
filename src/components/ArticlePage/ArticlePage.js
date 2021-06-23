import React ,{useState,useEffect} from "react";
import { Container, Row, Col} from 'react-bootstrap';
import {getArticleCards} from '../../services';

export const ArticlePage = () => {
  const [cards,setCards] = useState([]);
  useEffect(()=>{
    getArticleCards(20).then(data=>{
      setCards(data);
    });
  },[])
  console.log(cards);
  return(
    <Container>
      
      {cards.map(data=>(
        <Row key={data.id}>
        <Col xs={2}>{data.type}</Col>
        <Col>{data.content}</Col>
        <Col xs={2}>{data.order}</Col>
      </Row>
      ))}
    </Container>
);
}
