import api from "../api";

export const getRecommendedMovies = async (movieId: number) => {
  const endpoint = `/movie/${movieId}/recommendations?language=en-US`;
  const res = await api.get(endpoint);
  return res.data.results;
};
