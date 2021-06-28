import React, { useEffect, useContext, useState } from "react";
import { Link, useHistory, Prompt } from "react-router-dom";
import { Navbar, Nav, Button } from "react-bootstrap";

import {
  NAVBAR_ADMIN,
  HOME,
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
    const logout = prompt("Really wanna log out?", "Yes");
    if (logout) {
      sessionStorage.removeItem("x-auth-token");
      sessionStorage.removeItem("user");
      setAuthtoken(sessionStorage.getItem("x-auth-token"));
      setUser();
      history.push(LOGIN);
    }
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

      <Nav i className="mr-auto">
        {navBarArray.map((path) => (
          <Nav.Link key={path}>
            <Link to={path}>{path.substring(1).toUpperCase()}</Link>
          </Nav.Link>
        ))}
        <SearchButtonComponent />
      </Nav>
      <Nav className="ml-auto">
        {user ? (
          <>
            {" "}
            <Nav.Link>
              <h4>{user.name}</h4>
            </Nav.Link>
            <Button
              className="m-1"
              onClick={handleOnClickLogOut}
              variant="danger"
              size="sm"
            >
              LOGOUT
            </Button>
          </>
        ) : (
          <div />
        )}
      </Nav>
    </Navbar>
  );
};
