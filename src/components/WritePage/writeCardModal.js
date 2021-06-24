/* eslint-disable no-restricted-syntax */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useState, useRef } from "react";
import { Form, FormLabel, Modal, Button, Badge } from "react-bootstrap";
import { addCards } from "../../services";

export const WriteCardModal = ({
  cards,
  setCards,
  modalShow,
  setModalShow,
  articleId,
  // onHide,
}) => {
  const myForm = useRef(null);
  const [cardOrder, setCardOrder] = useState(0);
  const [counter,setCounter]=useState(null);
  const [card, setCard] = useState({
    type: "image",
    content: "",
    cardsOrder: 0,
    articleId: 0,
  });

  function handleCardsInputChange({ target }) {
    const { name, value } = target;
    setCard({ ...card, [name]: value });
  }
  function saveCard() {
    //   if(cardOrder === 0)
    //     setCounter(1);
    //   else 
    //     setCounter(counter+1);
    
    // setCardOrder(cardOrder + 1);
    const data = new FormData(myForm.current);
    data.append("cardOrder", cardOrder);
    data.append("articleId", articleId);

    setCard({
      type: "image",
      content: "",
      cardsOrder: 0,
      articleId: 0,
    });

    setCards((oldCards) => [...oldCards, data]);
    setModalShow(false);
  }
  function onHide(){
    setCounter(null);
    setModalShow(false);
  }
  // function addCard() {
  //   cards.forEach((c) => {
  //     addCards(c)
  //       .then((response) => {
  //           setCounter(null);
  //           onHide();
  //         console.log(response);
  //       })
  //       .catch((e) => {
  //         console.log(e);
  //       });
  //   });
  // }

  
  const { type, content } = card;
  return (
    <Modal
      show={modalShow}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      animation="true"
    >
      <Modal.Header>
        <Modal.Title id="contained-modal-title-vcenter">
          Add More Detail
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form ref={myForm}>
          <Form.Group controlId="exampleForm.ControlSelect1">
            <Form.Label>Select Type</Form.Label>
            <Form.Control
              as="select"
              value={type}
              onChange={handleCardsInputChange}
              name="type"
            >
              <option value="image">Image</option>
              <option value="text">Text</option>
              <option value="video">Video</option>
            </Form.Control>
          </Form.Group>
          {type === "image" || type === "video" ? (
            <Form.Group>
              <Form.File
                id="exampleFormControlFile1"
                label="Example file input"
                name="content"
                value={content}
                onChange={handleCardsInputChange}
              />
            </Form.Group>
          ) : (
            <Form.Group controlId="exampleForm.ControlTextarea1">
              <Form.Label>Enter Text</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="content"
                value={content}
                onChange={handleCardsInputChange}
              />
            </Form.Group>
          )}
        </Form>
      </Modal.Body>
      <Modal.Footer>
        {/* <Button variant="primary" onClick={addCard}>
          Add Cards <Badge variant="light">{counter}</Badge>
        </Button> */}
        <Button onClick={saveCard}>Save</Button>
        <Button onClick={onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
};
