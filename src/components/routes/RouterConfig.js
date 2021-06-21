import React from "react";
import { Switch, Route } from "react-router-dom";
import { AdminPage } from "../AdminPage";
import { ArticlesTab,HomePage } from "../HomePage";
import { ArticlePage } from "../ArticlePage";
import { LandingPage } from "../LandingPage";
import { RegitrationComponent } from "../LandingPage/RegitrationComponent";
import { WritePage } from "../WritePage";
import {
  ADMIN,
  ARTICLE,
  HOME,
  LANDING,
  REGISTER,
  WRITE,
  CARDS,
} from "../../constants";

export const RouterConfig = () => (
  <div>
    <Switch>
      <Route exact path={LANDING} component={LandingPage} />
      <Route exact path={HOME} component={HomePage} />
      <Route exact path={ADMIN} component={AdminPage} />
      <Route exact path={WRITE} component={WritePage} />
      <Route exact path={ARTICLE} component={ArticlesTab} />
      <Route exact path={CARDS} component={ArticlePage} />
      <Route path={REGISTER}>
        <RegitrationComponent />
      </Route>
    </Switch>
  </div>
);
