import axios from 'axios';

const BASE_URL = 'http://localhost:3000'; // Adjust the base URL if necessary

export const signUpRequest = async (data) => {
  const requestDto = {
    name: data.name,
    email: data.email,
    password: data.password,
    point: data.point,
    confirmationRequest: data.confirmationRequest,
  };

  const res = await axios.post(`${BASE_URL}/users/signUp`, requestDto);
  return res.data;
};

export const certification = async (data) => {
  const response = await axios.post(`${BASE_URL}/users/certification`, data, {
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  });
  return response.data;
};

export const loginRequest = async (data) => {
  const requestDto = {
    email: data.email,
    password: data.password,
  };
  const res = await axios.post(`${BASE_URL}/users/login`, requestDto);
  const token = res.headers['authorization'];

  if (token) {
    localStorage.setItem("Authorization", token);
    return "로그인성공";
  } else {
    throw new Error("Authorization token not found");
  }
};

export const mypageResponse = async () => {
  const res = await axios.get(`${BASE_URL}/users/mypage`);
  return res.data;
};