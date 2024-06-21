import { api } from "../config/network";

export const getDrawByRound = async (round) => {
    const res = await api(`/api/v1/pension-win?round=${round}`, "get");
    return res;
};

export const getAll = async () => {
    const res = await api(`/api/v1/pension-win/all`, "get");
    return res;
}