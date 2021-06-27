// /* eslint-disable no-restricted-syntax */
// /* eslint-disable prefer-template */
// /* eslint-disable jsx-a11y/label-has-associated-control */
// /* eslint-disable react/no-array-index-key */
// import React, { useState, useEffect } from "react";
// import { Field, FieldArray } from "formik";

// const initialValues = {
//   cards: [
//     {
//       type: "",
//       content: "",
//       cardOrder: "",
//     },
//   ],
// };

// export const AllCards = ({ values, setFieldValue }) => (
//   <div>
//     <FieldArray name="cards">
//       {({ insert, remove, push }) => (
//         <div>
//           {
//           values.cards.length > 0 &&
//             values.cards.map((card, index) =>
//              (
//                 <div className="row" key={index}>
//                   <div className="col">
//                     <label htmlFor={`cards.${index}.type`}>Select Type</label>
//                     <Field name={`cards.${index}.type`} as="select">
//                       <option value="TEXT">Text</option>
//                       <option value="IMAGE">Image</option>
//                       <option value="VIDEO">Video</option>
//                     </Field>
//                   </div>
//                   {card.type === "TEXT" ? (
//                     <div className="col">
//                       <label htmlFor={`cards.${index}.content`}>Enter Text</label>
//                       <Field
//                         name={`cards.${index}.content`}
//                         type="textarea"
//                         rows="3"
//                       />
//                     </div>
//                   ) : (
//                     <div className="col">
//                       <label htmlFor={`cards.${index}.content`}>
//                         Select File
//                       </label>
//                       <Field name={`cards.${index}.content`} type="file" />
//                     </div>
//                   )}

//                   <div className="col">
//                     <button
//                       type="button"
//                       className="secondary"
//                       onClick={() => {console.log(index);remove(index)}}
//                     >
//                       X
//                     </button>
//                   </div>
//                 </div>

//               )
//             )}
//           <button
//             type="button"
//             className="secondary"
//             onClick={() => push({ type: "TEXT", content: "",cardsOrder:0})}
//           >
//             Add Card
//           </button>
//         </div>
//       )}
//     </FieldArray>
//   </div>
// );
/* eslint-disable no-restricted-syntax */
/* eslint-disable prefer-template */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/no-array-index-key */
import React from "react";
import { Field, FieldArray, getIn } from "formik";
import { Button } from "react-bootstrap";

const ErrorMessage = ({ name }) => (
  <div  style={{color:"red"}}>
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

export const AllCards = ({
  values,
  handleChange,
 
}) => {
  let arrayIndex = null;
  const selectDisable = (index) => {
    if (index === null);
    else
      document
        .getElementById(`cards.${index}.type`)
        .setAttribute("disabled", "true");
  };


  const handleInputChange = (event) => {
    textContentLegth -= event.target.value.length;
    console.log(textContentLegth);
  };
  return (
    <div>
      <FieldArray name="cards">
        {({ remove, push }) => (
          <div>
            {values.cards.length > 0 &&
              values.cards.map((card, index) => {
                arrayIndex = index;
                return (
                  <div className="justify-content-md-center" key={index} style={{border:"1px solid black",padding:"5px",margin:"5px"}}>
                    <div className="row-justify-content-md-center">
                      <div className="form-group" style={{textAlign:"right"}}>
                        <div className="col">
                          <Button
                            variant="danger"
                            onClick={() => {
                              console.log(index);
                              remove(index);
                            }}
                          >
                            X
                          </Button>
                        </div>
                      </div>
                      <div className="form-group">
                        <div className="col">
                          <label htmlFor={`cards.${index}.type`}>
                            Select Type
                          </label>
                          <Field
                            name={`cards.${index}.type`}
                            as="select"
                            id={`cards.${index}.type`}
                            className="form-control"
                            onChnage={handleChange}
                          >
                            <option value="TEXT">Text</option>
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
                                selectDisable(arrayIndex);
                              }}
                            />
                            {textContentLegth}
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
                                selectDisable(arrayIndex);
                              }}
                            />
                            <ErrorMessage name={`cards.${index}.content`} />
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            <Button
              variant="primary"
              onClick={() => {
                push({ type: "TEXT", content: "" });
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
