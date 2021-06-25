import React from "react";
import { Switch, Route } from "react-router-dom";
import { AdminPage } from "../adminPage";
import { ArticlePage } from "../articlePage";
import { HomePage } from "../homePage";
import { LandingPage } from "../landingPage";
import { WritePage } from "../writePage";
import { AddressComponent } from "../sharedComponents";

import { ADMIN, ARTICLE, HOME, LANDING, WRITE, ADDRESS } from "../../constants";

export const RouterConfig = () => (
  <div>
    <Switch>
      <Route exact path={LANDING} component={LandingPage} />
      <Route exact path={HOME} component={HomePage} />
      <Route exact path={ADMIN} component={AdminPage} />
      <Route exact path={WRITE} component={WritePage} />
      <Route exact path={ARTICLE} component={ArticlePage} />
      <Route exact path={ADDRESS} component={AddressComponent} />
    </Switch>
  </div>
);
