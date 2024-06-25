import PensionHistory from "../../components/plus720/PensionHistory";
import ResultSideBar from "../../components/sidebar/ResultSideBar";

const P_PensionHistory = () => {
  return (
    <div
      style={{
        marginRight: "100px",
        margintLeft: "100px",
      }}
    >
      <div style={{ display: "flex" }}>
        <div style={{ flex: "1" }}>
          <ResultSideBar />
        </div>
        <div style={{ flex: "2" }}>
          <PensionHistory />
        </div>
      </div>
    </div>
  );
};

export default P_PensionHistory;
