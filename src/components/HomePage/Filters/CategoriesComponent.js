/* eslint-disable react/prop-types */
import React, { useState, useEffect, useContext } from "react";
import { Form } from "react-bootstrap";
import { getAllCategories } from "../../../services";
import { ArticleFilterContext } from "../../context/ArticleFilterContext/ArticleFilterContext";

export const CategoriesComponent = ({ categoryId, handleCategoryChange }) => {
  const [categories, setCategories] = useState([]);

  const { articleFilters, setArticleFilters } =
    useContext(ArticleFilterContext);

  useEffect(() => {
    getAllCategories().then((data) => setCategories(data));
    console.log(categoryId);
    setArticleFilters({
      ...articleFilters,
      categoryId,
    });
  }, [categoryId]);

  return (
    <div>
      <Form.Group>
        <Form.Label>By Categories</Form.Label>
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
