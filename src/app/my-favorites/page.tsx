'use client';
import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { getMovieById } from "@/services/movies/getMovieById";
import MovieList from "@/components/MovieList/MovieList";

const MyFavoritesPage = () => {
  const router = useRouter();
  const hasChecked = useRef(false); // ✅ Only runs once
  const [favoriteMovies, setFavoriteMovies] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (hasChecked.current) return; // Prevent running twice
    hasChecked.current = true;

    const session = localStorage.getItem("tmdb_session_id");
    if (!session) {
      alert("Bro, you must be logged in to see your favorites!");
      router.push("/login");
      return;
    }

    const fetchFavorites = async () => {
      const stored = localStorage.getItem("favorites");
      let favIds: number[] = [];

      try {
        const parsed = JSON.parse(stored || "[]");
        favIds = Array.isArray(parsed) ? parsed : [];
      } catch {
        favIds = [];
      }

      const moviePromises = favIds.map((id) => getMovieById(String(id)));
      const movies = await Promise.all(moviePromises);
      setFavoriteMovies(movies);
      setLoading(false);
    };

    fetchFavorites();
  }, [router]);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">My Favorite Movies</h1>
      {loading ? (
        <p>Loading favorites...</p>
      ) : favoriteMovies.length === 0 ? (
        <p>Bro, you got no favorites yet 🤧</p>
      ) : (
        <MovieList movies={favoriteMovies} from="favorites" />
      )}
    </div>
  );
};

export default MyFavoritesPage;
