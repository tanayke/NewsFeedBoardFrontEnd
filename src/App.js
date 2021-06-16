import { Fragment } from "react";
import { BrowserRouter } from "react-router-dom";
import { RouterConfig } from "./routes/RouterConfig";

function App() {
  return (
    <Fragment>
      <BrowserRouter>
        <RouterConfig />
      </BrowserRouter>
    </Fragment>
  );
}

export default App;
