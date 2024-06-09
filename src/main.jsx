import React from "react";
import ReactDOM from "react-dom/client";
import { RecoilRoot } from "recoil";
import App from "./App.jsx";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

import P_Buying from "./pages/p_buying/P_Buying.jsx";
import P_WinningResult from "./pages/P_WinningResult.jsx";
import Layout from "./pages/Layout.jsx";
import Withdraw from "./pages/withdraw/Withdraw.jsx";
import Payment from "./pages/payment/Payment.jsx";
import Transaction from "./pages/transaction/Transaction.jsx";
import { LottoResultPage } from "./pages/lotto/LottoResultPage.jsx";
import P_MyWin720 from "./pages/p_lottery/P_MyWin720.jsx";
import HorizontalBar from "./components/lotto-analytics/HoryzontalBar.jsx";
import PieChart from "./components/lotto-analytics/PieChart.jsx";

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
      { path: "/myWin720", element: <P_MyWin720 /> },
      { path: "/transaction", element: <Transaction /> },
      { path: "/horizontal", element: <HorizontalBar /> },
      { path: "/pie", element: <PieChart /> },
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
