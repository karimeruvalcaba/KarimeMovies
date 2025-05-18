"use client"
import { getRequestToken } from "@/services/movies/getRequestToken";

const LoginWithTMDbButton = () => {
    const handleLogin = async () =>{
        try{
            const token = await getRequestToken();
            window.location.href = `https://www.themoviedb.org/authenticate/${token}?redirect_to=http://localhost:3000/auth/callback`;
        }catch(err){
            console.error("Failed to get TMBb token", err);
        }
    };

    return (
        <button
            onClick={handleLogin}
            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
        >
            Login using TMDb
        </button>
    )
}
export default LoginWithTMDbButton;