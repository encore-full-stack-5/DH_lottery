import P_MyWin720Result from "../../components/plus720/P_MyWin720Result";
import ResultSideBar from "../../components/sidebar/ResultSideBar";

const P_MyWin720 = () => {
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
          <P_MyWin720Result />
        </div>
      </div>
    </div>
  );
};

export default P_MyWin720;
