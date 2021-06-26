import React from "react";
import { Link } from "react-router-dom";
import { Navbar, Nav, NavDropdown } from "react-bootstrap";

import { HOME, REGISTER, WRITE } from "../../constants";
import { SearchButtonComponent } from "./SearchButtonComponent";

export const NavBarComponent = () => {
  const handleSearchOnClick = ({ target }) => {};
  return (
    <Navbar bg="light" expand="lg">
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

          <NavDropdown title="Dropdown" id="basic-nav-dropdown">
            <NavDropdown.Item>
              <Link to={REGISTER}>Register</Link>
            </NavDropdown.Item>
            <NavDropdown.Item href="#action/3.2">
              Another action
            </NavDropdown.Item>
            <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item href="#action/3.4">
              Separated link
            </NavDropdown.Item>
          </NavDropdown>
        </Nav>
        <SearchButtonComponent />
      </Navbar.Collapse>
    </Navbar>
  );
};
