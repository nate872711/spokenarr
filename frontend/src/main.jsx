import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";

import AppLayout from "./components/AppLayout";
import Home from "./pages/Home";
import Discover from "./pages/Discover";
import Library from "./pages/Library";
import Downloads from "./pages/Downloads";
import Settings from "./pages/Settings";

const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: "discover", element: <Discover /> },
      { path: "library", element: <Library /> },
      { path: "downloads", element: <Downloads /> },
      { path: "settings", element: <Settings /> },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
