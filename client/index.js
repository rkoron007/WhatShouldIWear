import React from "react";
import ReactDOM from "react-dom";
//Components
import App from "./components/App";

// setting up React
document.addEventListener("DOMContentLoaded", () => {
  const root = document.getElementById("root");
  ReactDOM.render(<App />, root);
});
