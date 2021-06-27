
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
let textContentLegth = 15;
let wordlength=0;


export const AllCards = ({
  values,
  handleChange,
 
}) => {
  let arrayIndex = null;
  let isWordLegnthExceed=false;

  const setMaxLength =()=>{
    console.log(textContentLegth-=wordlength);
    if(textContentLegth<2)
      isWordLegnthExceed=true;
  }

  const selectDisable = (index) => {
    if (index === null);
    else
      document
        .getElementById(`cards.${index}.type`)
        .setAttribute("disabled", "true");
  };

  const handleInputChange = (event) => {
      const str =event.target.innerHTML;
      console.log(str.length);
      wordlength=str.length;
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
                            {textContentLegth<2 ? 
                            (
                              <option value="TEXT" disabled>Text</option>
                            ):
                            (
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
                                selectDisable(arrayIndex);
                              }}
                              maxLength={textContentLegth}
                            />
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
             
              <div className="row-justify-content-md-center">
                <div className="form-group" style={{textAlign:"center",color:"red"}}>
                    {textContentLegth<2  ? (
                     <span>Content type text words limit is Acheived</span> 
                   ) :null 
                   }
               
                </div>
              </div>
            <Button
              variant="primary"
              onClick={() => {
                push({ type: "IMAGE", content: "" });
                setMaxLength();
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
