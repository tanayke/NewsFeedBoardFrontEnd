/* eslint-disable no-restricted-syntax */
/* eslint-disable prefer-template */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/no-array-index-key */
import React from "react";
import { Field, FieldArray } from "formik";

const initialValues = {
  cards: [
    {
      type: "",
      content: "",
      cardOrder: 0,
    },
  ],
};

export const AllCards = ({ values, setFieldValue }) => (
  <div>
    <FieldArray name="cards">
      {({ insert, remove, push }) => (
        <div>
          {values.cards.length > 0 &&
            values.cards.map((card, index) => (
              <div className="row" key={index}>
                <div className="col">
                  <label htmlFor={`cards.${index}.type`}>Select Type</label>
                  <Field name={`cards.${index}.type`} as="select">
                    <option value="text">Text</option>
                    <option value="image">Image</option>
                    <option value="video">Video</option>
                  </Field>
                </div>
                {card.type === "text" ? (
                  <div className="col">
                    <label htmlFor={`cards.${index}.content`}>Enter Text</label>
                    <Field
                      name={`cards.${index}.content`}
                      type="textarea"
                      rows="3"
                    />
                  </div>
                ) : (
                  <div className="col">
                    <label htmlFor={`cards.${index}.content`}>
                      Select File
                    </label>
                    <Field name={`cards.${index}.content`} type="file" />
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
                  <span name={`cards.${index}.cardOrder`} value={index} />
                </div>
              </div>
            ))}

          <button
            type="button"
            className="secondary"
            onClick={() => push({ type: "text", content: "", cardOrder: 0 })}
          >
            Add Card
          </button>
        </div>
      )}
    </FieldArray>
  </div>
);
