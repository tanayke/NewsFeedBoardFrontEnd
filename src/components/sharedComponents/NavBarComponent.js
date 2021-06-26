import React from "react";
import { Link, useHistory } from "react-router-dom";
import { Navbar, Nav, Button } from "react-bootstrap";

import { HOME, REGISTER, WRITE, LOGIN } from "../../constants";
import { SearchButtonComponent } from "./SearchButtonComponent";
import { setAuthtoken } from "../../utils/setAuthToken";

export const NavBarComponent = () => {
  const history = useHistory();
  const handleOnClickLogOut = () => {
    sessionStorage.removeItem("x-auth-token");
    setAuthtoken(sessionStorage.getItem("x-auth-token"));
    history.push(LOGIN);
  };
  return (
    <Navbar bg="light" expand="lg" fixed="top">
      <Navbar.Brand>
        <Link to={HOME}>News Board</Link>
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link>
            <Link to={HOME}>Home</Link>
          </Nav.Link>
          <Nav.Link>
            <Link to={WRITE}>Write</Link>
          </Nav.Link>
          <Nav.Link>
            <Link to={REGISTER}>REGISTER</Link>
          </Nav.Link>
          <Nav.Link>
            <Link to={LOGIN}>LOGIN</Link>
          </Nav.Link>
          <Button onClick={handleOnClickLogOut} variant="danger">
            LogOut
          </Button>
        </Nav>
        <SearchButtonComponent />
      </Navbar.Collapse>
    </Navbar>
  );
};
