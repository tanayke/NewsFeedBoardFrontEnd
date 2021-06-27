// /* eslint-disable no-restricted-syntax */
// /* eslint-disable react/no-array-index-key */
// /* eslint-disable jsx-a11y/label-has-associated-control */
// /* eslint-disable react/destructuring-assignment */
// /* eslint-disable react/jsx-props-no-spreading */
// import React, { useEffect, useState, useRef } from "react";
// import { Formik, Form, Field } from "formik";
// import * as Yup from "yup";
// import { Button, FormLabel } from "react-bootstrap";
// import { serialize } from "object-to-formdata";
// import { getAllCategories } from "../../services/categoriesService";
// import { addArticle } from "../../services/articleService";
// import { SelectLocation } from "../sharedComponents";
// import { AllCards } from "./addCards";
// import { AddNewLocation } from "../sharedComponents/AddNewLocation";

// const InitialValues = {
//   title: "",
//   description: "",
//   thumbnailImage: "",
//   categoryId: "",
//   reporterId: 0,
//   state: "",
//   city: "",
//   locality: "",
//   cards: [],
// };

// const SignupSchema = Yup.object().shape({
//   title: Yup.string()
//     .min(2, "Too Short!!")
//     .max(20, "Too Long!")
//     .required("Required"),
//   description: Yup.string()
//     .min(2, "Too Short!")
//     .max(200, "Too Long!")
//     .required("Required"),
//   categoryId: Yup.number().required("Required"),
//   state: Yup.string().min(2, "Too Short!").required("required"),
//   city: Yup.string().min(2, "Too Short!").required("required"),
//   locality: Yup.string().required("required"),
//   thumbnailImage: Yup.mixed().required("Required"),
// });

// export const WritePage = () => {
//   const [isNewLocation, setNewLocation] = useState(false);
//   const [articleId, setArticleId] = useState();
//   const myForm = useRef(null);

//   const [categories, setCategory] = useState([]);

//   useEffect(() => {
//     getAllCategories().then((data) => {
//       setCategory(data);
//     });
//   }, []);

//   function addNewLocation() {
//     if (isNewLocation) setNewLocation(false);
//     else setNewLocation(true);
//   }

//   function handleOnSubmit(d) {

//     console.log(d);
//     console.log(JSON.stringify(d.cards));
//     const data = new FormData(myForm.current);
//     data.append("reporterId", 1);
//     data.append("isNewlocation", isNewLocation);
//     data.append("cards", JSON.stringify(d.cards));
//     console.log(data);
//     addArticle(data)
//       .then((response) => {
//         setArticleId(response.id);
//         console.log(response);
//       })
//       .catch((error) => {
//         console.log(error);
//       });
//   }

//   return (
//     <div>
//       <h1>Article Form</h1>
//       <Formik
//         initialValues={InitialValues}
//         validationSchema={SignupSchema}
//         onSubmit={handleOnSubmit}
//       >
//         {({ errors, touched, values, setFieldValue }) => (
//           <Form ref={myForm}>
//             <div className="form-group">
//               <FormLabel>Title</FormLabel>
//               <Field name="title" className="form-control" />
//               {errors.title && touched.title ? <div>{errors.title}</div> : null}
//             </div>
//             <div className="form-group">
//               <FormLabel>Description</FormLabel>
//               <Field
//                 as="textarea"
//                 rows={2}
//                 name="description"
//                 className="form-control"
//               />
//               {errors.description && touched.description ? (
//                 <div>{errors.description}</div>
//               ) : null}
//             </div>

//             <div className="form-group">
//               <FormLabel>Select Category</FormLabel>
//               <br />
//               <Field name="categoryId" as="select" className="form-control">
//                 {categories.map((category) => (
//                   <option key={category.id} value={category.id}>
//                     {category.name}
//                   </option>
//                 ))}
//               </Field>
//               {errors.categoryId && touched.categoryId ? (
//                 <div>{errors.categoryId}</div>
//               ) : null}
//             </div>

//             <div className="form-group">
//               <FormLabel>Select Thumbnail Image</FormLabel>
//               <br />
//               <Field type="file" name="thumbnailImage" className="form-file" />
//               {touched.thumbnailImage ? (
//                 <div>{errors.thumbnailImage}</div>
//               ) : null}
//             </div>

//             <div className="form-group">
//               {isNewLocation ? (
//                 <Button onClick={addNewLocation}>Select Location</Button>
//               ) : (
//                 <Button onClick={addNewLocation}>Add New Location</Button>
//               )}
//             </div>

//             <div className="form-group">
//               {isNewLocation ? <AddNewLocation errors={errors} touched={touched} values={values} /> : <SelectLocation />}
//             </div>

//             <div className="form-group">
//               <Button variant="primary" type="submit" onClick={handleOnSubmit}>
//                 Submit
//               </Button>
//             </div>

