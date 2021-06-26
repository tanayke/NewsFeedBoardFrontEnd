import React, { useEffect, useContext, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { Navbar, Nav, Button } from "react-bootstrap";

import {
  NAVBAR_ADMIN,
  HOME,
  REGISTER,
  WRITE,
  LOGIN,
  NAVBAR_READER,
  NAVBAR_REPORTER,
  NAVBAR_GUEST,
} from "../../constants";
import { SearchButtonComponent } from "./SearchButtonComponent";
import { setAuthtoken } from "../../utils/setAuthToken";

import { UserContext } from "../context/UserContext/UserContext";

export const NavBarComponent = () => {
  const { user, setUser } = useContext(UserContext);
  const [navBarArray, setNavBarArray] = useState([]);
  const history = useHistory();
  const handleOnClickLogOut = () => {
    sessionStorage.removeItem("x-auth-token");
    setAuthtoken(sessionStorage.getItem("x-auth-token"));
    setUser();
    history.push(LOGIN);
  };

  useEffect(() => {
    if (user) {
      switch (user.role) {
        case "READER":
          setNavBarArray(NAVBAR_READER);
          break;
        case "REPORTER":
          setNavBarArray(NAVBAR_REPORTER);
          break;
        case "ADMIN":
          setNavBarArray(NAVBAR_ADMIN);
          break;
        default:
      }
    } else {
      setNavBarArray(NAVBAR_GUEST);
    }
  }, [user]);
  return (
    <Navbar bg="light" expand="lg" fixed="top" sticky>
      <Navbar.Brand>
        <Link to={HOME}>News Board</Link>
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          {navBarArray.map((path) => (
            <Nav.Link key={path}>
              <Link to={path}>{path.substring(1).toUpperCase()}</Link>
            </Nav.Link>
          ))}
          {user ? (
            <Button onClick={handleOnClickLogOut} variant="danger">
              LogOut
            </Button>
          ) : (
            <div />
          )}
        </Nav>
        <SearchButtonComponent />
      </Navbar.Collapse>
    </Navbar>
  );
};
