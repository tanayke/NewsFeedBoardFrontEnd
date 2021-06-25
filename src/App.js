import React, { Fragment } from "react";
import { BrowserRouter } from "react-router-dom";
// import userContextProvider from "./components/context/userContext/userContextProvider";
import { UserLayout } from "./components/userLayout";

function App() {
  // const contextUser = LoginPage();

  return (
    <>
      <BrowserRouter>
        <UserLayout />
      </BrowserRouter>
    </>
  );
}

export default App;
