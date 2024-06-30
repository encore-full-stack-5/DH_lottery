import axios from "axios";

export const api = async (url, method, body) => {
    axios.defaults.baseURL = "http://34.136.172.224:30002";
    
    const headers = {
        "Content-Type": "application/json",
        Accept: "application/json",
      };

    const res = await axios({
      url,
      method,
      data: body,
      headers: headers
    });
  
    return res;
};
  