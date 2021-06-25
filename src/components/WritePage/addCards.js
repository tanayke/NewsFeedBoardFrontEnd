/* eslint-disable no-restricted-syntax */
/* eslint-disable prefer-template */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/no-array-index-key */
import React, { useState, useRef } from "react";
import { Formik, Field, Form, ErrorMessage, FieldArray } from "formik";

const initialValues = {
  cards: [
    {
      type: "",
      content: "",
    },
  ],
};

export const InviteFriends = () => {
  const myForm = useRef(null);
  const [card, setCard] = useState({
    type: "image",
    content: "",
    cardsOrder: 0,
    articleId: 0,
  });
  // const [flag, setFlag] = useState();

  function handleCardsInputChange({ target }) {
    console.log(target);
    const { name, value } = target;
    setCard({ ...card, [name]: value });
    console.log(name, value);
    //  if( value === "image" || value === "video")
    //   setFlag(true)
    // else
    //   setFlag(false)
  }
  function handleSubmit() {
    const data = new FormData(myForm.current);
    console.log(data);
    for (const value of data.values()) {
      console.log(value);
    }
  }

  const { type } = card;

  return (
    <div>
      <h1>Invite cards</h1>
      <Formik initialValues={initialValues}>
        {({ values }) => (
          <Form ref={myForm}>
            <FieldArray name="cards">
              {({ remove, push }) => (
                <div>
                  {values.cards.length > 0 &&
                    values.cards.map((friend, index) => (
                      <div className="row" key={index}>
                        <div className="col">
                          <label htmlFor={`friends.${index}.type`}>
                            Select Type
                          </label>
                          <Field name={`friends.${index}.type`} as="select">
                            {/* <selectComponent handleCardsInputChange={handleCardsInputChange} card={card} /> */}
                            {({ field }) => {
                              const { onChange } = field;
                              return (
                                <select
                                  name="type"
                                  onChange={handleCardsInputChange}
                                  value={card.type}
                                >
                                  <option value="text">Text</option>
                                  <option value="image">Image</option>
                                  <option value="video">Video</option>
                                </select>
                              );
                            }}
                          </Field>
                          {/* <Field 
                            name="type"
                            as="select"
                            // value={type}
                            // onChange={handleCardsInputChange}
                          >
                            <option value="video">Video</option>
                            <option value="text">Text</option>
                            <option value="image">Image</option>
                            
                          </Field> */}

                          <Field />
                          <ErrorMessage
                            name={`friends.${index}.type`}
                            component="div"
                            className="field-error"
                          />
                        </div>
                        {type === "image" || type === "video" ? (
                          <div className="col">
                            <label htmlFor={`friends.${index}.content`}>
                              Select File
                            </label>
                            <Field
                              name="content"
                              type="file"
                              value={card.content}
                              onChange={handleCardsInputChange}
                            />
                            <ErrorMessage
                              name={`friends.${index}.content`}
                              component="div"
                              className="field-error"
                            />
                          </div>
                        ) : (
                          <div className="col">
                            <label htmlFor={`friends.${index}.content`}>
                              Enter Text
                            </label>
                            <Field
                              as="textarea"
                              rows={3}
                              name={`friends.${index}.content`}
                            />
                            <ErrorMessage
                              name={`friends.${index}.content`}
                              component="div"
                              className="field-error"
                            />
                          </div>
                        )}
                        <div className="col">
                          <button
                            type="button"
                            className="secondary"
                            onClick={() => remove(index)}
                          >
                            X
                          </button>
                        </div>
                      </div>
                    ))}
                  <button
                    type="button"
                    className="secondary"
                    onClick={() => push({ type: "", content: "" })}
                  >
                    Add Card
                  </button>
                </div>
              )}
            </FieldArray>
            <button type="button" onClick={handleSubmit}>
              Invite
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};
