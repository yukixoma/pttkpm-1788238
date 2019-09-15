import React from "react";
import { BrowserRouter as ReactRouter, Route } from "react-router-dom";
import NewSection from "../screens/section/NewSection";
import Home from "../screens/Home";
import SectionInfo from "../screens/section/SectionInfo";
import AreaStatus from "../screens/section/SectionList";
import CheckIn from "../screens/room/CheckIn";
import CheckOut from "../screens/room/CheckOut";
import BusinessStat from "../screens/stat/Revenue";
import Login from "../screens/auth/Login";

const Router: React.SFC<RouterProps> = props => {
  const { setActiveKey } = props;

  return (
    <ReactRouter>
      <Route
        path="/"
        exact
        render={props => <Home {...props} setActiveKey={setActiveKey} />}
      />

      {/* Section routes */}
      <Route
        path="/section/list"
        exact
        render={props => <AreaStatus {...props} setActiveKey={setActiveKey} />}
      />
      <Route
        path="/section/create"
        exact
        render={() => <NewSection setActiveKey={setActiveKey} />}
      />
      <Route
        path="/section/info"
        exact
        render={props => <SectionInfo {...props} setActiveKey={setActiveKey} />}
      />

      {/* Room routes */}
      <Route path="/room/checkin" exact component={CheckIn} />
      <Route
        path="/room/checkout"
        exact
        render={props => <CheckOut {...props} />}
      />

      {/* Stat routes */}
      <Route
        path="/stat/revenue"
        exact
        render={props => (
          <BusinessStat setActiveKey={setActiveKey} {...props} />
        )}
      />

      {/* Authorize routes */}
      <Route
        path="/authorize/login"
        render={props => <Login {...props} setActiveKey={setActiveKey} />}
      />
    </ReactRouter>
  );
};

interface RouterProps {
  setActiveKey(activeKey: string): void;
}

export default Router;
