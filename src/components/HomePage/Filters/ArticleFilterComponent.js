/* eslint-disable react/prop-types */
import React, { useState } from "react";
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

  return (
    <div>
      Filters
      <hr />
      <Form>
        <CategoriesComponent
          categoryId={categoryId}
          handleCategoryChange={handleCategoryChange}
        />
        <LocationFilterComponent
          locationId={locationId}
          handleLocationChange={handleLocationChange}
          setLocationId={setLocationId}
        />
      </Form>
    </div>
  );
};
