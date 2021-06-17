import React from "react";
import { Switch, Route } from "react-router-dom";
import { AdminPage } from "../components/AdminPage";
import { ArticlePage } from "../components/ArticlePage";
import { HomePage } from "../components/HomePage";
import { LandingPage } from "../components/LandingPage";
import { RegitrationComponent } from "../components/LandingPage/RegitrationComponent";
import { WritePage } from "../components/WritePage";
import { ADMIN, ARTICLE, HOME, LANDING, WRITE } from "./CONSTANTS";

export const RouterConfig = () => (
  <div>
    <Switch>
      <Route exact path={LANDING} component={LandingPage} />
      <Route exact path={HOME} component={HomePage} />
      <Route exact path={ADMIN} component={AdminPage} />
      <Route exact path={WRITE} component={WritePage} />
      <Route exact path={ARTICLE} component={ArticlePage} />
      <Route path="/registration">
        <RegitrationComponent />
      </Route>
    </Switch>
  </div>
);
