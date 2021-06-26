/* eslint-disable react/prop-types */
/* eslint-disable react/require-default-props */
import React, { useState, useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import { BASE_URL } from "../../constants";

export const ArticleDescription = ({ article }) => {
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const date = new Date(article.uploadDateTime);
  console.log(JSON.stringify(date));
  console.log(article);

  return !article ? null : (
    <>
      <Row>
        <Col xs={2} className="mt-5" />
        <Col>
          <Row>
            <small className="ml-3">{article.reporter.name}</small>
          </Row>
          <Row>
            <small className="ml-3">{`${
              monthNames[date.getMonth()]
            } ${date.getDay()},${date.getFullYear()}`}</small>
          </Row>
          <Row>
            <small className="ml-3">Pune</small>
          </Row>
        </Col>
      </Row>
      <Row className="mt-5">
        <Col xs={2} />
        <Col>
          <h2 className="ml-3">{article.title}</h2>
        </Col>
        <Col xs={2} />
      </Row>
      <Row>
        <Col xs={2} />
        <Col className="ml-5">
          <img
            src={BASE_URL + article.thumbnailImage}
            alt="img"
            width={500}
            height={400}
          />
        </Col>
        <Col xs={2} />
      </Row>
      <Row>
        <Col xs={2} />
        <Col>
          <h4 className="ml-4 mt-2">{article.description}</h4>
        </Col>
        <Col xs={2} />
      </Row>
    </>
  );
};