import React, { useEffect, useState } from "react";
import { Formik, ErrorMessage } from "formik";
import { Form, Button, FloatingLabel } from "react-bootstrap";
import * as Yup from "yup";
import axios from "axios";
import { Link, useHistory } from "react-router-dom";
import { postUser } from "../../../services/userService";

import * as App from "../../../App";
import { VAR_ARRAY_STATES, LOGIN } from "../../../constants/CONSTANTS";
import {
  getAllLocations,
  addLocation,
} from "../../../services/locationService"; // eslint-disable-next-line arrow-body-style

export const RegistrationPage = () => {
  const validate = Yup.object({
    name: Yup.string()
      .max(30, "Name Must Be 30 characters or less")
      .required("Name is Required"),
    email: Yup.string().email("Email is Invalid").required("Email is Required"),
    phone: Yup.string()
      .matches("^[0-9]{10}$", "Phone Number is Invalid")
      .min(10, "Phone number should be 10 charcters long")
      .max(10, "Phone number should be 10 charcters long")
      .required("Phone is Required"),
    password: Yup.string()
      .min(6, "Password must be atleat 6 characters long")
      .required("Password is Required"),
    role: Yup.string().default("READER"),
    // location: Yup.string().required("Location is Required"),
  });

  const [locations, setLocations] = useState([]);

  useEffect(() => {
    getAllLocations().then((data) => {
      setLocations(data);
    });
  }, []);

  console.log(locations.locality);
  let formData;

  function getFormData() {
    return formData;
  }
  const history = useHistory();

  const [formDataAdd, setFormData] = useState({
    locality: "",
    city: "",
    state: "",
  });

  const [flag, setFlag] = useState(false);

  const [cities, setCities] = useState([]);

  function handleInputChange({ target }) {
    const { name, value } = target;
    if (name === "state") {
      getAllLocations(value).then((data) => {
        setCities(data);
      });
    } else if (name === "city") {
      if (value === "other") {
        setFlag(true);
      }
    } else if (name === "locality") {
      if (value === "other") {
        setFlag(true);
      }
    }
    setFormData(
      value === "other"
        ? { ...formDataAdd, [name]: "" }
        : { ...formDataAdd, [name]: value }
    );
  }

  function add() {
    console.log("in Add Function");
    console.log(formDataAdd);
    addLocation(formDataAdd).then((data) => {
      // eslint-disable-next-line no-unused-expressions
      data ? alert("Location Added") : null;
      console.log(data);
    });
  }
  const { locality, city, state } = formDataAdd;

  return (
    <div>
      <Formik
        initialValues={{
          name: "",
          email: "",
          phone: "",
          password: "",
          isReporter: false,
          role: "READER",
          state: "",
          city: "",
          locality: "",
        }}
        validationSchema={validate}
        onSubmit={(data) => {
          console.log("hi from onsubmit");
          console.log("formdata", data);
          // eslint-disable-next-line prefer-const
          let postData = data;
          if (postData.isReporter) {
            postData.role = "REPORTER";
          }
          try {
            postUser(postData);
            // history.push(LOGIN);
          } catch (error) {
            console.log(error);
          }
        }}
      >
        {({
          values,
          handleChange,
          handleBlur,
          handleSubmit,
          errors,
          touched,
        }) => (
          <div>
            <Form onSubmit={handleSubmit} className='col-md-6'>
              <h2>Registration</h2>

              <Form.Group
                name='name'
                value={values.name}
                onChange={handleChange}
                onBlur={handleBlur}
                controlId='name'
              >
                <Form.Label>Full Name</Form.Label>
                <Form.Control
                  type='text'
                  name='name'
                  placeholder='Enter your full name'
                />
                {touched.name && errors.name && (
                  <div style={{ color: "red" }}>{errors.name}</div>
                )}
              </Form.Group>
              <Form.Group
                name='email'
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
                controlId='email'
              >
                <Form.Label>Email address</Form.Label>
                <Form.Control type='email' placeholder='Enter email' />
                {/* <Form.Text className='text-muted'>
                  We will never share your email with anyone else.
                </Form.Text> */}
                {touched.email && errors.email && (
                  <div style={{ color: "red" }}>{errors.email}</div>
                )}
              </Form.Group>
              <Form.Group
                name='phone'
                value={values.phone}
                onChange={handleChange}
                onBlur={handleBlur}
                controlId='phone'
              >
                <Form.Label>Phone</Form.Label>
                <Form.Control type='phone' placeholder='Enter Mobile Number' />
                {/* <Form.Text className='text-muted'>
                  We will never share your Mobile Number with anyone else.
                </Form.Text> */}
                {touched.phone && errors.phone && (
                  <div className='validation' style={{ color: "red" }}>
                    {errors.phone}
                  </div>
                )}
              </Form.Group>
              <Form.Group
                name='password'
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
                controlId='password'
              >
                <Form.Label>Password</Form.Label>
                <Form.Control type='password' placeholder='Password' />
                {touched.password && errors.password && (
                  <div style={{ color: "red" }}>{errors.password}</div>
                )}
              </Form.Group>

              <Form.Group
                name='isReporter'
                value={values.isReporter}
                onChange={handleChange}
                onBlur={handleBlur}
                controlId='role'
              >
                <Form.Label>
                  Do you want to Post News Articles and Stories?{" "}
                </Form.Label>
                <Form.Check
                  name='isReporter'
                  type='checkbox'
                  label='Check here'
                />
              </Form.Group>

              <>
                <Form.Label>Select Your Location</Form.Label>

                <Form.Row>
                  <Form.Group controlId='state'>
                    <Form.Label>State</Form.Label>
                    <Form.Control
                      as='select'
                      defaultValue='Choose'
                      value={state}
                      name='state'
                      onChange={handleInputChange}
                    >
                      {VAR_ARRAY_STATES.map((s) => (
                        <option key={s}>{s}</option>
                      ))}
                    </Form.Control>
                  </Form.Group>{" "}
                  {"\u00A0"}
                  {"\u00A0"}
                  {"\u00A0"}
                  {flag ? (
                    <Form.Group controlId='city'>
                      <Form.Label>Enter City</Form.Label>
                      <Form.Control
                        as='input'
                        type='text'
                        value={city}
                        name='city'
                        placeHolder='Enter City'
                        onChange={handleInputChange}
                      />
                    </Form.Group>
                  ) : (
                    <Form.Group controlId='city'>
                      <Form.Label>City</Form.Label>
                      <Form.Control
                        as='select'
                        defaultValue='Choose'
                        value={city}
                        name='city'
                        onChange={handleInputChange}
                      >
                        {cities.map((c) => (
                          <option key={c.id}>{c.city}</option>
                        ))}
                        <option>other</option>
                      </Form.Control>
                    </Form.Group>
                  )}
                  {"\u00A0"}
                  {"\u00A0"}
                  {"\u00A0"}
                  {flag ? (
                    <Form.Group controlId='locality'>
                      <Form.Label>Enter Locality</Form.Label>
                      <Form.Control
                        as='input'
                        type='text'
                        value={locality}
                        name='locality'
                        onChange={handleInputChange}
                      />
                    </Form.Group>
                  ) : (
                    <Form.Group controlId='locality'>
                      <Form.Label>Locality</Form.Label>
                      <Form.Control
                        as='select'
                        defaultValue='Choose'
                        value={locality}
                        name='locality'
                        onChange={handleInputChange}
                      >
                        {cities
                          .filter((c) => c.city === formData.city)
                          .map((filteredLocality) => (
                            <option key={filteredLocality.id}>
                              {filteredLocality.locality}
                            </option>
                          ))}
                        <option>other</option>
                      </Form.Control>
                    </Form.Group>
                  )}
                  {flag ? (
                    <Button variant='primary' type='submit' onClick={add}>
                      Add Location
                    </Button>
                  ) : null}
                </Form.Row>
                {touched.location && errors.location && (
                  <div style={{ color: "red" }}>{errors.location}</div>
                )}
              </>

              <Button className='btn mt-3' variant='primary' type='submit'>
                Submit
              </Button>
              <br />

              <Link class=' ml-auto' to={LOGIN}>
                Already a User? Login
              </Link>
            </Form>
          </div>
        )}
      </Formik>
    </div>
  );
};
