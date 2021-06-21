import React, { useEffect, useState } from "react";

import { Formik, Form, Field } from 'formik';

import * as Yup from "yup";

import { Button,FormLabel } from "react-bootstrap";
import { getAllCategories } from "../../services/categoriesService";

const SignupSchema = Yup.object().shape({
  title: Yup.string()
    .min(2, "Too Short!")
    .max(20, "Too Long!")
    .required("Required"),
  description: Yup.string()
    .min(2, "Too Short!")
    .max(200, "Too Long!")
    .required("Required"),
  thumbnailImage: Yup.string()
    .min(2, "Too Short!")
    .max(100, "Too Long!")
    .required("Required"),
    categoryId:Yup.number()
    .required("Required"),
    reporterId:Yup.number()
    .required("Required"),
    locationId:Yup.number()
    .required("Required"),
    
});

export const WritePage = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    thumbnailImage: "",
    viewCount: 0,
    uploadDateTime: "",
    isActive: "",
    categoryId: 0,
    reporterId: 0,
    locationId: 0,
  });

  
  const [categories, setCategory] = useState([]);

  function handleInputChange({ target }) {
    const { name, value } = target;
    setFormData({ ...formData, [name]: value });
  }

  useEffect(() => {
    getAllCategories().then((data) => {
      setCategory(data);
    });
  }, []);

  return(
    <div>
    <h1>Article Form</h1>
    <Formik
      initialValues={{  
        title: "",
        description: "",
        thumbnailImage: "",
        categoryId: 0,
        reporterId: 0,
        locationId: 0,
      }}
      validationSchema={SignupSchema}
      onSubmit={values => {
        // same shape as initial values
        console.log(values);
      }}
    >
      {({ errors, touched }) => (
        <Form>
          <div className="form-group">
            <FormLabel>Title</FormLabel>
            <Field name="title" className="form-control"/>
            {errors.title && touched.title ? (
              <div>{errors.title}</div>
            ) : null}
          </div>
          <div className="form-group">
          <FormLabel>Description</FormLabel>
          <Field name="description" className="form-control" />
          {errors.description && touched.description ? (
            <div>{errors.description}</div>
          ) : null}
          </div>
          <div className="form-group">
          <FormLabel>Select Image</FormLabel><br/>
          <Field type="file" name="thumbnailImage"  className="form-file" />
          {/* {errors.thumbnailImage && touched.thumbnailImage ? <div>{errors.thumbnailImage}</div> : null} */}
          </div>
          <Button type="submit">Submit</Button>
        </Form>
      )}
    </Formik>
  </div>
  );
};
