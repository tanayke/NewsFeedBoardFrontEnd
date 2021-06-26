import React, { useState } from "react";
import { Form ,Col} from "react-bootstrap";
import { Field } from "formik";

export const AddNewLocation = () => {
    
  const [locationData, setLocationData] = useState({
    state: "",
    city: "",
    locality: "",
  });

  function handleInputChange({ target }) {
    const { name, value } = target;
    setLocationData({ ...locationData, [name]: value });
  }

  return (
      <Form.Row>
        <Form.Group as={Col}>
          <Form.Control
            as="input"
            type="text"
            value={locationData.state}
            name="state"
            placeHolder="Enter State"
            onChange={handleInputChange}
            required
          />
        </Form.Group>

        <Form.Group as={Col}>
          <Form.Control
            as="input"
            type="text"
            value={locationData.city}
            name="city"
            placeHolder="Enter City"
            onChange={handleInputChange}
            required
          />
        </Form.Group>

        <Form.Group as={Col}>
          <Form.Control
            as="input"
            type="text"
            value={locationData.locality}
            name="locality"
            placeHolder="Enter locality"
            onChange={handleInputChange}
            required
          />
        </Form.Group>
      </Form.Row> 
  );
};
