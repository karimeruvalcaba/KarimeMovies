import api from "../api";

export const getMovieDetails = async (movieId: number) => {
  const endpoint = `/movie/${movieId}?language=en-US`;
  const res = await api.get(endpoint);
  return res.data;
};
