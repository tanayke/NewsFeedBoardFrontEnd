import React, { useEffect, useRef, useState } from "react";
import { Formik, ErrorMessage } from "formik";
import { Form, Button, FloatingLabel } from "react-bootstrap";
import * as Yup from "yup";
import { Link, useHistory } from "react-router-dom";
import { postUser } from "../../../services/userService";

import * as App from "../../../App";
import { VAR_ARRAY_STATES, LOGIN } from "../../../constants/CONSTANTS";
import {
  getAllLocations,
  addLocation,
} from "../../../services/locationService"; // eslint-disable-next-line arrow-body-style
import { AddNewLocation } from "../../sharedComponents/AddNewLocation";
import { SelectLocation } from "../../sharedComponents/SelectLocation";

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

  let formData;

  function getFormData() {
    return formData;
  }
  const history = useHistory();

  const [isNewLocation, setNewLocation] = useState(false);

  function addNewLocation() {
    if (isNewLocation) setNewLocation(false);
    else setNewLocation(true);
  }

  const registrationForm = useRef(null);

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

          console.log("reg", registrationForm.current);
          const data1 = new FormData(registrationForm.current);

          data1.append("isNewLocation", isNewLocation);

          // eslint-disable-next-line no-restricted-syntax
          for (const val of data1.keys()) {
            console.log(val);
          }
          // eslint-disable-next-line prefer-const
          let object = {};

          data1.forEach((value, key) => {
            object[key] = value;
          });

          console.log("formdatatojson", object);

          if (object.isReporter) {
            object.role = "REPORTER";
          }
          try {
            const response = postUser(object);
            if (response.status === 200) history.push(LOGIN);
          } catch (error) {
            console.log(error.data);
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
            <Form
              ref={registrationForm}
              onSubmit={handleSubmit}
              className="col-md-6"
            >
              <h2>Registration</h2>

              <Form.Group
                name="name"
                value={values.name}
                onChange={handleChange}
                onBlur={handleBlur}
                controlId="name"
              >
                <Form.Label>Full Name</Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  placeholder="Enter your full name"
                />
                {touched.name && errors.name && (
                  <div style={{ color: "red" }}>{errors.name}</div>
                )}
              </Form.Group>
              <Form.Group
                name="email"
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
                controlId="email"
              >
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  name="email"
                />
                {/* <Form.Text className='text-muted'>
                  We will never share your email with anyone else.
                </Form.Text> */}
                {touched.email && errors.email && (
                  <div style={{ color: "red" }}>{errors.email}</div>
                )}
              </Form.Group>
              <Form.Group
                name="phone"
                value={values.phone}
                onChange={handleChange}
                onBlur={handleBlur}
                controlId="phone"
              >
                <Form.Label>Phone</Form.Label>
                <Form.Control
                  type="phone"
                  placeholder="Enter Mobile Number"
                  name="phone"
                />
                {/* <Form.Text className='text-muted'>
                  We will never share your Mobile Number with anyone else.
                </Form.Text> */}
                {touched.phone && errors.phone && (
                  <div className="validation" style={{ color: "red" }}>
                    {errors.phone}
                  </div>
                )}
              </Form.Group>
              <Form.Group
                name="password"
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
                controlId="password"
              >
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Password"
                  name="password"
                />
                {touched.password && errors.password && (
                  <div style={{ color: "red" }}>{errors.password}</div>
                )}
              </Form.Group>

              <Form.Group
                name="isReporter"
                value={values.isReporter}
                onChange={handleChange}
                onBlur={handleBlur}
                controlId="role"
              >
                <Form.Label>
                  Do you want to Post News Articles and Stories?{" "}
                </Form.Label>
                <Form.Check
                  name="isReporter"
                  type="checkbox"
                  label="Check here"
                />
              </Form.Group>

              <Form.Group>
                {isNewLocation ? <AddNewLocation /> : <SelectLocation />}

                <Button onClick={addNewLocation}> Add New Location</Button>
              </Form.Group>

              <Button className="btn mt-3" variant="primary" type="submit">
                Submit
              </Button>
              <br />

              <Link class=" ml-auto" to={LOGIN}>
                Already a User? Login
              </Link>
            </Form>
          </div>
        )}
      </Formik>
    </div>
  );
};
