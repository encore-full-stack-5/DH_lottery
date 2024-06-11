import LottoAnalytics from "../../components/lotto-analytics/LottoAnalytics";
import ResultSideBar from "../../components/sidebar/ResultSideBar";

const LottoAnalyticsPage = () => {
  return (
    <>
      <div style={{ display: "flex" }}>
        <ResultSideBar />
        <LottoAnalytics />
      </div>
    </>
  );
};

export default LottoAnalyticsPage;
