/* eslint-disable react/prop-types */
import React, { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import { CategoriesComponent } from "./CategoriesComponent";
import { LocationFilterComponent } from "./LocationFilterComponent";

export const ArticleFilterComponent = ({ filterArticles }) => {
  const [categoryId, setCategoryId] = useState(undefined);
  const [locationId, setLocationId] = useState(undefined);

  const handleCategoryChange = ({ target }) => {
    setCategoryId(target.value);
  };
  const handleLocationChange = ({ target }) => {
    setLocationId(target.value);
  };
  const handleFormSubmit = (e) => {
    e.preventDefault();
    console.log(categoryId, locationId);
    filterArticles(categoryId, locationId);
  };

  return (
    <div>
      Filters
      <hr />
      <Form onSubmit={handleFormSubmit}>
        <CategoriesComponent
          categoryId={categoryId}
          handleCategoryChange={handleCategoryChange}
        />
        <LocationFilterComponent
          locationId={locationId}
          handleLocationChange={handleLocationChange}
          setLocationId={setLocationId}
        />
        <Button variant="primary" type="submit">
          Filter
        </Button>
      </Form>
    </div>
  );
};
