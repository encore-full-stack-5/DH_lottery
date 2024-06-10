import React from "react";
import ResultSideBar from "../../components/sidebar/ResultSideBar";
import "../../css/LottoResultPage.css";
import LottoHistory from "../../components/lotto-history/LottoHistory";

export const LottoHistoryPage = () => {
  return (
    <>
      <main style={{ display: "flex" }}>
        <ResultSideBar />
        <LottoHistory />
      </main>
    </>
  );
};
