import React from "react";
import ReactDOM from "react-dom/client";
<<<<<<< HEAD
import App from "./App.jsx";
import "./index.css";
import P_WinningResult from "./pages/P_WinningResult.jsx";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Layout from "./pages/Layout.jsx";
import Payment from "./pages/Payment.jsx";
import Login from "./pages/login/Login.jsx";
import SignUp from "./pages/singUp/SingUp.jsx";
import { RecoilRoot } from "recoil";
import JoinFormAgree from "./pages/singUp/JoinFormAgree.jsx";
=======
import { RecoilRoot } from "recoil";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

import P_Buying from "./pages/P_Buying.jsx";

import P_Buying from "./pages/p_buying/P_Buying.jsx";

import P_WinningResult from "./pages/P_WinningResult.jsx";
import Layout from "./pages/Layout.jsx";
import Withdraw from "./pages/withdraw/Withdraw.jsx";
import Payment from "./pages/payment/Payment.jsx";
import Lotto from "./components/lotto/lotto.jsx";
import Transaction from "./pages/transaction/Transaction.jsx";
import { LottoResultPage } from "./pages/lotto/LottoResultPage.jsx";
import P_MyWin720 from "./pages/p_lottery/P_MyWin720.jsx";
import HorizontalBar from "./components/lotto-analytics/HoryzontalBar.jsx";
import PieChart from "./components/lotto-analytics/PieChart.jsx";
>>>>>>> 3eac28c8ae8095b7873eec898829f9f60becf32e

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
<<<<<<< HEAD
      { path: "/login", element: <Login /> },
      { path: "/singUp", element: <SignUp /> },
      { path: "/joinFormAgree", element: <JoinFormAgree /> },
=======
      { path: "/lotto", element: <Lotto /> },
      { path: "/lotto_result", element: <LottoResultPage /> },

      { path: "/withdraw", element: <Withdraw /> },
      { path: "/myWin720", element: <P_MyWin720 /> },
      { path: "/transaction", element: <Transaction /> },
      { path: "/horizontal", element: <HorizontalBar /> },
      { path: "/pie", element: <PieChart /> },
>>>>>>> 3eac28c8ae8095b7873eec898829f9f60becf32e
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
