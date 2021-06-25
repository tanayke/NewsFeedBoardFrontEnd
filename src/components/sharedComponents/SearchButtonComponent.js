import React, { useContext, useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { ROUTE_SEARCH } from "../../constants/CONSTANTS";
import { ArticleFilterContext } from "../context/ArticleFilterContext/ArticleFilterContext";

export const SearchButtonComponent = () => {
  const [searchText, setSearchText] = useState(undefined);
  const history = useHistory();
  const { articleFilters, setArticleFilters } =
    useContext(ArticleFilterContext);
  const handleInputChange = ({ target }) => {
    setSearchText(target.value);
  };
  const handleSearchOnClick = () => {
    setArticleFilters({
      ...articleFilters,
      search: searchText,
    });
    history.push(ROUTE_SEARCH);
  };
  return (
    <Form inline>
      <Form.Control
        type="text"
        placeholder="Search News Articles"
        className="mr-sm-2"
        onChange={handleInputChange}
        value={searchText}
      />
      <Button onClick={handleSearchOnClick} variant="outline-success">
        Search
      </Button>
    </Form>
  );
};
