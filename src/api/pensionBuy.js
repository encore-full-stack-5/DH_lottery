import { api } from "../config/network";

export const selectNum = async (data) => {
  console.log(data);
  const d = ["abcd", 1, ...data];

  const selectItem = {
    userId: d[0], // userId가 없으므로 null로 설정
    round: d[1],
    group: d[2],
    first: d[3],
    second: d[4],
    third: d[5],
    fourth: d[6],
    fifth: d[7],
    sixth: d[8],
  };

  await api("/api/v1/pension/selection", "post", selectItem);
};

export const getSelectedTicket = async (userId) => {
  const res = await api("/api/v1/pension/selected?userId=" + userId, "get");
  return res;
};
