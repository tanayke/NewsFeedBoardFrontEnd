import React from "react";
import { Switch, Route } from "react-router-dom";
import { AdminPage } from "../adminPage";
import { ArticlePage } from "../articlePage";
import { HomePage } from "../homePage";
import { LandingPage } from "../landingPage";
import { WritePage } from "../writePage";
import { RegistrationPage } from "../landingPage/RegistrationPage";
import { LoginPage } from "../landingPage/LoginPage";
import { SearchResultsComponent } from "../searchResultes/SearchResultsComponent";
import {
  ADMIN,
  ARTICLE,
  HOME,
  LANDING,
  REGISTER,
  WRITE,
  LOGIN,
  ROUTE_SEARCH,
} from "../../constants/CONSTANTS";

export const RouterConfig = () => (
  <div>
    <Switch>
      <Route exact path={LANDING} component={LandingPage} />
      <Route exact path={HOME} component={HomePage} />
      <Route exact path={ADMIN} component={AdminPage} />
      <Route exact path={WRITE} component={WritePage} />
      <Route exact path={ARTICLE} component={ArticlePage} />
      <Route exact path={REGISTER} component={RegistrationPage} />
      <Route exact path={LOGIN} component={LoginPage} />
      <Route path={ROUTE_SEARCH} component={SearchResultsComponent} />
    </Switch>
  </div>
);
