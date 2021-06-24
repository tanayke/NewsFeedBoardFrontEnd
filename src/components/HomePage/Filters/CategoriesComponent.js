/* eslint-disable react/prop-types */
import React, { useState, useEffect } from "react";
import { Form } from "react-bootstrap";
import { getAllCategories } from "../../../services";

export const CategoriesComponent = ({ categoryId, handleCategoryChange }) => {
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    getAllCategories().then((data) => setCategories(data));
    console.log(categoryId);
  }, [categoryId]);

  return (
    <div>
      <Form.Group>
        <Form.Label>by Categories</Form.Label>
        <Form.Control
          as="select"
          onChange={handleCategoryChange}
          value={categoryId}
        >
          <option>All</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </Form.Control>
      </Form.Group>
      <hr />
    </div>
  );
};
