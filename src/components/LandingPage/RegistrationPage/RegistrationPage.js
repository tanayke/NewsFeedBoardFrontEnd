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
    role: Yup.string().is(
      ["READER", "REPORTER"],
      "Role must be READER or REPORTER"
    ),
    location: Yup.string(),
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

  return (
    <div>
      <Formik
        initialValues={{
          name: "",
          email: "",
          phone: "",
          password: "",
          role: "",
          location: "",
        }}
        validationSchema={validate}
        onSubmit={(data) => {
          console.log("hi from onsubmit");
          console.log(data);
          try {
            postUser(data);
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
                <Form.Control type='text' placeholder='Enter your full name' />
                {touched.name && errors.name && <div>{errors.name}</div>}
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
                {touched.email && errors.email && <div>{errors.email}</div>}
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
                {touched.phone && errors.phone && <div>{errors.phone}</div>}
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
                  <div>{errors.password}</div>
                )}
              </Form.Group>
              <Form.Group
                name='role'
                value={values.role}
                onChange={handleChange}
                onBlur={handleBlur}
                controlId='role'
              >
                <Form.Label>Register As</Form.Label>
                <Form.Control as='select'>
                  <option>--select your role--</option>
                  <option value='REPORTER'>Reporter</option>
                  <option value='READER'>Reader</option>
                </Form.Control>
                {touched.role && errors.role && <div>{errors.role}</div>}
              </Form.Group>
              <Form.Group
                name='location'
                value={values.location}
                onChange={handleChange}
                onBlur={handleBlur}
                controlId='location'
              >
                <Form.Label>Select Your Location</Form.Label>
                <Form.Control as='select'>
                  <option>--select your loacality--</option>
                  {locations.map((location) => (
                    <>
                      <option value={location.locality} key={location.id}>
                        {location.locality}
                      </option>
                    </>
                  ))}
                </Form.Control>
                {touched.location && errors.location && (
                  <div>{errors.location}</div>
                )}
              </Form.Group>

              <Button className='btn mt-3' variant='primary' type='submit'>
                Submit
              </Button>
              <Button
                className='btn btn-danger mt-3 ml-3'
                variant='danger'
                type='reset'
              >
                Reset
              </Button>
              <Link class=' ml-auto' to={LOGIN}>
                Already a User? LogIn
              </Link>
            </Form>
          </div>
        )}
      </Formik>
    </div>
  );
};
