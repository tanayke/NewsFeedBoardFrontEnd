/* eslint-disable no-restricted-syntax */
/* eslint-disable react/no-array-index-key */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect, useState, useRef } from "react";

import { Formik, Form, Field } from "formik";

import * as Yup from "yup";

import { Button, FormLabel } from "react-bootstrap";
import { getAllCategories } from "../../services/categoriesService";
import { addArticle } from "../../services/articleService";
import { SelectLocation } from "../sharedComponents";
// import { SignupForm } from "./doc";
import { WriteCardModal } from "./writeCardModal";
import { CardsComponent } from "./cardsComponent";
import { AddNewLocation } from "../sharedComponents/AddNewLocation";

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

  function showCard() {
    cards.forEach((card) => {
      for (const value of card.values()) {
        console.log(value);
      }
    });
  }
  function addNewLocation() {
    setNewLocation(true);
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
          data.append("locationId", locationId);
          console.log(locationId);
          addArticle(data)
            .then((response) => {
              setArticleId(response.id);
              console.log(response);
            })
            .catch((error) => {
              console.log(error);
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
              <div className="form-row">
                <div className="form-col">
                  {isNewLocation ? (
                    <AddNewLocation setLocationId={setLocationId} />
                  ) : (
                    <SelectLocation setLocationId={setLocationId} />
                  )}
                </div>

                <div className="form-col">
                  <Button onClick={addNewLocation}>Add Location</Button>
                </div>
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

            <CardsComponent cards={cards} />

            <div className="form-group">
              <Button variant="primary" type="submit">
                Submit
              </Button>

              <Button onClick={() => setModalShow(true)}>Add More </Button>
              <Button onClick={showCard}> show Crads</Button>
            </div>

            <WriteCardModal
              cards={cards}
              setCards={setCards}
              modalShow={modalShow}
              setModalShow={setModalShow}
              articleId={articleId}
            />

            {/* <InviteFriends cards={cards} setCards={setCards} /> */}

            {/* <InviteFriend/> */}
          </Form>
        )}
      </Formik>
    </div>

    // <SignupForm/>
  );
};
