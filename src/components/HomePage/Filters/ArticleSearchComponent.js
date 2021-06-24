/* eslint-disable react/prop-types */
import React, { useState } from "react";
import { Form, FormControl, Button } from "react-bootstrap";

export const ArticleSearchComponent = ({
  isSearch,
  setIsSearch,
  searchAirtilesByTitleText,
}) => {
  const [searchInput, setSearchInput] = useState();

  const handleSearcgInputChange = ({ target }) => {
    setSearchInput(target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(searchInput);
    setIsSearch(!isSearch);
    searchAirtilesByTitleText(searchInput);
  };
  return (
    <div>
      <Form onSubmit={handleSubmit}>
        <FormControl
          type="text"
          placeholder="Search"
          className="mr-sm-2"
          onChange={handleSearcgInputChange}
          value={searchInput}
        />
        <Button type="submit" variant="outline-success">
          Search
        </Button>
      </Form>
    </div>
  );
};
