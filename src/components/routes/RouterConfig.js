import React from "react";
import { Switch, Route } from "react-router-dom";
import { AdminPage } from "../AdminPage";
import { ArticlePage } from "../ArticlePage";
import { HomePage } from "../HomePage";
import { LandingPage } from "../LandingPage";
import { RegitrationComponent } from "../LandingPage/RegitrationComponent";
import { WritePage } from "../WritePage";
import { AddressComponent } from "../sharedComponents";

import {
  ADMIN,
  ARTICLE,
  HOME,
  LANDING,
  REGISTER,
  WRITE,
  ADDRESS
} from "../../constants";

export const RouterConfig = () => (
  <div>
    <Switch>
      <Route exact path={LANDING} component={LandingPage} />
      <Route exact path={HOME} component={HomePage} />
      <Route exact path={ADMIN} component={AdminPage} />
      <Route exact path={WRITE} component={WritePage} />
      <Route exact path={ARTICLE} component={ArticlePage} />
       <Route exact path={ADDRESS} component={AddressComponent} />
      <Route path={REGISTER}>
        <RegitrationComponent />
      </Route>
    </Switch>
  </div>
);
