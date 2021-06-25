/* eslint-disable prefer-template */
/* eslint-disable no-restricted-syntax */
/* eslint-disable react/no-array-index-key */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useRef } from "react";

import { Formik, Field, Form, ErrorMessage, FieldArray } from "formik";

const initialValues = {
  friends: [
    {
      name: "",
      email: "",
    },
  ],
};

export const InviteFriend = () => {
  const myForm = useRef(null);

  function handleSubmit() {
    const data = new FormData(myForm.current);
    console.log(data);
    for (const value of data.values()) {
      console.log(value);
    }
  }

  return (
    <div>
      <h1>Invite friends</h1>
      <Formik
        initialValues={initialValues}
        onSubmit={async (values) => {
          await new Promise((r) => setTimeout(r, 500));
          alert(JSON.stringify(values, null, 2));
        }}
      >
        {({ values }) => (
          <Form ref={myForm}>
            <FieldArray name="friends">
              {({ remove, push }) => (
                <div>
                  {values.friends.length > 0 &&
                    values.friends.map((friend, index) => (
                      <div className="row" key={index}>
                        <div className="col">
                          <label htmlFor={`friends.${index}.name`}>Name</label>
                          <Field
                            name={`friends.${index}.name`}
                            placeholder="Jane Doe"
                            type="text"
                          />
                          <ErrorMessage
                            name={`friends.${index}.name`}
                            component="div"
                            className="field-error"
                          />
                        </div>
                        <div className="col">
                          <label htmlFor={`friends.${index}.email`}>
                            Email
                          </label>
                          <Field
                            name={`friends.${index}.email`}
                            placeholder="jane@acme.com"
                            type="email"
                          />
                          <ErrorMessage
                            name={`friends.${index}.name`}
                            component="div"
                            className="field-error"
                          />
                        </div>
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
                    onClick={() => push({ name: "", email: "" })}
                  >
                    Add Friend
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
