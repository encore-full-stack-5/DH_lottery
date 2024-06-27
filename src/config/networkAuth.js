import axios from "axios";

export const authApi = async (url, method, body) => {
  axios.defaults.baseURL = "http://192.168.0.20:3000";
  const token = localStorage.getItem("Authorization");

  const headers = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  };

  if (token) {
    headers['Authorization'] = token; // Bearer prefix is already included
  }

  try {
    const res = await axios({
      url,
      method,
      data: body,
      headers,
    });
    console.log('API response:', res); // API 응답 로그 추가
    return res;
  } catch (error) {
    console.error('API error:', error.response?.data); // 오류 로그 추가
    throw error;
  }
};
