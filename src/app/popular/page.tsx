'use client';

import React, { useEffect, useState } from "react";
import { getPopularMovies } from "@/services/movies/getPopularMovies";
import MovieList from "@/components/MovieList/MovieList";

const PopularClientPage = () => {
  const [loading, setLoading] = useState(false);
  const [movies, setMovies] = useState<any[]>([]);

  useEffect(() => {
    const fetchPopularMovies = async () => {
      setLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 2000));
      try {
        const data = await getPopularMovies();
        setMovies(data.results);
      } catch (err) {
        console.error("Error loading movies: ", err);
      }
      setLoading(false);
    };

    fetchPopularMovies();
  }, []);

  return (
    <div className="p-6">
      <h3 className="text-3xl font-bold mb-6">Popular Movies</h3>
      {loading ? (
        <h5 className="text-lg text-gray-500">Cargando...</h5>
      ) : (
        <MovieList movies={movies} from="popular" />
      )}
    </div>
  );
};

export default PopularClientPage;
