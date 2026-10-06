import { useEffect } from "react";
import { useLocation } from "react-router-dom";

let lastTrackedPath = "";
let lastTrackedAt = 0;

export default function VisitorTracker() {
  const location = useLocation();

  useEffect(() => {
    if (import.meta.env.MODE === "test" || location.pathname.startsWith("/admin")) return;
    const path = `${location.pathname}${location.search}`;
    const now = Date.now();
    if (path === lastTrackedPath && now - lastTrackedAt < 5000) return;
    lastTrackedPath = path;
    lastTrackedAt = now;

    void fetch("/api/track-visitor", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ path, referrer: document.referrer || null }),
      keepalive: true,
    }).then((response) => {
      if (!response.ok && import.meta.env.DEV) console.warn("Visitor tracking unavailable:", response.status);
    }).catch((error) => {
      if (import.meta.env.DEV) console.warn("Visitor tracking unavailable:", error);
    });
  }, [location.pathname, location.search]);

  return null;
}
