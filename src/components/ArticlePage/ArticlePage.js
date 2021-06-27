import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { FaFacebookF, FaWhatsapp, FaLinkedinIn } from "react-icons/fa";
// eslint-disable-next-line camelcase
import jwt_decode from "jwt-decode";
import { getAllCardsByArticleId, getArticle } from "../../services";
import { ArticleCards } from "./ArticleCards";
import { ArticleDescription } from "./ArticleDescription";
import { ArticleReport } from "./ArticleReport";
import { updateViewCount } from "../../services/articleService";

export const ArticlePage = ({ match: { params } }) => {
  const [article, setArticle] = useState();
  const user = sessionStorage.getItem("x-auth-token")
    ? jwt_decode(sessionStorage.getItem("x-auth-token")).user
    : null;
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
    updateViewCount(params.articleId).then((response) => {
      if (response.status === 200) console.log(response.data);
    });
  }, []);
  return !article ? null : (
    <>
      <Container>
        <Row className="d-flex justify-content-center mt-2" style={defStyles}>
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

            <Col md={10} className="text-center my-3 p-2 ">
              <ArticleReport articleId={params.articleId} userId={user.id} />
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
