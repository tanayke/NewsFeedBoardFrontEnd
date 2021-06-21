import React, { useEffect, useState } from "react";

import * as Yup from "yup";

import { getAllLocations } from "../../services/locationService";

import { getAllCategories } from "../../services/categoriesService";

const SignupSchema = Yup.object().shape({
  title: Yup.string()
    .min(2, "Too Short!")
    .max(20, "Too Long!")
    .required("Required"),
  description: Yup.string()
    .min(2, "Too Short!")
    .max(200, "Too Long!")
    .required("Required"),
  thumbnailImage: Yup.string()
    .min(2, "Too Short!")
    .max(100, "Too Long!")
    .required("Required"),
});

export const WritePage = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    thumbnailImage: "",
    viewCount: 0,
    uploadDateTime: "",
    isActive: "",
    categoryId: 0,
    reporterId: 0,
    locationId: 0,
  });

  const [states, setStates] = useState(["Maharastra", "Goa", "Dehli"]);
  const [locations, setLocations] = useState([]);
  const [categories, setCategory] = useState([]);

  function handleInputChange({ target }) {
    const { name, value } = target;
    setFormData({ ...formData, [name]: value });
  }

  useEffect(() => {
    getAllLocations().then((data) => {
      setLocations(data);
    });
    getAllCategories().then((data) => {
      setCategory(data);
    });
  }, []);

  return <h1>WritePage</h1>;
};