//             <AllCards values={values} setFieldValue={setFieldValue} />
//           </Form>
//         )}
//       </Formik>
//     </div>
//   );
// };

/* eslint-disable no-restricted-syntax */
/* eslint-disable react/no-array-index-key */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect, useState, useRef } from "react";
import { Formik, Form, Field,getIn } from "formik";
import * as Yup from "yup";
import { Button, FormLabel, Col } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { getAllCategories } from "../../services/categoriesService";
import { addArticle } from "../../services/articleService";
import { SelectLocation } from "../sharedComponents";
import { AllCards } from "./addCards";
import { AddNewLocation } from "../sharedComponents/AddNewLocation";
import { HOME } from "../../constants";

const InitialValues = {
  title: "",
  description: "",
  thumbnailImage: "",
  categoryId: "",
  state:"",
  city:"",
  locality:"",
  reporterId: 0,
  // location: 0,
  cards: [
    {
      type: 'TEXT',
      content: '',
    },
  ],
};

const SignupSchema = Yup.object().shape({
  title: Yup.string()
    .min(2, "Too Short!")
    .max(120, "Too Long!")
    .required("Enter Title!!"),
  description: Yup.string()
    .min(2, "Too Short!")
    .max(60, "Too Long!")
    .required("Enter Description!!"),
  categoryId: Yup.string().required("Select Category"),
  state:Yup.string().min(3, "Too Short!")
  .max(25, "Too Long!").required("State Required!!"),
  city:Yup.string().min(2, "Too Short!")
  .max(60, "Too Long!").required("City Required!!"),
  locality:Yup.string()
  .max(60, "Too Long!").required("Locality Required!!"),
  thumbnailImage: Yup.mixed().required("Select Image"),
  cards: Yup.array()
     .of(
       Yup.object().shape({
         type: Yup.string().required('Required'), 
         content: Yup.string().required('Card Content Required!!'), 
       })
     )
});

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

export const WritePage = () => {
  const history = useHistory();
  const [isNewLocation, setNewLocation] = useState(false);
  const myForm = useRef(null);
  const [categories, setCategory] = useState([]);

  useEffect(() => {
    getAllCategories().then((data) => {
      setCategory(data);
    });
  }, []);

  function addNewLocation() {
    if (isNewLocation) setNewLocation(false);
    else setNewLocation(true);
  }

  function handleSubmit(d) {
    const data = new FormData(myForm.current);
    data.append("reporterId", 1);
    data.append("isNewlocation", isNewLocation);
    data.append("cards", JSON.stringify(d.cards));

    addArticle(data)
      .then((response) => {
        console.log(response);
        history.push(HOME);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <div>
      <h1 style={{textAlign:"center",marginTop:"8px"}}>Create News Article</h1>
      <Formik
        initialValues={InitialValues}
        validationSchema={SignupSchema}
        onSubmit={handleSubmit}
      >
        {({ errors, touched, values, setFieldValue,handleChange }) => (
          <Form ref={myForm}>
            <div className="form-group" >
              <FormLabel>Title</FormLabel>
              <Field name="title" className="form-control" />
              <ErrorMessage name="title" />
             
            </div>

            <div className="form-group">
              <Field name="categoryId" as="select" className="form-control">
                <option>Select Category</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </Field>
              <ErrorMessage name="categoryId" />
             
            </div>

            <div className="form-group">
              <FormLabel>Select Thumbnail Image</FormLabel>
              <br />
              <Field
                type="file"
                name="thumbnailImage"
                className="form-file"
                isInvalid={!!errors.thumbnailImage}
              />
            <ErrorMessage name="thumbnailImage" />
            </div>

            <div className="form-group">
              <FormLabel>Description</FormLabel>
              <Field
                as="textarea"
                rows={2}
                name="description"
                className="form-control"
              />
              <ErrorMessage name="description" />
           
            </div>
            
            {isNewLocation ? (
              <div className="form-group">
                <Button onClick={addNewLocation}>Select Location</Button>
              </div>
            ) : (
              <div className="form-group">
                <Button onClick={addNewLocation}>Add New Location</Button>
              </div>
            )}

            <div className="form-group">
                  {isNewLocation ? <AddNewLocation handleChange={handleChange} errors={errors} touched={touched} /> : <SelectLocation handleChange={handleChange} errors={errors} touched={touched} />}
            </div>

            <div className="form-group" >
            <AllCards values={values} setFieldValue={setFieldValue} handleChange={handleChange} errors={errors} touched={touched} />
            </div>

            <div className="form-group" style={{textAlign:"right"}}>
              <Button variant="success" type="submit" size="lg" >
                Submit
              </Button>
            </div>

            
          </Form>
        )}
      </Formik>
    </div>
  );
};
