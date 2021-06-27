import React, { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";

import { getAllLocations } from "../../services/locationService";

export const SelectLocation = () => {
  const [formData, setFormData] = useState({
    locality: "",
    city: "",
    state: "",
  });

  const [locations, setLocations] = useState([]);
  const [stateLocation, setStateLcation] = useState([]);
  const [cities, setCities] = useState([]);
  const [filterdCities, setFilteredCities] = useState([]);

  function handleInputChange({ target }) {
    const { name, value } = target;
    if (name === "state") {
      setCities(locations.filter((c) => c.state === value));
    }
    setFormData({ ...formData, [name]: value });
  }

  useEffect(() => {
    getAllLocations().then((data) => {
      setLocations(data);
      setStateLcation(
        data.filter(
          (v, i) => data.map((val) => val.state).indexOf(v.state) === i
        )
      );
    });
  }, []);

  useEffect(() => {
    setFilteredCities(
      cities.filter(
        (v, i) => cities.map((val) => val.city).indexOf(v.city) === i
      )
    );
  }, [cities]);

  return (
    <>
      <Form.Row>
        <Form.Group controlId="state" className='mr-3'>
          <Form.Control
            as="select"
            defaultValue="Choose"
            value={formData.state}
            name="state"
            onChange={handleInputChange}
            required
          >
            <option>Select State</option>
            {stateLocation.map((s) => (
              <option key={s.id}>{s.state}</option>
            ))}
          </Form.Control>
        </Form.Group>
        <Form.Group controlId="city" className='mr-3'>
          <Form.Control
            as="select"
            defaultValue="Choose"
            value={formData.city}
            name="city"
            onChange={handleInputChange}
            required
          >
            <option>Select City</option>
            {filterdCities.map((c) => (
              <option key={c.id}>{c.city}</option>
            ))}
          </Form.Control>
        </Form.Group>

        <Form.Group controlId="locality"> 
          <Form.Control
            as="select"
            defaultValue="Choose"
            value={formData.locality}
            name="locality"
            onChange={handleInputChange}
            required
          >
            <option>Select Locality</option>
            {cities
              .filter((c) => c.city === formData.city)
              .map((filteredLocality) => (
                <option key={filteredLocality.id} value={filteredLocality.id}>
                  {filteredLocality.locality}
                </option>
              ))}
          </Form.Control>
        </Form.Group>
      </Form.Row>
    </>
  );
};
