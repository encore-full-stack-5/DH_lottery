import P_stat720 from "../../components/plus720/P_stat720";
import ResultSideBar from "../../components/sidebar/ResultSideBar";

const P_statistics = () => {
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
          <P_stat720 />
        </div>
      </div>
    </div>
  );
};

export default P_statistics;
