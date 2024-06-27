import { authApi } from "../config/networkAuth";

export const signUpRequest = async (data) => {
  const requestDto = {
    name: data.name,
    email: data.email,
    password: data.password,
    point: data.point,
    confirmationRequest: data.confirmationRequest,
  };

  const res = await authApi("users/signUp", "post", requestDto);
  return res;
};

export const loginRequest = async (data) => {
  const requestDto = {
    email: data.email,
    password: data.password,
  };

  const res = await authApi("users/login", "post", requestDto);
  console.log('Response headers:', res.headers); // 응답 헤더 로그 추가
  console.log('Response data:', res.data); // 응답 데이터 로그 추가

  // 응답 헤더에서 authorization 값 추출
  const token = res.headers['authorization'];

  if (token) {
    localStorage.setItem("Authorization", token);
    return "로그인성공";
  } else {
    throw new Error("Authorization token not found");
  }
};

export const mypageResponse = async () => {
  const res = await authApi("users/mypage", "get");
  return res;
};
