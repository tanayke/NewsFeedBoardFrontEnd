import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import PropTypes from "prop-types";
import { VAR_ARRAY_STATES } from "../../constants";
import { getAllLocations, addLocation } from "../../services/locationService";

export const AddressComponent = ({locationFormData,setLocationFormData}) => {
  
  const [formData,setFormData]=useState({
    locality: "",
    city: "",
    state: "",
  }
    );

  const [cityFlag, setCityFlag] = useState(false);
  const [localityFlag, setLocalityFlag] = useState(false);

  const [cities, setCities] = useState([]);
  const [filterdCities, setFilteredCities] = useState([]);
  const [filterdLocality, setFilteredLocality] = useState([]);
 

  function handleInputChange({ target }) {
    const { name, value } = target;
    if (name === "state") {

      getAllLocations(value).then((data) => {
        if(data.length)
        {
          setCities(data);
          setFilteredCities(data.filter((v,i) => data.map((val)=> val.city).indexOf(v.city) === i ));
          setCityFlag(false);
          setLocalityFlag(false);
        }
        else
        {
          setCityFlag(true);
          setLocalityFlag(true);
        }
       
      });
    } else if (name === "city") {
      if (value === "other") {
        
        setCityFlag(true);
        setLocalityFlag(true);
      }
    } else if (name === "locality") {
     
      if (value === "other") {
        setLocalityFlag(true);
      }
    }
    setLocationFormData(value === "other"? { ...locationFormData, [name]: "" } : { ...locationFormData, [name]: value });
    
  }

  function add() {
   
    
    addLocation(locationFormData).then((data) => {
      // eslint-disable-next-line no-unused-expressions
      data ? alert("Location Added") : null;
      
    });
  }

 
  
  const { locality, city, state } = formData;

  return (
    <>
      <Form.Row>
        <Form.Group controlId="formGridState">
          <Form.Label>State</Form.Label>
          <Form.Control
            as="select"
            defaultValue="Choose"
            value={state}
            name="state"
            onChange={handleInputChange}
          >
            {VAR_ARRAY_STATES.map((s) => (
              <option key={s}>{s}</option>
            ))}
          </Form.Control>
        </Form.Group>

        {cityFlag ? (
          <Form.Group controlId="formGridCity2">
            <Form.Label>Enter City</Form.Label>
            <Form.Control
              as="input"
              type="text"
              value={city}
              name="city"
              placeHolder="Enter City"
              onChange={handleInputChange}
            />
          </Form.Group>
        ) : (
          <Form.Group controlId="formGridCity1">
            <Form.Label>City</Form.Label>
            <Form.Control
              as="select"
              defaultValue="Choose"
              value={city}
              name="city"
              onChange={handleInputChange}
            >
              <option> </option>
             {filterdCities
               .map((c) => (
                <option key={c.id}>{c.city}</option>
              ))}
              <option>other</option>
            </Form.Control>
          </Form.Group>
        )}

        {  localityFlag  ? (
          <Form.Group controlId="formGridLocality2">
            <Form.Label>Enter Locality</Form.Label>
            <Form.Control
              as="input"
              type="text"
              value={locality}
              name="locality"
              onChange={handleInputChange}
            />
          </Form.Group>
        ) : (
          <Form.Group controlId="formGridLocality1">
            <Form.Label>Locality</Form.Label>
            <Form.Control
              as="select"
              defaultValue="Choose"
              value={locality}
              name="locality"
              onChange={handleInputChange}
            >
              <option> </option>
              {cities
                .filter((c) => c.city === locationFormData.city)
                .map((filteredLocality) => (
                  <option key={filteredLocality.id} value={filteredLocality.id}>
                    {filteredLocality.locality}
                  </option>
                ))}
              <option>other</option>
            </Form.Control>
          </Form.Group>
        )}
         </Form.Row>
        {localityFlag ? (
          <Form.Group >
          <Form.Label />
          <Button variant="primary" type="submit" onClick={add}>
            Add Location
          </Button>
      
          </Form.Group>
        ) : null}
     

     
    </>
  );
};

AddressComponent.propTypes = {

  city:PropTypes.string.isRequired,
 
};