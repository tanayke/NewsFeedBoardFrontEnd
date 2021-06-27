import React, { useContext } from "react";
import * as Yup from "yup";
import { Formik } from "formik";
import { Form, Button, Row, Col, Image } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import { ADMIN, HOME, REGISTER, WRITE, BASE_URL } from "../../../constants";
import { authenticateUser, getAuthUser } from "../../../services/userService";
import { UserContext } from "../../context/UserContext/UserContext";
import { setAuthtoken } from "../../../utils/setAuthToken";

// eslint-disable-next-line arrow-body-style

// eslint-disable-next-line arrow-body-style
export const LoginPage = () => {
  const authUserContext = useContext(UserContext);

  // eslint-disable-next-line arrow-body-style
  // const GetUserForContext = () => {
  //   return currentUser;
  // };

  const validate = Yup.object({
    email: Yup.string().email("Email is Invalid").required("Email is Required"),

    password: Yup.string()
      .min(6, "Password must be atleat 6 characters long")
      .required("Password is Required"),
  });

  const history = useHistory();

  return (
    <div>
      <Formik
        initialValues={{
          email: "",
          password: "",
        }}
        validationSchema={validate}
        onSubmit={(data) => {
          console.log(data);

          try {
            authenticateUser(data).then((response) => {
              if (response.status === 200)
                sessionStorage.setItem("x-auth-token", response.data.token);
              setAuthtoken(sessionStorage.getItem("x-auth-token"));
              getAuthUser().then((res) => {
                if (res.status === 200) {
                  authUserContext.setUser(res.data);
                  switch (res.data.role) {
                    case "ADMIN":
                      history.push(ADMIN);
                      break;
                    case "REPORTER":
                      history.push(WRITE);
                      break;
                    default:
                      history.push(HOME);
                  }
                } else {
                  alert("Invalid Credentials. Please Try Again");
                }
              });
            });
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
            <Row>
              <Col sm={10}>
                <Form onSubmit={handleSubmit} className='col-md-6'>
                  <h2 style={{ marginTop: "60%" }}>
                    <span>LOG</span>
                    <span style={{ color: "#007bff" }}>IN</span>
                  </h2>

                  <Form.Group
                    name='email'
                    value={values.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    controlId='email'
                  >
                    <Form.Label>Email </Form.Label>
                    <Form.Control type='email' placeholder='Enter Email' />
                    {/* <Form.Text className='text-muted'>
                We will never share your email with anyone else.
              </Form.Text> */}
                    {touched.email && errors.email && (
                      <div style={{ color: "red" }}>{errors.email}</div>
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
                    <Form.Control
                      type='password'
                      placeholder='Enter Password'
                    />
                    {touched.password && errors.password && (
                      <div style={{ color: "red" }}>{errors.password}</div>
                    )}
                  </Form.Group>

                  <div className='mt-4'>
                    <Button className='btn' variant='primary' type='submit'>
                      Login
                    </Button>

                    <Link to={REGISTER} className='ml-3'>
                      New Here? Register
                    </Link>
                  </div>
                </Form>
              </Col>
              <Col sm={2} className='mt-5'>
                <Image src={`${BASE_URL}/login.png`} widht={300} height={700} />
              </Col>
            </Row>
          </div>
        )}
      </Formik>
    </div>
  );
};
