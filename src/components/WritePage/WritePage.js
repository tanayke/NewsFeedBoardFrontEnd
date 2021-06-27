/* eslint-disable no-restricted-syntax */
/* eslint-disable react/no-array-index-key */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect, useState, useRef } from "react";
import { Formik, Form, Field, getIn } from "formik";
import * as Yup from "yup";
// eslint-disable-next-line camelcase
import jwt_decode from "jwt-decode";
import { Button, FormLabel } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { getAllCategories } from "../../services/categoriesService";
import { addArticle } from "../../services/articleService";
import { SelectLocation } from "../sharedComponents";
import { AllCards } from "./addCards";
import { AddNewLocation } from "../sharedComponents/AddNewLocation";
import { HOME } from "../../constants";

const InitialValues = {
  title: "",
  description: "",
  thumbnailImage: "",
  categoryId: "",
  state: "",
  city: "",
  locality: "",
  reporterId: 0,
  cards: [
    {
      type: "IMAGE",
      content: "",
    },
  ],
};

const SignupSchema = Yup.object().shape({
  title: Yup.string()
    .min(2, "Too Short!")
    .max(120, "Too Long!")
    .required("Enter Title!"),
  description: Yup.string()
    .min(2, "Too Short!")
    .max(250, "Too Long!")
    .required("Enter Description!"),
  categoryId: Yup.string().required("Select Category"),
  state: Yup.string()
    .min(3, "Too Short!")
    .max(25, "Too Long!")
    .required("State Required!"),
  city: Yup.string()
    .min(2, "Too Short!")
    .max(60, "Too Long!")
    .required("City Required!"),
  locality: Yup.string().max(60, "Too Long!").required("Locality Required!"),
  thumbnailImage: Yup.mixed().required("Select Image"),
  cards: Yup.array().of(
    Yup.object().shape({
      type: Yup.string().required("Required"),
      content: Yup.string().required("Card Content Required!"),
    })
  ),
});

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

export const WritePage = () => {
  const history = useHistory();
  const [isNewLocation, setNewLocation] = useState(false);
  const myForm = useRef(null);
  const [categories, setCategory] = useState([]);
  const reporter = sessionStorage.getItem("x-auth-token")
    ? jwt_decode(sessionStorage.getItem("x-auth-token")).user
    : null;
  useEffect(() => {
    getAllCategories().then((data) => {
      setCategory(data);
    });
  }, []);

  function addNewLocation() {
    if (isNewLocation) setNewLocation(false);
    else setNewLocation(true);
  }

  function handleSubmit(d) {
    const data = new FormData(myForm.current);
    data.append("reporterId", reporter.id);
    data.append("isNewlocation", isNewLocation);
    data.append("cards", JSON.stringify(d.cards));

    addArticle(data)
      .then((response) => {
        console.log(response);
        history.push(HOME);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <div>
      <h1 style={{ textAlign: "center", marginTop: "8px" }}>
        Create News Article
      </h1>
      <Formik
        initialValues={InitialValues}
        validationSchema={SignupSchema}
        onSubmit={handleSubmit}
      >
        {({ errors, touched, values, setFieldValue, handleChange }) => (
          <Form ref={myForm} style={{ margin: "10px 150px" }}>
            <div className="form-group">
              <FormLabel>Title</FormLabel>
              <Field name="title" className="form-control" />
              <ErrorMessage name="title" />
            </div>

            <div className="form-group">
              <Field name="categoryId" as="select" className="form-control">
                <option>Select Category</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </Field>
              <ErrorMessage name="categoryId" />
            </div>

            <div className="form-group">
              <FormLabel>Select Thumbnail Image</FormLabel>
              <br />
              <Field
                type="file"
                name="thumbnailImage"
                className="form-file"
                isInvalid={!!errors.thumbnailImage}
              />
              <ErrorMessage name="thumbnailImage" />
            </div>

            <div className="form-group">
              <FormLabel>Description</FormLabel>
              <Field
                as="textarea"
                rows={2}
                name="description"
                className="form-control"
              />
              <ErrorMessage name="description" />
            </div>

            {isNewLocation ? (
              <div className="form-group">
                <Button onClick={addNewLocation}>Select Location</Button>
              </div>
            ) : (
              <div className="form-group">
                <Button onClick={addNewLocation}>Add New Location</Button>
              </div>
            )}

            <div className="form-group">
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
            </div>

            <div className="form-group">
              <AllCards
                values={values}
                setFieldValue={setFieldValue}
                handleChange={handleChange}
                errors={errors}
                touched={touched}
              />
            </div>

            <div className="form-group" style={{ textAlign: "right" }}>
              <Button variant="success" type="submit" size="lg">
                Submit
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};
