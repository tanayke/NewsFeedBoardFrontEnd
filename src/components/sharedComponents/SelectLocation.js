import React, { useState, useEffect } from "react";
import { Field, getIn } from "formik";

import { getAllLocations } from "../../services/locationService";

const ErrorMessage = ({ name }) => (
  <div style={{ color: "red" }}>
    <Field
      name={name}
      render={({ form }) => {
        const error = getIn(form.errors, name);
        const touch = getIn(form.touched, name);
        return touch && error ? error : null;
      }}
    />
  </div>
);

export const SelectLocation = ({ handleChange, errors, touched }) => {
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
      setStateLcation(data);
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
      <div className="form-row">
        <div className="form-group col-md-4">
          <Field
            name="state"
            value={formData.state}
            as="select"
            className="form-control"
            onChange={(e) => {
              handleChange(e);
              handleInputChange(e);
            }}
          >
            <option>Select State</option>
            {stateLocation.map((s) => (
              <option key={s.id}>{s.state}</option>
            ))}
          </Field>
          <ErrorMessage name="state" />
        </div>

        <div className="form-group col-md-4">
          <Field
            name="city"
            value={formData.city}
            as="select"
            className="form-control"
            onChange={(e) => {
              handleChange(e);
              handleInputChange(e);
            }}
          >
            <option>Select City</option>
            {filterdCities.map((c) => (
              <option key={c.id}>{c.city}</option>
            ))}
          </Field>
          <ErrorMessage name="city" />
        </div>

        <div className="form-group col-md-4">
          <Field
            name="locality"
            value={formData.locality}
            as="select"
            className="form-control"
            onChange={(e) => {
              handleChange(e);
              handleInputChange(e);
            }}
          >
            <option>Select Locality</option>
            {cities
              .filter((c) => c.city === formData.city)
              .map((filteredLocality) => (
                <option key={filteredLocality.id} value={filteredLocality.id}>
                  {filteredLocality.locality}
                </option>
              ))}
          </Field>
          <ErrorMessage name="locality" />
        </div>

        {/*     
      
        <Form.Group controlId="state" as={Col}>
         <Field
            as="select"
            defaultValue="Choose"
            value={formData.state}
            name="state"
            onChange={(e)=>{handleChange(e);handleInputChange(e)}}
            className="form-control"
          >
          <option>Select State</option>
            {stateLocation.map((s) => (
              <option key={s.id}>{s.state}</option>
            ))}
          </Field>
         
        </Form.Group>
          <Form.Group controlId="city" as={Col}>
            <Form.Control
              as="select"
              defaultValue="Choose"
              value={formData.city}
              name="city"
              onChange={handleInputChange}
              required
            >
             <option >Select City</option>
             {filterdCities
               .map((c) => (
                <option key={c.id}>{c.city}</option>
              ))}
            </Form.Control>
          </Form.Group>

          <Form.Group controlId="locality" as={Col}>
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
          </Form.Group> */}
      </div>
    </>
  );
};
