"use client";

import { useEffect, useState } from "react";
import { getPopularMovies } from "@/services/movies/getPopularMovies";
import { getNowPlayingMovies } from "@/services/movies/getNowPlayingMovies";
import { getTopRatedMovies } from "@/services/movies/getTopRatedMovies";
import MovieList from "@/components/MovieList/MovieList";

export default function HomePage() {
  const [popular, setPopular] = useState([]);
  const [nowPlaying, setNowPlaying] = useState([]);
  const [topRated, setTopRated] = useState([]);

  useEffect(() => {
    const fetchAll = async () => {
      const popularData = await getPopularMovies();
      const nowPlayingData = await getNowPlayingMovies();
      const topRatedData = await getTopRatedMovies();

      setPopular((popularData.results || []).slice(0, 5));
      setNowPlaying((nowPlayingData.results || []).slice(0, 5));
      setTopRated((topRatedData.results || []).slice(0, 5));
    };

    fetchAll();
  }, []);

  return (
    <div className="p-6 space-y-10">
      {/* ✅ Welcome message */}
      <section>
        <h1 className="text-3xl text-center font-bold mb-2">🥵Welcome to My Karimes' Movies Page 🥵</h1>
        <p className="text-gray-1200 max-w-2xxl text-center mx-auto">
          Hellooo! This is a simple web page where you can see popular movies, current playing ones and the gems accorfing to TMDb. 
          Click on the movie to see it's details, if you fancy it, add it to your faves! 
        </p>
        <p className="text-gray-1200 max-w-2xxl text-center mx-auto">
          Right now, you're only gonna see a fraction of the movies on the navbar categories, click on the name of these
          in the navbar to get the full experience.
        </p>
      </section>

      {/* ✅ Popular */}
      <section>
        <h2 className="text-2xl font-bold mb-4">🔥 Popular Movies</h2>
        <MovieList movies={popular} from="popular" />
      </section>

      {/* ✅ Now Playing */}
      <section>
        <h2 className="text-2xl font-bold mb-4">🎬 Now Playing</h2>
        <MovieList movies={nowPlaying} from="now-playing" />
      </section>

      {/* ✅ Top Rated */}
      <section>
        <h2 className="text-2xl font-bold mb-4">🌟 Top Rated</h2>
        <MovieList movies={topRated} from="top-rated" />
      </section>
    </div>
  );
}
