/* eslint-disable react/prop-types */
import React, { useState, useEffect } from "react";
import { Tabs, Tab } from "react-bootstrap";
import TrendingComponent from "./TrendingComponent";
import YourFeedComponent from "./YourFeedComponent";

export const ArticlesTab = ({ articles }) => {
  const [key, setKey] = useState("home");

  return (
    <Tabs
      id="controlled-tab-example"
      activeKey={key}
      onSelect={(k) => setKey(k)}
    >
      <Tab eventKey="home" title="Your Feed">
        <YourFeedComponent articles={articles} />
      </Tab>
      <Tab eventKey="trending" title="Trending">
        <TrendingComponent articles={articles} />
      </Tab>
    </Tabs>
  );
};
