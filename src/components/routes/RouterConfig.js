import React from "react";
import { Switch, Route } from "react-router-dom";
import { AdminPage } from "../adminPage/AdminPage";
import { ArticlePage } from "../articlePage/ArticlePage";
import { HomePage } from "../homePage/HomePage";
import { WritePage } from "../writePage";
import { RegistrationPage } from "../landingPage/RegistrationPage";
import { LoginPage } from "../landingPage/LoginPage";
import { SearchResultsComponent } from "../searchResultes/SearchResultsComponent";
import {
  ADMIN,
  ARTICLE,
  HOME,
  REGISTER,
  WRITE,
  LOGIN,
  ROUTE_SEARCH,
} from "../../constants/CONSTANTS";
import { GuardedRoute } from "./GuardedRoute";

export const RouterConfig = () => (
  <div>
    <Switch>
      <Route exact path={HOME} component={HomePage} />
      <GuardedRoute path={ADMIN} component={AdminPage} auth />
      <GuardedRoute exact path={WRITE} component={WritePage} auth />
      <Route exact path={ARTICLE} component={ArticlePage} />
      <Route exact path={REGISTER} component={RegistrationPage} />
      <Route exact path={LOGIN} component={LoginPage} />
      <Route path={ROUTE_SEARCH} component={SearchResultsComponent} />
    </Switch>
  </div>
);
