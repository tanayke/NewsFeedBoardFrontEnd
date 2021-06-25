/* eslint-disable react/prop-types */
/* eslint-disable arrow-body-style */

import React, { useState, useEffect, useContext } from "react";
import { Form, Container, Row, Col } from "react-bootstrap";
import { VAR_ARRAY_STATES } from "../../../constants";
import { getAllLocations } from "../../../services";
import { ArticleFilterContext } from "../../context/ArticleFilterContext/ArticleFilterContext";

export const LocationFilterComponent = ({
  locationId,
  handleLocationChange,
  setLocationId,
}) => {
  const [address, setAddress] = useState({
    state: VAR_ARRAY_STATES[0],
    city: "",
    locality: "",
  });

  const [locations, setLocations] = useState([]);
  const { articleFilters, setArticleFilters } =
    useContext(ArticleFilterContext);

  const handleStateChange = ({ target }) => {
    setAddress({ ...address, state: target.value });
    setLocationId(undefined);
    setArticleFilters({
      ...articleFilters,
      locationId: undefined,
    });
  };

  useEffect(() => {
    getAllLocations(address.state).then((data) => {
      setLocations(data);
    });
    setArticleFilters({
      ...articleFilters,
      locationId,
    });
    console.log(locationId);
  }, [address, locationId]);

  return (
    <>
      <div className="pt-3">
        by Locality
        <hr />
        <Container>
          <Row>
            <Col>
              <Form.Group>
                <Form.Label>State</Form.Label>
                <Form.Control
                  as="select"
                  onChange={handleStateChange}
                  value={address.state}
                >
                  {VAR_ARRAY_STATES.map((state) => (
                    <option key={state} value={state}>
                      {state}
                    </option>
                  ))}
                </Form.Control>
              </Form.Group>
            </Col>
            <Col>
              <Form.Group>
                <Form.Label>Locality</Form.Label>
                <Form.Control
                  as="select"
                  onChange={handleLocationChange}
                  value={locationId}
                >
                  <option defaultsValue>All</option>
                  {locations.map((location) => (
                    <option key={location.id} value={location.id}>
                      {location.locality}
                      {", "}
                      {location.city}
                    </option>
                  ))}
                </Form.Control>
              </Form.Group>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
};
