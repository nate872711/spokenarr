import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx"; // or your main component if it's named differently
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);