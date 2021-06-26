/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/media-has-caption */
/* eslint-disable react/forbid-prop-types */
import React from "react";
import { Col, Image } from "react-bootstrap";
import { BASE_URL } from "../../constants";

export const ArticleCards = ({ card }) => {
  const { content, type } = card;
  if (type === "IMAGE") {
    return (
      <>
        <Col className="ml-2 text-center">
          <Image src={BASE_URL + content} fluid />
          {/* <img src={BASE_URL + content} alt="img" height={500} /> */}
        </Col>
      </>
    );
  }
  if (type === "TEXT") {
    return (
      <>
        <Col className="mt-2">
          <p>{content}</p>
        </Col>
      </>
    );
  }
  return (
    <>
      <Col className="text-center mt-2">
        <video width="auto" style={{ maxWidth: "90%" }} controls>
          <source src={BASE_URL + content} type="video/mp4" />
        </video>
      </Col>
    </>
  );
};
