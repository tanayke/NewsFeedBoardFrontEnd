/* eslint-disable no-restricted-syntax */
/* eslint-disable react/no-array-index-key */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect, useState, useRef } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { Button, FormLabel } from "react-bootstrap";
import { serialize } from 'object-to-formdata';
import { getAllCategories } from "../../services/categoriesService";
import { addArticle } from "../../services/articleService";
import { SelectLocation } from "../sharedComponents";
import { AllCards } from "./addCards";
import { AddNewLocation } from "../sharedComponents/AddNewLocation";

const InitialValues = {
  title: "",
  description: "",
  thumbnailImage: "",
  category: 0,
  reporterId: 0,
  location: 0,
  cards: [],
};

const SignupSchema = Yup.object().shape({
  title: Yup.string()
    .min(2, "Too Short!")
    .max(20, "Too Long!")
    .required("Required"),
  description: Yup.string()
    .min(2, "Too Short!")
    .max(200, "Too Long!")
    .required("Required"),
  thumbnailImage: Yup.mixed().required("Required"),
});

export const WritePage = () => {
  const [isNewLocation, setNewLocation] = useState(false);
  const [articleId, setArticleId] = useState();
  const [cards, setCards] = useState([]);
  const [isNewCard, setNewCard] = useState(false);
  const [modalShow, setModalShow] = useState(false);
  const myForm = useRef(null);

  const [locationId, setLocationId] = useState({
    locality: "",
    city: "",
    state: "",
  });
  const [categories, setCategory] = useState([]);

  useEffect(() => {
    getAllCategories().then((data) => {
      setCategory(data);
    });
  }, []);

  function addNewLocation() {
    setNewLocation(true);
  }

  function handleOnSubmit(d) {
    
    const object = d;
    const options = {
      indices: false,
      nullsAsUndefineds: false,
      booleansAsIntegers: false,
      allowEmptyArrays: false,
    };
    
    const formData = serialize(
      object,
   //   options, // optional
    );
    
    // console.log(formData);

    // for (const value of formData.values()) {
    //  console.log(value);
    //  }

    const data = new FormData(myForm.current);
    // for (const value of data.values()) {
    //   console.log(value);
    // }

    
    data.append("reporterId", 1);
    data.append("isNewlocation", isNewLocation);
    data.append("cardsData",formData);

    console.log(JSON.stringify(Array.from(formData)));
    addArticle(data)
      .then((response) => {
        setArticleId(response.id);
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <div>
      <h1>Article Form</h1>
      <Formik
        initialValues={InitialValues}
        validationSchema={SignupSchema}
        onSubmit={handleOnSubmit}
      >
        {({ errors, touched, values, setFieldValue }) => (
          <Form ref={myForm}>
            <div className="form-group">
              <FormLabel>Title</FormLabel>
              <Field name="title" className="form-control" />
              {errors.title && touched.title ? <div>{errors.title}</div> : null}
            </div>
            <div className="form-group">
              <FormLabel>Description</FormLabel>
              <Field
                as="textarea"
                rows={3}
                name="description"
                className="form-control"
              />
              {errors.description && touched.description ? (
                <div>{errors.description}</div>
              ) : null}
            </div>
            <div className="form-group">
              <FormLabel>Select Image</FormLabel>
              <br />
              <Field
                type="file"
                name="thumbnailImage"
                className="form-file"
                isInvalid={!!errors.thumbnailImage}
              />
              {errors.thumbnailImage ? (
                <div>{errors.thumbnailImage}</div>
              ) : null}
            </div>

            <div className="form-group">
              <div className="form-row">
                <div className="form-col">
                  {isNewLocation ? <AddNewLocation /> : <SelectLocation />}
                </div>

                {isNewLocation ? null : (
                  <div className="form-col">
                    <Button onClick={addNewLocation}>Add New Location</Button>
                  </div>
                )  }
              </div>
            </div>

            <div className="form-group">
              <FormLabel>Select Category</FormLabel>
              <br />
              <Field name="categoryId" as="select">
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </Field>
            </div>

            <div className="form-group">
              <Button variant="primary" type="submit">
                Submit
              </Button>
            </div>

            <AllCards values={values} setFieldValue={setFieldValue} />
          </Form>
        )}
      </Formik>
    </div>
  );
};
