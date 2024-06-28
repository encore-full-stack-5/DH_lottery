import { authApi } from '../config/networkAuth';

export const signUpRequest = async (data) => {
  const requestDto = {
    name: data.name,
    email: data.email,
    password: data.password,
    point: data.point,
    confirmationRequest: data.confirmationRequest,
  };

  try {
    const res = await authApi('/signUp', 'post', requestDto);
    return res.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const certification = async (data) => {
  try {
    const response = await authApi('/certification', 'post', data);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const emailCertification = async (data) => {
  try {
    const response = await authApi('/certification/request', 'post', data);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const loginRequest = async (data) => {
  const requestDto = {
    email: data.email,
    password: data.password,
  };
  
  try {
    const res = await authApi('/login', 'post', requestDto);
    const token = res.headers['authorization'];

    if (token) {
      localStorage.setItem("Authorization", token);
      return "로그인성공";
    } else {
      throw new Error("Authorization token not found");
    }
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const mypageResponse = async () => {
  try {
    const res = await authApi('/mypage', 'get', null);
    return res.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};