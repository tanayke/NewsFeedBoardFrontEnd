import React, { Fragment } from "react";
import { BrowserRouter } from "react-router-dom";
// import userContextProvider from "./components/context/userContext/userContextProvider";
import { UserLayout } from "./components/userLayout";
import UserContextProvider from "./components/context/UserContext/UserContextProvider";

function App() {
  // const contextUser = LoginPage();

  return (
    <>
      <BrowserRouter>
        <UserContextProvider>
          <UserLayout />
        </UserContextProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
