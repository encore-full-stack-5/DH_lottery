import { api, matchingApi } from "../config/network2";

export const selectNum = async (data) => {
  console.log(data);
  const d = [...data];

  const selectItem = {
    round: d[0],
    group: d[1],
    first: d[2],
    second: d[3],
    third: d[4],
    fourth: d[5],
    fifth: d[6],
    sixth: d[7],
  };

  await api("/api/v1/pension/selected", "post", selectItem);
};

export const getSelectedTicket = async (data) => {
  const res = await api("/api/v1/pension/selected", "get", data);
  return res;
};

export const deleteSelectedTicket = async (selectedNumberId) => {
  await api("/api/v1/pension/selected/" + selectedNumberId, "delete");
};

export const purchase = async () => {
  await api("/api/v1/pension/purchased", "post");
};

export const getRound = async () => {
  const res = await api("/api/v1/pension/round", "get");
  return res;
};

export const getAllTickets = async () => {
  const res = await matchingApi("/api/v1/pension", "get");
  return res;
};
