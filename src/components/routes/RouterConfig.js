import React from "react";
import { Switch, Route } from "react-router-dom";
import { AdminPage } from "../adminPage/AdminPage";
import { ArticlePage } from "../articlePage/ArticlePage";
import { HomePage } from "../homePage/HomePage";
import { WritePage } from "../writePage";
import { RegistrationPage } from "../landingPage/RegistrationPage";
import { LoginPage } from "../landingPage/LoginPage";
import { SearchResultsComponent } from "../searchResultes/SearchResultsComponent";
import {NotFoundPage} from '../notFoundPage/NotFoundPage';
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
      <Route exact path="/" component={HomePage} />

      <Route exact path={HOME} component={HomePage} />
      <Route path="*" component={NotFoundPage} />
      <GuardedRoute path={ADMIN} component={AdminPage} roles={["ADMIN"]} />
      <GuardedRoute
        exact
        path={WRITE}
        component={WritePage}
        roles={["REPORTER"]}
      />

      <GuardedRoute
        exact
        path={`${ARTICLE}/:articleId`}
        component={ArticlePage}
        roles={["REPORTER", "READER", "ADMIN"]}
      />
      <Route exact path={REGISTER} component={RegistrationPage} />
      <Route exact path={LOGIN} component={LoginPage} />
      <Route path={ROUTE_SEARCH} component={SearchResultsComponent} />
    </Switch>
  </div>
);
