/* eslint-disable react/prop-types */
/* eslint-disable react/require-default-props */
import React, { useState, useEffect } from "react";
import { Col, Row, Image } from "react-bootstrap";
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
        <Col className="text-center mt-5">
          <h1 className=" text-capitalize font-weight-bolder">
            {article.title}
          </h1>
        </Col>
      </Row>

      <Row className="mt-1">
        <Col>
          <Row className="mx-2">
            <Col className="text-right mr-5">
              <small>
                {`${date.getDay()}th ${
                  monthNames[date.getMonth()]
                } ${date.getFullYear()}`}
              </small>
            </Col>
          </Row>
          <Row className="mx-2">
            <Col className="text-capitalize text-left ml-5">
              <small>
                by, <strong>{article.reporter.name}</strong>
              </small>
            </Col>
            <Col className="text-right mr-5">
              <small>
                {article.location.locality}
                <strong>{`, ${article.location.city}`}</strong>
              </small>
            </Col>
          </Row>
        </Col>
      </Row>
      <br />
      <Row>
        <Col className="text-center mt-5">
          <Image src={BASE_URL + article.thumbnailImage} fluid />
        </Col>
      </Row>
      <Row>
        <Col>
          <h2 className=" text-center text-muted">{article.description}</h2>
        </Col>
      </Row>
    </>
  );
};
