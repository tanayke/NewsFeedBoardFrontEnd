import React, { useState } from "react";
import { Form ,Col} from "react-bootstrap";
import { Field } from "formik";

export const AddNewLocation = ({handleChange, errors, touched}) => {
    
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
    <div className="form-group mr-auto" >
      <Field
         value={locationData.state}
         name="state"
         className="form-control"
         onChange={(e) => {
          handleChange(e);
          handleInputChange(e);
        }}
     / >
      {errors.state && touched.state ? <div>{errors.state}</div> : null}
    </div>

    <div className="form-group mr-auto" >
      <Field
         value={locationData.city}
         name="city"
         className="form-control"
         onChange={(e) => {
          handleChange(e);
          handleInputChange(e);
        }}
     / >
      {errors.city && touched.city ? <div>{errors.city}</div> : null}
    </div>

    <div className="form-group mr-auto" >
      <Field
         value={locationData.locality}
         name="locality"
         className="form-control"
         onChange={(e) => {
          handleChange(e);
          handleInputChange(e);
        }}
     / >
      {errors.locality && touched.locality ? <div>{errors.locality}</div> : null}
    </div>
    </div>
    </>

      
  );
};
