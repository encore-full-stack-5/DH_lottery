import axios from "axios";

export const api = async (url, method, body) => {
  axios.defaults.baseURL = "http://localhost:8081";
  const token = localStorage.getItem("Authorization");

  const headers = {
    "Content-Type": "application/json",
    Accept: "application/json",
  };

  if (token) {
    headers["Authorization"] = token; // Bearer prefix is already included
  }

  try {
    const res = await axios({
      url,
      method,
      data: body,
      headers,
    });
    return res;
  } catch (error) {
    console.error("API error:", error.response?.data); // 오류 로그 추가
    throw error;
  }
};

export const matchingApi = async (url, method, body) => {
  axios.defaults.baseURL = "http://localhost:8082";
  const token = localStorage.getItem("Authorization");

  const headers = {
    "Content-Type": "application/json",
    Accept: "application/json",
  };

  if (token) {
    headers["Authorization"] = token; // Bearer prefix is already included
  }

  try {
    const res = await axios({
      url,
      method,
      data: body,
      headers,
    });
    console.log("API response:", res); // API 응답 로그 추가
    return res;
  } catch (error) {
    console.error("API error:", error.response?.data); // 오류 로그 추가
    throw error;
  }
};
