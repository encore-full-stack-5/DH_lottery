import { useEffect, useState } from "react";
import {
  getFifthFreq,
  getFirstFreq,
  getFourthFreq,
  getGroup,
  getSecondFreq,
  getSixthFreq,
  getThirdFreq,
} from "../../api/pensionResult";

const P_stat720 = () => {
  const [selectedOption, setSelectedOption] = useState("");
  const [groupNumFrequency, setgroupNumFrequency] = useState([]);
  const [firstNumFrequency, setFirstNumFrequency] = useState([]);
  const [secondNumFrequency, setSecondNumFrequency] = useState([]);
  const [thirdNumFrequncy, setThirdNumFrequency] = useState([]);
  const [fourthNumFrequency, setFourthNumFrequency] = useState([]);
  const [fifthNumFrequency, setFifthNumFrequency] = useState([]);
  const [sixthNumFrequncy, setSixthNumFrequency] = useState([]);

  const group = groupNumFrequency.map((item, index) => ({
    번호: item.number,
    당첨횟수: item.frequency,
  }));

  const first = firstNumFrequency.map((item, index) => ({
    번호: item.number,
    당첨횟수: item.frequency,
  }));

  const second = secondNumFrequency.map((item, index) => ({
    번호: item.number,
    당첨횟수: item.frequency,
  }));
  const third = thirdNumFrequncy.map((item, index) => ({
    번호: item.number,
    당첨횟수: item.frequency,
  }));
  const fourth = fourthNumFrequency.map((item, index) => ({
    번호: item.number,
    당첨횟수: item.frequency,
  }));

  const fifth = fifthNumFrequency.map((item, index) => ({
    번호: item.number,
    당첨횟수: item.frequency,
  }));
  const sixth = sixthNumFrequncy.map((item, index) => ({
    번호: item.number,
    당첨횟수: item.frequency,
  }));

  useEffect(() => {
    getGroupFreq();
    getFirstFreqData();
    getSecondFreqData();
    getThirdFreqData();
    getFourthFreqData();
    getFifthFreqData();
    getSixthFreqData();
  }, []);

  const getFirstFreqData = async () => {
    try {
      const res = await getFirstFreq();
      setFirstNumFrequency(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  const getGroupFreq = async () => {
    try {
      const res = await getGroup();
      console.log(res.data[0]);
      setgroupNumFrequency(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getSecondFreqData = async () => {
    try {
      const res = await getSecondFreq();
      setSecondNumFrequency(res.data); // Assuming you have a state setter for secondNumFrequency
    } catch (error) {
      console.log(error);
    }
  };

  const getThirdFreqData = async () => {
    try {
      const res = await getThirdFreq();
      setThirdNumFrequency(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getFourthFreqData = async () => {
    try {
      const res = await getFourthFreq();
      setFourthNumFrequency(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getFifthFreqData = async () => {
    try {
      const res = await getFifthFreq();
      setFifthNumFrequency(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getSixthFreqData = async () => {
    try {
      const res = await getSixthFreq();
      setSixthNumFrequency(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleRadioChange = (event) => {
    setSelectedOption(event.target.value);
  };

  return (
    <div style={{ marginTop: "70px" }}>
      <div>
        <div style={{ marginLeft: "20px" }}>
          <h2>연금복권720+ 당첨통계</h2>
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
                          width: `${item.당첨횟수 * 3}%`,
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
              {first.map((item, index) => (
                <tr key={index}>
                  <td style={cellStyle2}>{item.번호}</td>
                  <td style={cellStyle}>
                    <div style={barContainerStyle}>
                      <div
                        style={{
                          ...hundredThouBarStyle,
                          width: `${item.당첨횟수 * 5}%`,
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
              {second.map((item, index) => (
                <tr key={index}>
                  <td style={cellStyle2}>{item.번호}</td>
                  <td style={cellStyle}>
                    <div style={barContainerStyle}>
                      <div
                        style={{
                          ...tenThouBarStyle,
                          width: `${item.당첨횟수 * 5}%`,
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
          <caption style={captionStyle}>(천 단위)</caption>
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
              {third.map((item, index) => (
                <tr key={index}>
                  <td style={cellStyle2}>{item.번호}</td>
                  <td style={cellStyle}>
                    <div style={barContainerStyle}>
                      <div
                        style={{
                          ...ThouBarStyle,
                          width: `${item.당첨횟수 * 5}%`,
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
          <caption style={captionStyle}>(백 단위)</caption>
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
              {fourth.map((item, index) => (
                <tr key={index}>
                  <td style={cellStyle2}>{item.번호}</td>
                  <td style={cellStyle}>
                    <div style={barContainerStyle}>
                      <div
                        style={{
                          ...hundBarStyle,
                          width: `${item.당첨횟수 * 5}%`,
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
          <caption style={captionStyle}>(십 단위)</caption>
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
              {fifth.map((item, index) => (
                <tr key={index}>
                  <td style={cellStyle2}>{item.번호}</td>
                  <td style={cellStyle}>
                    <div style={barContainerStyle}>
                      <div
                        style={{
                          ...tenBarStyle,
                          width: `${item.당첨횟수 * 5}%`,
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
          <caption style={captionStyle}>(일 단위)</caption>
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
              {sixth.map((item, index) => (
                <tr key={index}>
                  <td style={cellStyle2}>{item.번호}</td>
                  <td style={cellStyle}>
                    <div style={barContainerStyle}>
                      <div
                        style={{
                          ...oneBarStyle,
                          width: `${item.당첨횟수 * 5}%`,
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
  width: "100%",
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
  backgroundColor: "orange",
  height: "100%",
  borderRadius: "5px",
};

const ThouBarStyle = {
  backgroundColor: "yellow",
  height: "100%",
  borderRadius: "5px",
};

const hundBarStyle = {
  backgroundColor: "green",
  height: "100%",
  borderRadius: "5px",
};
const tenBarStyle = {
  backgroundColor: "blue",
  height: "100%",
  borderRadius: "5px",
};
const oneBarStyle = {
  backgroundColor: "purple",
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
