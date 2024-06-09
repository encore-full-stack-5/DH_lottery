import React from "react";
import ReactDOM from "react-dom/client";
import { RecoilRoot } from "recoil";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import P_Buying from "./pages/P_Buying.jsx";
import P_WinningResult from "./pages/P_WinningResult.jsx";
import Layout from "./pages/Layout.jsx";
import Withdraw from "./pages/withdraw/Withdraw.jsx";
import Payment from "./pages/payment/Payment.jsx";
import { LottoResultPage } from "./pages/lotto/LottoResultPage.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      // { path: "/signup", element: <Signup /> },
      // { path: "/login", element: <Login /> },
      { path: "/winResult", element: <P_WinningResult /> },
      { path: "/buying720", element: <P_Buying /> },
      { path: "/payment", element: <Payment /> },
      { path: "/lotto_result", element: <LottoResultPage /> },
      { path: "/withdraw", element: <Withdraw /> },
    ],
  },
]);
ReactDOM.createRoot(document.getElementById("root")).render(
  <RecoilRoot>
    <RouterProvider router={router}>
      <Layout />
    </RouterProvider>
  </RecoilRoot>
);
