/* eslint-disable react/jsx-props-no-spreading */
import React from "react";
import { Route, Redirect } from "react-router-dom";
// eslint-disable-next-line camelcase
import jwt_decode from "jwt-decode";

export const GuardedRoute = ({ component: Component, roles, ...rest }) => (
  <Route
    {...rest}
    render={(props) => {
      const currentUser = sessionStorage.getItem("x-auth-token")
        ? jwt_decode(sessionStorage.getItem("x-auth-token")).user
        : null;
      console.log(currentUser);
      if (!currentUser) {
        // not logged in so redirect to login page with the return url
        return (
          <Redirect
            to={{ pathname: "/login", state: { from: props.location } }}
          />
        );
      }

      // check if route is restricted by role
      if (roles && roles.indexOf(currentUser.role) === -1) {
        // role not authorised so redirect to home page
        return <Redirect to={{ pathname: "/" }} />;
      }

      // authorised so return component
      return <Component {...props} />;
    }}
  />
);
