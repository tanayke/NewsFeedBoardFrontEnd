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
import { Field, FieldArray } from "formik";

const initialValues = {
  cards: [
    {
      type: "",
      content: "",
      cardOrder: "",
    },
  ],
};



export const AllCards = ({ values, setFieldValue }) =>{
  let arrayIndex=null;
  const selectDisable =(index) =>{
    if(index === null)
    ;
    else
      document.getElementById(`cards.${index}.type`).setAttribute("disabled","true");
  }
  return (
  
  <div>
    <FieldArray name="cards">
      {({ insert, remove, push }) => (
        <div>
          {
          values.cards.length > 0 &&
            values.cards.map((card, index) => {
              arrayIndex=index;
              return  (
                <div className="row" key={index}>
                  <div className="col">
                    <label htmlFor={`cards.${index}.type`}>Select Type</label>
                    <Field name={`cards.${index}.type`} as="select" id={`cards.${index}.type`}>
                      <option value="TEXT">Text</option>
                      <option value="IMAGE">Image</option>
                      <option value="VIDEO">Video</option>
                    </Field>
                  </div>
                  {card.type === "TEXT" ? (
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
                      onClick={() => {console.log(index);remove(index)}}
                    >
                      X
                    </button>
                  </div>
                </div>
              )
            }
            )}
          <button
            type="button"
            className="secondary"
            onClick={() => {push({ type: "TEXT", content: ""}) ; console.log(arrayIndex); selectDisable(arrayIndex)}}
          >
            Add Card
          </button>
        </div>
      )}
    </FieldArray>
  </div>
);
                  }