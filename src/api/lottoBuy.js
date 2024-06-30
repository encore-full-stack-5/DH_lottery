export const purchase = async (data) => {
    await api("/api/v1/lotto/pay", "post", data);
};