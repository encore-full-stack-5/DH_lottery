import axios from "axios";

export const api = async (url, method, body) => {
  axios.defaults.baseURL = "http://34.173.193.169:31000";
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
