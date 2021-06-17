import React from "react";
import { Tabs, Tab } from "react-bootstrap";

export const HomePage = () => (
  <div className="pt-5">
    <Tabs defaultActiveKey="profile" id="uncontrolled-tab-example">
      <Tab eventKey="home" title="Your Feed">
        articles
      </Tab>
      <Tab eventKey="profile" title="Trending">
        trending articles
      </Tab>
    </Tabs>
  </div>
);
