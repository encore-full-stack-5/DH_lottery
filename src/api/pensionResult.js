import { api } from "../config/network";

export const getDrawByRound = async (round) => {
  const res = await api(`/api/v1/pension-win/round?round=${round}`, "get");
  return res;
};

export const getAll = async () => {
  const res = await api(`/api/v1/pension-win/all`, "get");
  return res;
};

export const getBonusByRound = async (round) => {
  const res = await api(`/api/v1/pension-bonus/round?round=${round}`, "get");
  return res;
};

export const getGroup = async () => {
  const res = await api("/api/v1/statistics/pension/groupNum", "get");
  return res;
};

export const getFirstFreq = async () => {
  const res = await api("/api/v1/statistics/pension/firstNum", "get");
  return res;
};

export const getSecondFreq = async () => {
  const res = await api("/api/v1/statistics/pension/secondNum", "get");
  return res;
};

export const getThirdFreq = async () => {
  const res = await api("/api/v1/statistics/pension/thirdNum", "get");
  return res;
};

export const getFourthFreq = async () => {
  const res = await api("/api/v1/statistics/pension/fourthNum", "get");
  return res;
};

export const getFifthFreq = async () => {
  const res = await api("/api/v1/statistics/pension/fifthNum", "get");
  return res;
};

export const getSixthFreq = async () => {
  const res = await api("/api/v1/statistics/pension/sixthNum", "get");
  return res;
};
