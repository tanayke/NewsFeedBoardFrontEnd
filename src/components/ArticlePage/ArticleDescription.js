/* eslint-disable react/prop-types */
/* eslint-disable react/require-default-props */
import React, { useState, useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import { FaFacebookF, FaWhatsapp, FaLinkedinIn } from "react-icons/fa";
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

      <Row className="mt-5">
        <Col xs={1} />
        <Col sm>
          <small className="ml-3" style={{ fontSize: "20px" }}>
            {article.reporter.name}
          </small>
          <small className="ml-3" style={{ fontSize: "20px" }}>{`${
            monthNames[date.getMonth()]
          } ${date.getDay()},${date.getFullYear()}`}</small>
          <small className="ml-3" style={{ fontSize: "20px" }}>
            {article.location.city}
          </small>
        </Col>
        <Row>
          <small className="ml-3">
            <FaFacebookF />
          </small>
          <small className="ml-3">
            {" "}
            <FaWhatsapp />
          </small>
          <small className="ml-3">
            <FaLinkedinIn />
          </small>
        </Row>

        <Col xs={1} />
      </Row>
      <br />
      <Row>
        <Col />
        <Col className="ml-5">
          <img
            src={BASE_URL + article.thumbnailImage}
            alt="img"
            width={1000}
            height={500}
          />
        </Col>
        <Col />
      </Row>
      <Row>
        <Col xs={1} />
        <Col>
          <h4 className="ml-4 mt-2">{article.description}</h4>
          <br />
        </Col>
        <Col xs={1} />
      </Row>
    </>
  );
};
