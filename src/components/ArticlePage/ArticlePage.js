import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { FaFacebookF, FaWhatsapp, FaLinkedinIn } from "react-icons/fa";
import { getAllCardsByArticleId, getArticle } from "../../services";
import { ArticleCards } from "./ArticleCards";
import { ArticleDescription } from "./ArticleDescription";
import { ArticleReport } from "./ArticleReport";

export const ArticlePage = ({ match: { params } }) => {
  const [article, setArticle] = useState();
  const [cards, setCards] = useState([]);
  const defStyles = {
    fontSize: "22px",
    fontFamily: "Times New Roman, Times,serif",
  };
  useEffect(() => {
    getAllCardsByArticleId(params.articleId).then((data) => {
      setCards(data);
    });
  }, []);
  useEffect(() => {
    getArticle(params.articleId).then((data) => {
      setArticle(data);
      console.log(data);
    });
  }, []);
  return !article ? null : (
    <>
      <Container>
        <Row className="mt-2" style={defStyles}>
          <Row>
            {/* <Col md={1} /> */}
            <Col ms={10}>
              <ArticleDescription article={article} />
            </Col>
            {/* <Col md={1} /> */}
          </Row>
          <Row className="mt-5 p-1">
            <Col md={1} />
            <Col md={10}>
              {cards.map((data) => (
                <Row key={data.id}>
                  <ArticleCards card={data} />
                </Row>
              ))}
            </Col>
            <Col md={1} />
          </Row>
          <Row>
            <Col md={1} />

            <Col md={10} className="text-left">
              <ArticleReport />
            </Col>
            {/* <Col className="text-right ml-5">
              <small className=" ml-3 ">
                <FaFacebookF />
              </small>
              <small className=" ml-3">
                {" "}
                <FaWhatsapp />
              </small>
              <small className=" ml-3">
                <FaLinkedinIn />
              </small>
            </Col> */}
            <Col md={1} />
          </Row>
        </Row>
      </Container>
    </>
  );
};
