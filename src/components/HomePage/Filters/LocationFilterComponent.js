/* eslint-disable react/prop-types */
/* eslint-disable arrow-body-style */

import React, { useState, useEffect, useContext } from "react";
import { Form, Container, Row, Col } from "react-bootstrap";
import { getAllLocations } from "../../../services";
import { ArticleFilterContext } from "../../context/ArticleFilterContext/ArticleFilterContext";

export const LocationFilterComponent = ({
  locationId,
  handleLocationChange,
  setLocationId,
}) => {
  const [address, setAddress] = useState({
    state: "",
    city: "",
    locality: "",
  });
  const [statesOfIndia, setStatesOfIndia] = useState([]);
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

  useEffect(() => {
    getAllLocations(address.state).then((data) => {
      setStatesOfIndia(
        data.filter(
          (v, i) => data.map((val) => val.state).indexOf(v.state) === i
        )
      );
    });
  }, []);
  return (
    <>
      <div className="pt-3">
        By Locality
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
                  <option>All</option>
                  {statesOfIndia.map((state) => (
                    <option key={state.id} value={state.state}>
                      {state.state}
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
