import React from "react";
import LottoResult from "../../components/lotto-result/LottoResult";
import ResultSideBar from "../../components/sidebar/ResultSideBar";
import "../../css/LottoResultPage.css";

export const LottoResultPage = () => {
  return (
    <>
      <main style={{ display: "flex" }}>
        <ResultSideBar />
        <LottoResult />
      </main>
    </>
  );
};
