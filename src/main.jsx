import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import P_WinningResult from "./pages/P_WinningResult.jsx";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Layout from "./pages/Layout.jsx";
import { RecoilRoot } from "recoil";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      // { path: "/signup", element: <Signup /> },
      // { path: "/login", element: <Login /> },
      { path: "/winResult", element: <P_WinningResult /> },
    ],
  },
]);
ReactDOM.createRoot(document.getElementById("root")).render(
  <RecoilRoot>
    <RouterProvider router={router}>
      <App />
    </RouterProvider>
  </RecoilRoot>
);
