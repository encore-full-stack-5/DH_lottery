import axios from "axios";

export const api = async (url, method, body) => {
  axios.defaults.baseURL = "http://localhost:8081";
  // const token = JSON.parse(localStorage.getItem("token"));
  
  const res = await axios({
    url,
    method,
    data: body,
    // headers: {
    //   Authorization: "Bearer " + token.token,
    // },
  });

  return res;
};

export const matchingApi = async (url, method, body) => {
  axios.defaults.baseURL = "http://localhost:8082";
  // const token = JSON.parse(localStorage.getItem("token"));
  
  const res = await axios({
    url,
    method,
    data: body,
    // headers: {
    //   Authorization: "Bearer " + token.token,
    // },
  });

  return res;
};