import axios from "axios";

export const authApi = async (url, method, body) => {
  axios.defaults.baseURL = "http://192.168.0.20:3000/auth";
  const token = localStorage.getItem("Authorization");

  const headers = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  };

  if (token) {
    headers['Authorization'] = token; 
  }

  try {
    const res = await axios({
      url,
      method,
      data: body,
      headers,
    });
    console.log('API response:', res);
    return res;
  } catch (error) {
    console.error('API error:', error.response?.data);
    throw error;
  }
};
