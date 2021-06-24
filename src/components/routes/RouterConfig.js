import React from "react";
import { Switch, Route } from "react-router-dom";
import { AdminPage } from "../AdminPage";
import { ArticlePage } from "../ArticlePage";
import { HomePage } from "../HomePage";
import { LandingPage } from "../LandingPage";
import { RegistrationPage } from "../LandingPage/RegistrationPage/RegistrationPage";
import { LoginPage } from "../LandingPage/LoginPage/LoginPage";

import { WritePage } from "../WritePage";
import { AddressComponent } from "../sharedComponents";

import {
  ADMIN,
  ARTICLE,
  HOME,
  LANDING,
  REGISTER,
  WRITE,
  ADDRESS,
  LOGIN,
} from "../../constants/CONSTANTS";

export const RouterConfig = () => (
  <div>
    <Switch>
      <Route exact path={LANDING} component={LandingPage} />
      <Route exact path={HOME} component={HomePage} />
      <Route exact path={ADMIN} component={AdminPage} />
      <Route exact path={WRITE} component={WritePage} />
      <Route exact path={ARTICLE} component={ArticlePage} />
      <Route exact path={ADDRESS} component={AddressComponent} />
      <Route exact path={REGISTER} component={RegistrationPage} />
      <Route exact path={LOGIN} component={LoginPage} />
    </Switch>
  </div>
);
