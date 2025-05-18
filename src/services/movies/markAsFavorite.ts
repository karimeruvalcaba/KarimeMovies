// src/services/movies/markAsFavorite.ts
import { ac } from "vitest/dist/chunks/reporters.d.79o4mouw.js";
import api from "../api";

export const markAsFavorite = async (movieId: number, favorite: boolean) =>{

    const sessionId = localStorage.getItem("tmdb_session_id");
    const accountId = localStorage.getItem("tmdb_session_id");

    if (!sessionId || !accountId){
        throw new Error("TMBd session not found");
    }

    const res = await api.post(
        `/account/${accountId}/favorite?session_id=${sessionId}`,
        {
            media_type: "movie",
            media_id : movieId,
            favorite,
        }
    );
    return res.data;
}