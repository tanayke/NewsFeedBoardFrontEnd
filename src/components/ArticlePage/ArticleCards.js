/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/media-has-caption */
/* eslint-disable react/forbid-prop-types */
import React from "react";
import { Col } from "react-bootstrap";
import { BASE_URL } from "../../constants";

export const ArticleCards = ({ card }) => {
  const { content, type } = card;
  if (type === "IMAGE") {
    return (
      <>
        <Col xs={2} />
        <Col className="ml-5">
          <img src={BASE_URL + content} alt="img" width={500} height={400} />
        </Col>
        <Col xs={2} />
      </>
    );
  }
  if (type === "TEXT") {
    return (
      <>
        <Col xs={2} />
        <Col className="mr-4">
          <p>{content}</p>
        </Col>
        <Col xs={2} />
      </>
    );
  }
  return (
    <>
      <Col xs={2} />
      <Col className="ml-5">
        <video width="500" height="400" controls>
          <source src={BASE_URL + content} type="video/mp4" />
        </video>
      </Col>
      <Col xs={2} />
    </>
  );
};
