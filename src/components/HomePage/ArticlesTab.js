import React, {useState} from "react";
import { Tabs, Tab } from "react-bootstrap";
import YourFeedComponent from "./YourFeedComponent";

export const ArticlesTab = () => {

const [key, setKey] = useState('home');

return (
  <Tabs
    id="controlled-tab-example"
    activeKey={key}
    onSelect={(k) => setKey(k)}
  >
    <Tab eventKey="home" title="Your Feed" >
    <YourFeedComponent/>
    </Tab>
    <Tab eventKey="trending" title="Trending">
    something
    </Tab>
   
  </Tabs>
);

}