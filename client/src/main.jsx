import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App";
import Login from "./components/pages/Login";
import AgentList from "./components/pages/AgentList";
import Agent from "./components/pages/Agent";
import Transaction from "./components/pages/Transaction";
import Unauthorized from "./components/pages/Unauthorized";
import "./index.css";

const router = createBrowserRouter([
  { path: "/", element: <App />, children: [{ path: "/", element: <AgentList /> }] },
  { path: "/login", element: <Login /> },
  { path: "/agents", element: <App />, children: [{ path: "/agents", element: <AgentList /> }] },
  { path: "/agents/create", element: <App />, children: [{ path: "/agents/create", element: <Agent /> }] },
  { path: "/agents/edit/:id", element: <App />, children: [{ path: "/agents/edit/:id", element: <Agent /> }] },
  { path: "/transactions", element: <App />, children: [{ path: "/transactions", element: <Transaction /> }] },
  { path: "/unauthorized", element: <Unauthorized /> },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);