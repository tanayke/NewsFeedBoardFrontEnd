import React, { useEffect, useRef, useState } from "react";
import { Formik, ErrorMessage } from "formik";
import { Form, Button, Alert, Row, Col, Image } from "react-bootstrap";
import * as Yup from "yup";
import { Link, useHistory } from "react-router-dom";
import { postUser } from "../../../services/userService";

import * as App from "../../../App";
import { LOGIN, BASE_URL } from "../../../constants/CONSTANTS";
import {
  getAllLocations,
  addLocation,
} from "../../../services/locationService"; // eslint-disable-next-line arrow-body-style
import { AddNewLocation } from "../../sharedComponents/AddNewLocation";
import { SelectLocation } from "../../sharedComponents";

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
    confirmPassword: Yup.string().oneOf(
      [Yup.ref("password"), null],
      "Passwords must match!"
    ),
    role: Yup.string().default("READER"),
    state: Yup.string()
      .min(3, "Too Short!")
      .max(25, "Too Long!")
      .required("State Required!!"),
    city: Yup.string()
      .min(2, "Too Short!")
      .max(60, "Too Long!")
      .required("City Required!!"),
    locality: Yup.string().max(60, "Too Long!").required("Locality Required!!"),
    // location: Yup.string().required("Location is Required"),
  });

  const [locations, setLocations] = useState([]);
  const [err, setErr] = useState("");

  useEffect(() => {
    getAllLocations().then((data) => {
      setLocations(data);
    });
  }, []);
  useEffect(() => {
    console.log(err);
  }, [err]);
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
      {err === "" ? <span /> : <Alert variant="danger">{err}</Alert>}

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

          postUser(object)
            .then((response) => {
              console.log(response);
              setErr(response.msg);
              if (response.status === 200) history.push(LOGIN);
              if (response.status === 409) {
                setErr(response.msg);
                console.log(response.msg);
                window.scrollTo(0, 0);
              }
            })
            .catch((error) => {
              console.log(error.msg);
              setErr(error.msg);
            });
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
            <Row>
              <Col md={8} className="ml-5">
                <Form
                  ref={registrationForm}
                  onSubmit={handleSubmit}
                  className="col-md-6"
                >
                  <h2 className="mt-5 mb-3">
                    <span>REGISTRA</span>
                    <span style={{ color: "#007bff" }}>TION</span>
                  </h2>

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
                      placeholder="Enter Your Full Name"
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
                      placeholder="Enter Your Email"
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
                      placeholder="Enter Your Password"
                      name="password"
                    />
                    {touched.password && errors.password && (
                      <div style={{ color: "red" }}>{errors.password}</div>
                    )}
                  </Form.Group>

                  <Form.Group
                    name="confirmPassword"
                    value={values.confirmPassword}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    controlId="confirmPassword"
                  >
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="Enter Your Password Again"
                      name="confirmPassword"
                    />
                    {touched.confirmPassword && errors.confirmPassword && (
                      <div style={{ color: "red" }}>
                        {errors.confirmPassword}
                      </div>
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
                    {isNewLocation ? (
                      <AddNewLocation
                        handleChange={handleChange}
                        errors={errors}
                        touched={touched}
                      />
                    ) : (
                      <SelectLocation
                        handleChange={handleChange}
                        errors={errors}
                        touched={touched}
                      />
                    )}

                    <Button onClick={addNewLocation}> Add New Location</Button>
                  </Form.Group>

                  <div className="mt-4">
                    <Button className="btn" variant="primary" type="submit">
                      Register
                    </Button>

                    <Link className="ml-3 mt-3" to={LOGIN}>
                      Already a User? Login
                    </Link>
                  </div>
                </Form>
              </Col>
              <Col md={2} className="mt-5">
                <Image
                  src={`${BASE_URL}/login.png`}
                  widht="300vw"
                  height="500vh"
                />
              </Col>
              <Col md={2} />
            </Row>
          </div>
        )}
      </Formik>
    </div>
  );
};
