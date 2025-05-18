// src/app/movie/[id]/page.tsx

"use client";
import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "next/navigation";
import { getMovieById } from "@/services/movies/getMovieById";
import { getRecommendedMovies } from "@/services/movies/getRecommendedMovies";
import { IMovieDetail } from "@/types/MovieDetail";
import MovieList from "@/components/MovieList/MovieList";
import { markAsFavorite } from "@/services/movies/markAsFavorite";

const MovieDetailPage = () => {
    const { id } = useParams(); // id is a string | string[] | undefined
    const movieId = Number(id);
    
    const [movie, setMovie] = useState<IMovieDetail | null>(null);
    const [recommended, setRecommended] = useState<any[]>([]);
    const [isFavorite, setIsFavorite] = useState(false);
    const [isClient, setIsClient] = useState(false);

    const checkFavorite = () =>{
        const stored = localStorage.getItem("favorites");
        let favs: number[] = [];

        try{
            const parsed = JSON.parse(stored || "[]");
            favs = Array.isArray(parsed) ? parsed : [];
        } catch{
            favs = [];
        }

        setIsFavorite(favs.includes(movieId));
    };

    const toggleFavorite = async () => {
        const stored = localStorage.getItem("favorites");
        let favs : number[] = [];

        try{
            const parsed = JSON.parse(stored || "[]");
            favs = Array.isArray(parsed) ? parsed : [];
        } catch{
            favs = [];
        }

        const newIsFavorite = !favs.includes(movieId);

        if (newIsFavorite){
            favs.push(movieId);
        }else{
            favs = favs.filter((id) => id !== movieId);
        }

        localStorage.setItem("favorites", JSON.stringify(favs));
        setIsFavorite(newIsFavorite);

        //Sync only if logged in
        const sessionId = localStorage.getItem("tmdb_session_id");
        const accountId = localStorage.getItem("tmdb_account_id");

        if (!sessionId || !accountId){
            alert("Bro please sign in with TMDb to sync your favorites online. Go to the navbar and click login")
            console.warn("Skipped TMDb sync - use not authenticated.")
            return;
        }

        try{
            await markAsFavorite(movieId, newIsFavorite);
            console.log("✅ Synced with TMDb");
        }catch(err){
            console.error("❌ Failed to sync with TMDb", err);
        }
    };

    useEffect(() => {

        setIsClient(true);
        
        const fetchData = async () => {
            try {
                const moviedata = await getMovieById(String(movieId));
                const recommendedData = await getRecommendedMovies(movieId);
                setMovie(moviedata);

                // Only run this on the client
                if (typeof window !== "undefined"){                    
                    checkFavorite();
                }
                setRecommended(recommendedData);
                
            } catch (err) {
                console.error("Failed to load movie data: ", err);
            }
        };
        fetchData();
    }, [movieId]);

    if (!movie) return <p className="p-6">Loading...</p>;
    return (
        <div className="p-6 space-y-6">
            <div className="flex flex-col md:flex-row gap-6">
                <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
                className="w-full max-w-sm rounded shadow"
                />
                <div>
                    <h1 className="text-5xl font-bold">{movie.title}</h1>
                    <p className="mt-2 text-xl text-gray-600">{movie.overview}</p>
                    <p className="mt-2 text-xl"> Release Date: {movie.release_date.toString()}</p>
                    <p className="text-xl"> Rating: {movie.vote_average} </p>
                    <p className="text-xl">Genres: {movie.genres.map(g => g.name).join(", ")}</p>
                    <button 
                        onClick={toggleFavorite}
                        className={`mt-4 px-4 py-2 rounded text-white ${
                            isFavorite ? "bg-red-600" : "bg-gray-600"
                        }`}
                    >
                        {isFavorite ? "★ Remove from Favorites" : "☆ Add to Favorites"}
                    </button>
                </div>
            </div>

            {recommended.length > 0 && (
                <div>
                    <h2 className="text-2xl font-semibold mb-4">Recommended Movies</h2>
                    <MovieList movies={recommended} from="recommended"/>
                </div>
            )}
        </div>
        );
    };
export default MovieDetailPage;