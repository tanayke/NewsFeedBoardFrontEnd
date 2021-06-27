import React from "react";
import { Link } from "react-router-dom";
import { Image, Row } from "react-bootstrap";
import { BASE_URL } from "../../constants";

export const NotFoundPage = () => (
  <div>
    <Row className="d-flex justify-content-center">
      <Image
        className="mt-5"
        src={`${BASE_URL}/404.png`}
        alt="not found"
        fluid
      />
    </Row>

    <h3 style={{ textAlign: "center" }}>
      <Link to="/">Go to Home </Link>
    </h3>
  </div>
);
export default NotFoundPage;
