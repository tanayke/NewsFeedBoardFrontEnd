import React, { Fragment } from "react";
import { BrowserRouter } from "react-router-dom";
import { NavBarComponent } from "./components/NavBarComponent";
import { RouterConfig } from "./routes/RouterConfig";

function App() {
  return (
    <>
      <BrowserRouter>
        <NavBarComponent />
        <RouterConfig />
      </BrowserRouter>
    </>
  );
}

export default App;
