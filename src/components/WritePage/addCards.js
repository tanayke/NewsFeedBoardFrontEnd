/* eslint-disable no-param-reassign */
/* eslint-disable no-nested-ternary */
/* eslint-disable no-restricted-syntax */
/* eslint-disable prefer-template */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/no-array-index-key */
import React, { useEffect, useState } from "react";
import { Field, FieldArray, getIn } from "formik";
import { Button } from "react-bootstrap";

const ErrorMessage = ({ name }) => (
  <div style={{ color: "red" }}>
    <Field
      name={name}
      render={({ form }) => {
        const error = getIn(form.errors, name);
        const touch = getIn(form.touched, name);
        return touch && error ? error : null;
      }}
    />
  </div>
);

let textContentLegth = 1500;
let wordlength = 0;
let errorMessage = 1500;

export const AllCards = ({ values, handleChange, setFieldValue }) => {
  const [isMaxLength, setMaxLength] = useState(false);
  useEffect(
    () => () => {
      textContentLegth = 1500;
      errorMessage = 1500;
    },
    []
  );

  const handleInputChange = (event) => {
    const str = event.target.innerHTML;
    wordlength = str.length;
    errorMessage = textContentLegth - wordlength;
  };

  const setLength = (val, i) => {
    let length = 0;
    let sum = val.cards[i].content.length;
    if (i === 0) length = 1500;
    else {
      while (i !== 1) {
        sum += val.cards[i].content.length;
        i -= 1;
      }
      length = sum;
    }
    return length;
  };

  return (
    <div>
      <FieldArray name="cards">
        {({ push, remove }) => (
          <div>
            {values.cards.length > 0 &&
              values.cards.map((card, index) => (
                <div
                  className="justify-content-md-center"
                  key={index}
                  style={{
                    border: "1px solid black",
                    padding: "5px",
                    margin: "5px",
                  }}
                >
                  <div className="col">
                    <Button
                      variant="danger"
                      onClick={() => {
                        remove(index);
                        setFieldValue(`cards[${index}].content`, "");
                      }}
                    >
                      X
                    </Button>
                  </div>
                  <div className="row-justify-content-md-center">
                    <div className="form-group">
                      <div className="col">
                        <label htmlFor={`cards.${index}.type`}>
                          Select Type
                        </label>
                        <Field
                          name={`cards.${index}.type`}
                          as="select"
                          className="form-control"
                          onChange={(e) => {
                            handleChange(e);
                            setFieldValue(`cards[${index}].content`, "");
                          }}
                        >
                          {textContentLegth <= 1 ? (
                            <option value="TEXT" disabled>
                              Text
                            </option>
                          ) : (
                            <option value="TEXT">Text</option>
                          )}

                          <option value="IMAGE">Image</option>
                          <option value="VIDEO">Video</option>
                        </Field>
                        <ErrorMessage name={`cards.${index}.type`} />
                      </div>
                    </div>
                    {card.type === "TEXT" ? (
                      <div className="form-group">
                        <div className="col">
                          <label htmlFor={`cards.${index}.content`}>
                            Enter Text
                          </label>
                          <Field
                            name={`cards.${index}.content`}
                            as="textarea"
                            rows={3}
                            className="form-control"
                            onChange={(e) => {
                              handleChange(e);
                              handleInputChange(e);
                            }}
                            maxLength={
                              // setLength(values,index)
                              index >= 1
                                ? 1500 - values.cards[index - 1].content.length
                                : 1500
                            }
                          />
                          {index === 0
                            ? values.cards[index].content.length === 1500
                              ? setMaxLength(true)
                              : null
                            : values.cards[index].content.length ===
                              values.cards[index - 1].content.length
                            ? setMaxLength(true)
                            : null}
                          <span>WordLimit : </span>
                          {values.cards[index].content.length}/
                          {index >= 1
                            ? 1500 - values.cards[index - 1].content.length
                            : 1500}
                          <ErrorMessage name={`cards.${index}.content`} />
                        </div>
                      </div>
                    ) : (
                      <div className="form-group">
                        <div className="col">
                          <label htmlFor={`cards.${index}.content`}>
                            Select File
                          </label>
                          <Field
                            name={`cards.${index}.content`}
                            type="file"
                            className="form-control"
                            onChange={(e) => {
                              handleChange(e);
                            }}
                          />
                          <ErrorMessage name={`cards.${index}.content`} />
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}

            <div className="row-justify-content-md-center">
              <div className="form-group" style={{ textAlign: "center" }}>
                {isMaxLength ? (
                  <span style={{ color: "red" }}>
                    Sorry,Maxword Count Reached
                  </span>
                ) : null}
              </div>
            </div>
            <Button
              variant="primary"
              onClick={() => {
                push({ type: "IMAGE", content: "" });
                //  setMaxLength();
              }}
            >
              Add Card
            </Button>
          </div>
        )}
      </FieldArray>
    </div>
  );
};
