import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import Login from "./pages/login/Login.jsx";
import SignUp from "./pages/singUp/SingUp.jsx";
import JoinFormAgree from "./pages/singUp/JoinFormAgree.jsx";
import { RecoilRoot } from "recoil";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

// import P_Buying from "./pages/P_Buying.jsx";

import P_Buying from "./pages/p_buying/P_Buying.jsx";
import P_WinningResult from "./pages/P_WinningResult.jsx";
import Layout from "./pages/Layout.jsx";
import Withdraw from "./pages/withdraw/Withdraw.jsx";
import Payment from "./pages/payment/Payment.jsx";
import Lotto from "./components/lotto/lotto.jsx";
import Transaction from "./pages/transaction/Transaction.jsx";
import { LottoResultPage } from "./pages/lotto/LottoResultPage.jsx";
import P_MyWin720 from "./pages/p_lottery/P_MyWin720.jsx";
import HorizontalBar from "./components/lotto-analytics/chart/HoryzontalBar.jsx";
import PieChart from "./components/lotto-analytics/chart/PieChart.jsx";
import VerticalBar from "./components/lotto-analytics/chart/VerticalBar.jsx";
import P_statistics from "./pages/p_lottery/P_statistics.jsx";
import MyPage from "./pages/myPage/MyPage.jsx";
import { LottoHistoryPage } from "./pages/lotto/LottoHistoryPage.jsx";
import EvenOddResult from "./components/lotto-analytics/chart/EvenOddResult.jsx";
import LottoAnalyticsPage from "./pages/lotto/LottoAnalyticsPage.jsx";
import { CheckoutPage } from "./pages/payment/Checkout.jsx";
import { SuccessPage } from "./pages/payment/Success.jsx";
import { FailPage } from "./pages/payment/Fail.jsx";
import TotoMain from "./pages/toto/TotoMain.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "/winResult", element: <P_WinningResult /> },
      { path: "/buying720", element: <P_Buying /> },
      { path: "/payment", element: <Payment /> },
      { path: "/checkout", element: <CheckoutPage /> },
      { path: "/success", element: <SuccessPage /> },
      { path: "/fail", element: <FailPage /> },
      { path: "/login", element: <Login /> },
      { path: "/singUp", element: <SignUp /> },
      { path: "/joinFormAgree", element: <JoinFormAgree /> },
      { path: "/lotto", element: <Lotto /> },
      { path: "/lotto_result", element: <LottoResultPage /> },
      { path: "/lotto_history", element: <LottoHistoryPage /> },
      { path: "/withdraw", element: <Withdraw /> },
      { path: "/myWin720", element: <P_MyWin720 /> },
      { path: "/transaction", element: <Transaction /> },
      { path: "/lotto_analytics", element: <LottoAnalyticsPage /> },
      { path: "/horizontal", element: <HorizontalBar /> },
      { path: "/pie", element: <PieChart /> },
      { path: "/vertical", element: <VerticalBar /> },
      { path: "/even_odd", element: <EvenOddResult /> },
      { path: "/stat720", element: <P_statistics /> },
      { path: "/myPage", element: <MyPage /> },
      { path: "/toto", element: <TotoMain /> },
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
