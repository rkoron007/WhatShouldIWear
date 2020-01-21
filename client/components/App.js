//React
import React from "react";
import { HashRouter } from "react-router-dom";
import { Redirect, Switch, Route } from "react-router";
import Jumbotron from "react-bootstrap/Jumbotron";

import LocationForm from "./location/locationForm";

const Greeting = () => {
  return (
    <Jumbotron>
      <h1>What Should I Wear?</h1>
      <p>
        Have you ever looked at the forecast and not known what to wear?{" "}
        <strong>We are here to help!</strong>
        <br></br>
        Enter a city below for a 5+ day weather forecast and clothing
        recommendations based on that forecast.
      </p>
    </Jumbotron>
  );
};

// The HashRouter, Switch, and Redirect components will ensure that users will
// not be able to navigate away from the main page
const App = () => {
  return (
    <HashRouter>
      <Greeting></Greeting>
      <Switch>
        <Route exact path="/" component={LocationForm} />
        <Redirect to="/"></Redirect>
      </Switch>
    </HashRouter>
  );
};

export default App;
