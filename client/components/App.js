//React
import React from "react";
import { HashRouter } from "react-router-dom";
import { Redirect, Switch, Route } from "react-router";

import LocationForm from "./location/locationForm";

const App = () => {
  return (
    <HashRouter>
      <Switch>
        <Route exact path="/" component={LocationForm} />
        <Redirect to="/"></Redirect>
      </Switch>
    </HashRouter>
  );
};

export default App;
