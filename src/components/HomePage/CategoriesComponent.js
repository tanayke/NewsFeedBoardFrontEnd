import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import { getAllCategories } from "../../services";

export const CategoriesComponent = () => {
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    // getAllCategories().then((data) => setCategories(data));
  getAllCategories().then((data)=>setCategories(data));
  }, []);
  console.log(categories)
  return (
    <div>
      Categories
      <hr />
      {categories.map((category) => (
        <Button variant="light" key={category.id} className="m-2">
          {category.name}
        </Button>
      ))}
      <hr />
    </div>
  );
};
