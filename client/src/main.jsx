import * as React from "react";
import * as ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import App from "./App";
import Record from "./components/Record";
import RecordList from "./components/RecordList";
import RecordAgents from "./components/RecordAgents";
import RecordListAgents from "./components/RecordListAgents";
import Login from "./components/Login";
import "./index.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,  // Protect this route with App
    children: [
      {
        path: "/",
        element: <RecordList />,
      },
    ],
  },
  {
    path: "/edit/:id",
    element: <App />,
    children: [
      {
        path: "/edit/:id",
        element: <Record />,
      },
    ],
  },
  {
    path: "/create",
    element: <App />,
    children: [
      {
        path: "/create",
        element: <Record />,
      },
    ],
  },
  {
    path: "/agents/login",  // No protection needed here
    element: <Login />,
  },
  {
    path: "/agents",  // Protect agents-related routes
    element: <App />,
    children: [
      {
        path: "/agents",
        element: <RecordListAgents />,
      },
    ],
  },
  {
    path: "/agents/create",  // Protect create agent
    element: <App />,
    children: [
      {
        path: "/agents/create",
        element: <RecordAgents />,
      },
    ],
  },
  {
    path: "/agents/edit/:id",  // Protect edit agent
    element: <App />,
    children: [
      {
        path: "/agents/edit/:id",
        element: <RecordAgents />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);