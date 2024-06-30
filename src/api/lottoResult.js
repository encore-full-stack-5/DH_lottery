import { api } from "../config/networkLotto";

export const getDrawByRound = async () => {
  const res = await api(`/api/v1/lotto/analytics`, "get");
  return res;
};

export const getVertical = async () => {
  const res = await api(`/api/v1/lotto/analytics/vertical`, "get");
  return res;
};

export const getHorizontal = async () => {
  const res = await api("/api/v1/lotto/analytics/horizontal", "get");
  return res;
};

export const getPie = async () => {
  const res = await api("/api/v1/lotto/analytics/pie", "get");
  return res;

};

export const getOddEven = async () => {
  const res = await api("/api/v1/lotto/analytics/odd_even", "get");
  return res;
};