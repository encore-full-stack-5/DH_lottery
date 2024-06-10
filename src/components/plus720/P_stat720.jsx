import { useState } from "react";

const P_stat720 = () => {
  const [selectedOption, setSelectedOption] = useState("");
  const group = [
    { 번호: 1, 당첨횟수: 40 },
    { 번호: 2, 당첨횟수: 47 },
    { 번호: 3, 당첨횟수: 37 },
    { 번호: 4, 당첨횟수: 41 },
    { 번호: 5, 당첨횟수: 38 },
  ];

  const hundredThou = [
    { 번호: 1, 당첨횟수: 40 },
    { 번호: 2, 당첨횟수: 47 },
    { 번호: 3, 당첨횟수: 37 },
    { 번호: 4, 당첨횟수: 41 },
    { 번호: 5, 당첨횟수: 38 },
    { 번호: 6, 당첨횟수: 38 },
    { 번호: 7, 당첨횟수: 38 },
    { 번호: 8, 당첨횟수: 38 },
    { 번호: 9, 당첨횟수: 38 },
    { 번호: 0, 당첨횟수: 38 },
  ];

  const tenThou = [
    { 번호: 1, 당첨횟수: 40 },
    { 번호: 2, 당첨횟수: 47 },
    { 번호: 3, 당첨횟수: 37 },
    { 번호: 4, 당첨횟수: 41 },
    { 번호: 5, 당첨횟수: 38 },
    { 번호: 6, 당첨횟수: 38 },
    { 번호: 7, 당첨횟수: 38 },
    { 번호: 8, 당첨횟수: 38 },
    { 번호: 9, 당첨횟수: 38 },
    { 번호: 0, 당첨횟수: 38 },
  ];

  const handleRadioChange = (event) => {
    setSelectedOption(event.target.value);
  };

  return (
    <div style={{ marginTop: "70px" }}>
      <div>
        <div style={{ marginLeft: "20px" }}>
          <h2>연금복권720+ 당첨통계</h2>
        </div>
        <div style={{ padding: "20px", textAlign: "center" }}>
          <table style={{ borderCollapse: "collapse", width: "100%" }}>
            <tbody>
              <tr>
                <td style={headerStyle}>등위 선택</td>
                <td style={cellStyle}>
                  <div style={{ display: "flex" }}>
                    <input type="checkbox" style={checkboxStyle} />
                    <p>1등</p>
                    <input type="checkbox" style={checkboxStyle} />
                    <p>보너스</p>
                  </div>
                </td>
                <td style={headerStyle}>조회 구분</td>
                <td style={cellStyle}>
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <input
                      type="radio"
                      name="radioGroup"
                      value="회차 선택"
                      onChange={handleRadioChange}
                      style={radioStyle}
                    />
                    <p style={labelStyle}>회차 선택</p>
                    <input
                      type="radio"
                      name="radioGroup"
                      value="구간 선택"
                      onChange={handleRadioChange}
                      style={radioStyle}
                    />
                    <p style={labelStyle}>구간(기간) 선택</p>
                  </div>
                </td>
              </tr>
              <tr>
                <td style={headerStyle}>{selectedOption}</td>
                <td style={cellStyle} colSpan="3">
                  {selectedOption === "회차 선택" ? (
                    <div style={{ display: "flex" }}>
                      <select style={selectStyle}>
                        <option>1</option>
                        <option>2</option>
                        <option>3</option>
                      </select>
                      <p>~</p>
                      <select style={selectStyle}>
                        <option>1</option>
                        <option>2</option>
                        <option>3</option>
                      </select>
                    </div>
                  ) : selectedOption === "구간 선택" ? (
                    <>
                      <select style={selectStyle2}>
                        <option>최근 5주간</option>
                        <option>최근 10주간</option>
                        <option>최근 15주간</option>
                      </select>
                    </>
                  ) : null}
                </td>
              </tr>
            </tbody>
          </table>
          <button style={btnStyle}>조회</button>
        </div>
      </div>

      <div>
        <div style={{ padding: "20px" }}>
          <caption style={captionStyle}>(조 단위)</caption>
          <table
            style={{
              borderCollapse: "collapse",
              width: "100%",
              marginTop: "2px",
            }}
          >
            <thead>
              <tr>
                <th style={(headerStyle, { width: "15%" })}>번호</th>
                <th style={(headerStyle, { width: "60%" })}>그래프</th>
                <th style={(headerStyle, { width: "25%" })}>당첨횟수</th>
              </tr>
            </thead>
            <tbody>
              {group.map((item, index) => (
                <tr key={index}>
                  <td style={cellStyle2}>{item.번호}</td>
                  <td style={cellStyle}>
                    <div style={barContainerStyle}>
                      <div
                        style={{
                          ...groupBarStyle,
                          width: `${item.당첨횟수 * 10}%`,
                        }}
                      />
                    </div>
                  </td>
                  <td style={cellStyle2}>{item.당첨횟수}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div style={{ padding: "20px" }}>
          <caption style={captionStyle}>(십만 단위)</caption>
          <table
            style={{
              borderCollapse: "collapse",
              width: "100%",
              marginTop: "2px",
            }}
          >
            <thead>
              <tr>
                <th style={(headerStyle, { width: "15%" })}>번호</th>
                <th style={(headerStyle, { width: "60%" })}>그래프</th>
                <th style={(headerStyle, { width: "25%" })}>당첨횟수</th>
              </tr>
            </thead>
            <tbody>
              {hundredThou.map((item, index) => (
                <tr key={index}>
                  <td style={cellStyle2}>{item.번호}</td>
                  <td style={cellStyle}>
                    <div style={barContainerStyle}>
                      <div
                        style={{
                          ...hundredThouBarStyle,
                          width: `${item.당첨횟수 * 10}%`,
                        }}
                      />
                    </div>
                  </td>
                  <td style={cellStyle2}>{item.당첨횟수}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div style={{ padding: "20px" }}>
          <caption style={captionStyle}>(만 단위)</caption>
          <table
            style={{
              borderCollapse: "collapse",
              width: "100%",
              marginTop: "2px",
            }}
          >
            <thead>
              <tr>
                <th style={(headerStyle, { width: "15%" })}>번호</th>
                <th style={(headerStyle, { width: "60%" })}>그래프</th>
                <th style={(headerStyle, { width: "25%" })}>당첨횟수</th>
              </tr>
            </thead>
            <tbody>
              {tenThou.map((item, index) => (
                <tr key={index}>
                  <td style={cellStyle2}>{item.번호}</td>
                  <td style={cellStyle}>
                    <div style={barContainerStyle}>
                      <div
                        style={{
                          ...tenThouBarStyle,
                          width: `${item.당첨횟수 * 10}%`,
                        }}
                      />
                    </div>
                  </td>
                  <td style={cellStyle2}>{item.당첨횟수}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div style={{ marginBottom: "20px", marginLeft: "20px" }}>
        <p style={{ fontSize: "0.7rem", color: "#080808" }}>
          *연금복권 당첨번호는 (주)동행복권 공식홈페이지, ARS전화 등을 통해
          확인하실 수 있습니다.
        </p>
      </div>
    </div>
  );
};
const btnStyle = {
  padding: "6px 10px",
  backgroundColor: "#007bc3",
  color: "#fff",
};
const headerStyle = {
  border: "1px solid #ddd",
  padding: "8px",
  textAlign: "center",
  backgroundColor: "#f4f4f4",
};

const cellStyle = {
  border: "1px solid #ddd",
  padding: "8px",
  textAlign: "left",
};

const cellStyle2 = {
  border: "1px solid #ddd",
  padding: "8px",
  textAlign: "center",
};

const labelStyle = {
  marginRight: "8px",
};

const selectStyle = {
  width: "80px",
  padding: "4px",
  marginRight: "8px",
  marginLeft: "8px",
};

const selectStyle2 = {
  width: "120px",
  padding: "4px",
  marginRight: "8px",
  marginLeft: "8px",
};

const checkboxStyle = {
  marginLeft: "8px",
};

const radioStyle = {
  marginLeft: "8px",
  marginRight: "4px",
};

const barContainerStyle = {
  backgroundColor: "#f0f0f0",
  borderRadius: "5px",
  padding: "2px",
  display: "inline-block",
  width: "100px",
  height: "20px",
};

const groupBarStyle = {
  backgroundColor: "#4caf50",
  height: "100%",
  borderRadius: "5px",
};

const hundredThouBarStyle = {
  backgroundColor: "red",
  height: "100%",
  borderRadius: "5px",
};

const tenThouBarStyle = {
  backgroundColor: "skyblue",
  height: "100%",
  borderRadius: "5px",
};

const captionStyle = {
  captionSide: "top",
  textAlign: "left",
  fontWeight: "bold",
  width: "100px",
};

export default P_stat720;
