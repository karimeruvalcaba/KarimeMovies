// src/services/auth/getRequestToken.ts
import api from "../api";

export const getRequestToken = async () => {
    const res = await api.get("/authentication/token/new");
    return res.data.request_token;
};