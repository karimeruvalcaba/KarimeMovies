// src/app/login/page.tsx
"use client"
import { useEffect, useState } from "react";
import LoginWithTMDbButton from "@/components/LoginWithTMDbButton/LoginWithTMDbButton";

const LoginPage = () => {

    const[isLoggedIn, setIsLoggedIn] = useState(false);
    const[isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
        const session = localStorage.getItem("tmdb_session_id")
        if (session) setIsLoggedIn(true);
    }, []);

    if (!isClient) return null;
    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">
                {isLoggedIn
                    ? "Bro, you're logged in, don't worry about a thing"
                    :"Please log into your account to manage your favorites"}
            </h1>
            {!isLoggedIn && <LoginWithTMDbButton/>}
        </div>
    );
};

export default LoginPage;