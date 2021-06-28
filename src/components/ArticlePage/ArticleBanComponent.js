import React from "react";
import { Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { ADMIN } from "../../constants";
import { updateIsActiveStatus } from "../../services/articleService";

export const ArticleBanComponent = ({ articleId }) => {
  const history = useHistory();
  const handleOnClick = (isActive, id) => {
    updateIsActiveStatus(isActive, id).then((response) => {
      if (response.status === 200) {
        history.push(ADMIN);
      }
      console.log(response.data);
    });
  };
  return (
    <div>
      <Button
        variant="outline-danger"
        onClick={() => {
          handleOnClick(-1, articleId);
        }}
      >
        Hide
      </Button>
      <Button
        variant="outline-success"
        onClick={() => {
          handleOnClick(1, articleId);
        }}
      >
        Keep
      </Button>
    </div>
  );
};
