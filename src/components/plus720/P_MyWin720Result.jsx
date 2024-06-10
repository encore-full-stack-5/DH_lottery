const P_MyWin720Result = () => {
  const rowData = Array(6).fill({ input1: "", input2: "", input3: "" });

  return (
    <div
      style={{
        // width: "100%",
        marginTop: "70px",
        marginLeft: "20px",
        marginRight: "160px",
      }}
    >
      <div>
        <h2>내번호 당첨확인</h2>
        <br />
        <div
          style={{
            display: "flex",
          }}
        >
          <p>
            <b>· 회차별 당첨 확인</b>
          </p>

          <p
            style={{
              fontSize: "0.7rem",
              marginLeft: "10px",
              alignContent: "center",
            }}
          >
            번호를 입력하시면 선택 회차와 비교하여 결과를 바로 알 수 있습니다.
          </p>
        </div>
      </div>
      <hr style={{ marginTop: "5px", marginBottom: "5px" }} />
      <div>
        <div style={{ display: "flex" }}>
          <select
            name="Round"
            id="Round"
            title="회차 선택"
            style={{ width: "4rem" }}
          >
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
          </select>
          <p
            style={{
              fontSize: "0.8rem",
              marginLeft: "15px",
              alignContent: "center",
            }}
          >
            지급개시일로부터 1년 이내의 당첨번호 조회만 가능합니다.
          </p>
        </div>

        <div style={{ padding: "0px 10px", textAlign: "center" }}>
          <table style={{ borderCollapse: "collapse", width: "100%" }}>
            <thead>
              <tr>
                <th style={headerStyle}>번호</th>
                <th style={headerStyle}>확인</th>
                <th style={headerStyle}>입력조/번호</th>
                <th style={headerStyle}>등수</th>
              </tr>
            </thead>
            <tbody>
              {rowData.map((_, index) => (
                <tr key={index}>
                  <td style={cellStyle}>
                    <input type="text" style={inputStyle} />
                    <span style={{ margin: "0 5px" }}>조</span>
                    <input type="text" style={inputStyle} />
                    <input type="text" style={inputStyle} />
                    <input type="text" style={inputStyle} />
                    <input type="text" style={inputStyle} />
                    <input type="text" style={inputStyle} />
                    <input type="text" style={inputStyle} />
                  </td>
                  <td style={cellStyle}>
                    <button style={buttonStyle}>결과확인</button>
                  </td>
                  <td style={cellStyle}></td>
                  <td style={cellStyle}></td>
                </tr>
              ))}
            </tbody>
          </table>
          <button style={{ padding: "4px 8px" }}>초기화</button>
        </div>
      </div>
      <br />
      <div>
        <div>
          <p style={{ fontSize: "1.1rem" }}>
            <b>· 연금복권720+ 2등 확인방법</b>
          </p>
        </div>
        <hr style={{ marginTop: "5px", marginBottom: "5px" }} />
        <div>
          <p style={{ fontSize: "0.7rem", color: "gray" }}>
            - 연금복권720+의 2등 당첨번호는 1등과 조만 다른번호로 1등 당첨번호가
            3조 123456일 경우, 2등 당첨번호는 조가 다른 1조 123456, 2조 123456,
            4조 123456, 5조 123456번 입니다.
          </p>
        </div>
      </div>
    </div>
  );
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
  textAlign: "center",
};

const inputStyle = {
  width: "25px",
  padding: "4px",
  marginRight: "1px",
  marginLeft: "1px",
};

const buttonStyle = {
  padding: "4px 8px",
  backgroundColor: "#007bc3",
  color: "#fff",
  cursor: "pointer",
};

export default P_MyWin720Result;
