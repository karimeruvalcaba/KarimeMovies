'use client';

import { Suspense, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import api from "@/services/api";

function CallbackHandler() {
  const params = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    const fetchSession = async () => {
      const request_token = params.get("request_token");
      if (!request_token) return;

      const res = await api.post("/authentication/session/new", {
        request_token,
      });

      const sessionId = res.data.session_id;
      localStorage.setItem("tmdb_session_id", sessionId);

      // Fetch account ID
      const accRes = await api.get(`/account?session_id=${sessionId}`);
      localStorage.setItem("tmdb_account_id", accRes.data.id);

      router.push("/my-favorites");
    };

    fetchSession();
  }, [params, router]);

  return <p className="p-6">Authorizing with TMDb...</p>;
}

export default function CallbackPage() {
  return (
    <Suspense fallback={<p className="p-6">Loading...</p>}>
      <CallbackHandler />
    </Suspense>
  );
}
