import React, { useEffect, useState, useRef } from "react";

import { Formik, Form, Field, useFormik } from "formik";

import * as Yup from "yup";

import { Button, FormLabel } from "react-bootstrap";
import { getAllCategories } from "../../services/categoriesService";
import { addArticle } from "../../services/articleService";
import { AddressComponent } from "../sharedComponents";

import { SignupForm } from "./doc";

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
  const myForm = useRef(null);
  const [locationFormData, setLocationFormData] = useState({
    locality: "",
    city: "",
    state: "",
  });
  const [categories, setCategory] = useState([]);

  // const handleSubmit = (event) => {
  //   event.preventDefault();

  //   const data = new FormData(myForm.current);
  //   data.delete("state");
  //   data.delete("city");
  //   data.delete("locality");
  //   data.append("reporterId", 2);
  //   data.append("locationId", locationFormData.locality);

  //   addArticle(data).then((response) => {
  //     console.log(response);
  //   });
  // };

  useEffect(() => {
    getAllCategories().then((data) => {
      setCategory(data);
    });
  }, []);

  return (
    <div>
      <h1>Article Form</h1>
      <Formik
        initialValues={{
          title: "",
          description: "",
          thumbnailImage: "",
          category: 0,
          reporterId: 1,
          location: 0,
        }}
        validationSchema={SignupSchema}
        onSubmit={(values) => {
          const data = new FormData(myForm.current);
          data.delete("state");
          data.delete("city");
          data.delete("locality");
          data.append("reporterId", 2);
          data.append("locationId", locationFormData.locality);

          addArticle(data).then((response) => {
            console.log(response);
          });
        }}
      >
        {({ errors, touched }) => (
          <Form ref={myForm}>
            <div className="form-group">
              <FormLabel>Title</FormLabel>
              <Field name="title" className="form-control" />
              {errors.title && touched.title ? <div>{errors.title}</div> : null}
            </div>
            <div className="form-group">
              <FormLabel>Description</FormLabel>
              <Field as="textarea" rows={3} name="description" className="form-control" />
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
              <FormLabel>Select Location</FormLabel>
              <br />
              <AddressComponent
                locationFormData={locationFormData}
                setLocationFormData={setLocationFormData}
              />
            </div>
            <div className="form-group">
              <FormLabel>Select Category</FormLabel>
              <br />
              <Field name="category" as="select">
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </Field>
            </div>
            <Button type="submit">Submit</Button>
          </Form>
        )}
      </Formik>
    </div>

    // <SignupForm/>
  );
};
