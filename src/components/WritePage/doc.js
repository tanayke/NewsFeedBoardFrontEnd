import React, { useEffect, useState, useRef } from "react";
import { Form, Button } from "react-bootstrap";
import { getAllCategories } from "../../services/categoriesService";
import { AddressComponent } from "../sharedComponents";
import { addArticle } from "../../services/articleService";

export const SignupForm = () => {
  const myForm = useRef(null);
  const [locationFormData, setLocationFormData] = useState({
    locality: "",
    city: "",
    state: "",
  });
  const [categories, setCategory] = useState([]);

  const handleSubmit = (event) => {
    event.preventDefault();

    const data = new FormData(myForm.current);
    data.delete("state");
    data.delete("city");
    data.delete("locality");
    data.append("reporterId", 2);
    data.append("locationId", locationFormData.locality);

    addArticle(data).then((response) => {
      console.log(response);
    });
  };

  useEffect(() => {
    getAllCategories().then((data) => {
      setCategory(data);
    });
  }, []);

  return (
    <Form onSubmit={handleSubmit} ref={myForm}>
      <Form.Group controlId="formBasicTitle">
        <Form.Label>Title</Form.Label>
        <Form.Control type="text" placeholder="Enter Title" name="title" />
      </Form.Group>

      <Form.Group controlId="formBasicDescription">
        <Form.Label>Description</Form.Label>
        <Form.Control
          type="textarea"
          placeholder="Enter Description"
          name="description"
          rows={3}
        />
      </Form.Group>

      <Form.Group controlId="exampleForm.ControlSelect1">
        <Form.Label>Select Category</Form.Label>
        <Form.Control as="select" name="categoryId">
          {categories.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </Form.Control>
      </Form.Group>

      <AddressComponent
        locationFormData={locationFormData}
        setLocationFormData={setLocationFormData}
      />

      <Form.Group controlId="formBasicDescription">
        <Form.Label>Description</Form.Label>
        <Form.Control type="file" name="thumbnailImage" accept="image/*" />
      </Form.Group>
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
};
