"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

const LogoutPage = () => {
  const router = useRouter();

  useEffect(() => {
    // Clear session-related info
    localStorage.removeItem("tmdb_session_id");
    localStorage.removeItem("tmdb_account_id");

    // Optionally clear local favorites too
    // localStorage.removeItem("favorites");

    // Redirect to home or login page
    router.push("/");
  }, [router]);

  return <p className="p-6">Logging you out... 👋</p>;
};

export default LogoutPage;
