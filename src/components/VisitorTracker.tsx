import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { supabase } from "@/lib/supabase";

let lastTrackedPath = "";
let lastTrackedAt = 0;

export default function VisitorTracker() {
  const location = useLocation();

  useEffect(() => {
    if (import.meta.env.MODE === "test" || !supabase || location.pathname.startsWith("/admin")) return;
    const path = `${location.pathname}${location.search}`;
    const now = Date.now();
    if (path === lastTrackedPath && now - lastTrackedAt < 5000) return;
    lastTrackedPath = path;
    lastTrackedAt = now;

    void supabase.functions.invoke("track-visitor", {
      body: { path, referrer: document.referrer || null },
    }).then(({ error }) => {
      if (error && import.meta.env.DEV) console.warn("Visitor tracking unavailable:", error.message);
    });
  }, [location.pathname, location.search]);

  return null;
}
