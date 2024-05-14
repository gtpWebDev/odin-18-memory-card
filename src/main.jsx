import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

/*
  To do list:
    - complete front end - mainly titles and scores
    - add a thank you to fxhash
    - for another time, improve fetch structure to parallel fetch or collecting all projects in one fetch
*/
