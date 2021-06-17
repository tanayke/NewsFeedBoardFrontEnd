import React from "react";
import { Link } from "react-router-dom";
import { REGISTER } from "../../constants";
import { RegitrationComponent } from "./RegitrationComponent";

export const LandingPage = () => (
  <div>
    <h1>Landing Page</h1>
    <Link to={REGISTER}>Register</Link>
  </div>
);
