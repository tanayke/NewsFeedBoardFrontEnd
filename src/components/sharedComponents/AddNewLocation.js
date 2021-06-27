import React, { useState } from "react";
import { Field, getIn } from "formik";

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

export const AddNewLocation = ({ handleChange }) => {
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
    <>
      <div className="form-row">
        <div className="form-group col-md-4">
          <Field
            value={locationData.state}
            name="state"
            className="form-control"
            onChange={(e) => {
              handleChange(e);
              handleInputChange(e);
            }}
            placeholder="Enter State"
          />
          <ErrorMessage name="state" />
        </div>

        <div className="form-group col-md-4">
          <Field
            value={locationData.city}
            name="city"
            className="form-control"
            onChange={(e) => {
              handleChange(e);
              handleInputChange(e);
            }}
            placeholder="Enter City"
          />
          <ErrorMessage name="city" />
        </div>

        <div className="form-group col-md-4">
          <Field
            value={locationData.locality}
            name="locality"
            className="form-control"
            onChange={(e) => {
              handleChange(e);
              handleInputChange(e);
            }}
            placeholder="Enter Locality"
          />
          <ErrorMessage name="locality" />
        </div>
      </div>
    </>
  );
};
