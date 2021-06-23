/* eslint-disable no-restricted-syntax */
/* eslint-disable react/no-array-index-key */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect, useState, useRef } from "react";

import {
  Formik,
  Form,
  Field,
  useFormik,
  ErrorMessage,
  FieldArray,
} from "formik";

import * as Yup from "yup";

import { Modal, Button, FormLabel, Card } from "react-bootstrap";
import { getAllCategories } from "../../services/categoriesService";
import { addArticle } from "../../services/articleService";
import { AddressComponent } from "../sharedComponents";
// import { SignupForm } from "./doc";
import { WriteCardModal } from "./writeCardModal";
import { InviteFriends } from "./addCards";
import { InviteFriend } from "./addCardsDemo";

const initialValues = {
  friends: [
    {
      name: "",
      email: "",
    },
  ],
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
  const [flag, setFlag] = useState(false);
  const [articleId, setArticleId] = useState();

  const [cards, setCards] = useState([]);
  const [modalShow, setModalShow] = useState(false);

  const myForm = useRef(null);
  const [locationFormData, setLocationFormData] = useState({
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

  function showCard() {
    cards.forEach((card) => {
      for (const value of card.values()) {
        console.log(value);
      }
    });
  }

  return (
    <div>
      <h1>Article Form</h1>
      <Formik
        initialValues={{
          title: "",
          description: "",
          thumbnailImage: "",
          category: 0,
          reporterId: 0,
          location: 0,
        }}
        validationSchema={SignupSchema}
        onSubmit={(values) => {
          const data = new FormData(myForm.current);
          data.delete("state");
          data.delete("city");
          data.delete("locality");
          data.append("reporterId", 1);
          data.append("locationId", locationFormData.locality);
          addArticle(data).then((response) => {
            if (response) setFlag(true);
            setArticleId(response.id);
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
              <Field name="categoryId" as="select">
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </Field>
            </div>
            {cards.forEach((card) => {
              for (const value of card.values()) {
                <Card body>{value}</Card>;
              }
            })}
            <div className="form-group">
              <Button variant="primary" type="submit">
                Submit
              </Button>

              <Button onClick={() => setModalShow(true)}>Add More </Button>
            </div>

            <WriteCardModal
              cards={cards}
              setCards={setCards}
              modalShow={modalShow}
              setModalShow={setModalShow}
              articleId={articleId}
              //  onHide={() => setModalShow(false)}
            />
            {/* <InviteFriends  cards={cards}
              setCards={setCards}/> */}

            {/* <InviteFriend/> */}

            <Button onClick={showCard}>Show Cards</Button>
          </Form>
        )}
      </Formik>
    </div>

    // <SignupForm/>
  );
};
