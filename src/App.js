import React, { Fragment } from "react";
import { BrowserRouter } from "react-router-dom";
import { UserLayout } from "./components/userLayout";

function App() {
  return (
    <>
      <BrowserRouter>
        <UserLayout />
      </BrowserRouter>
    </>
  );
}

export default App;
