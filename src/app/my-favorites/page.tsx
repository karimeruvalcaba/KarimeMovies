"use client"
import React, {useEffect, useState} from "react";
import { getMovieById } from "@/services/movies/getMovieById";
import MovieList from "@/components/MovieList/MovieList";

const MyFavoritiesPage = () => {
    const [favoriteMovies, setFavoriteMovies] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchFavorities = async () =>{
            const stored = localStorage.getItem("favorites");
            let favIds: number[] = [];

            try{
                const parsed = JSON.parse(stored || "[]");
                favIds = Array.isArray(parsed) ? parsed: [];
            }catch{
                favIds = [];
            }

            const moviePromises = favIds.map((id) => getMovieById(String(id)));
            const movies = await Promise.all(moviePromises);
            setFavoriteMovies(movies);
            setLoading(false);
        };

        fetchFavorities();
    }, []);

    return (
        <div className="p-6">
            <h1 className="text-3xl font-bold mb-4">My favorite Movies</h1>

            {loading ? (
                <p> Loading favorities...</p>
            ): favoriteMovies.length === 0 ? (
                <p> Bro, you got no favorites yet🤧</p>
            ):(
                <MovieList movies={favoriteMovies} from="favorites"/>
            )}
        </div>
    );  
};
export default MyFavoritiesPage