import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";

export const AddNewLocation = ({ setLocation }) => {
  const [locationData, setLocationData] = useState({
    state: "",
    city: "",
    locality: "",
  });
  function handleInputChange({ target }) {
    const { name, value } = target;
    setLocationData({ ...locationData, [name]: value });
  }
  function handleOnSubmit(e) {
    e.preventDefault();
    setLocation(locationData);
  }

  return (
    <div>
      <Form onSubmit={handleOnSubmit}>
        <Form.Row>
          <Form.Group>
            <Form.Control
              as="input"
              type="text"
              value={locationData.state}
              name="state"
              placeHolder="Enter State"
              onChange={handleInputChange}
            />
          </Form.Group>

          <Form.Group>
            <Form.Control
              as="input"
              type="text"
              value={locationData.city}
              name="city"
              placeHolder="Enter State"
              onChange={handleInputChange}
            />
          </Form.Group>

          <Form.Group>
            <Form.Control
              as="input"
              type="text"
              value={locationData.locality}
              name="locality"
              placeHolder="Enter locality"
              onChange={handleInputChange}
            />
          </Form.Group>
          <Button type="submit">Add</Button>
        </Form.Row>
      </Form>
    </div>
  );
};
