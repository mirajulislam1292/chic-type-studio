import { useEffect } from "react";

const SITE_URL = (import.meta.env.VITE_SITE_URL || window.location.origin).replace(/\/$/, "");

function ensureMeta(selector: string, attributes: Record<string, string>) {
  let element = document.head.querySelector<HTMLMetaElement>(selector);
  if (!element) {
    element = document.createElement("meta");
    document.head.appendChild(element);
  }
  Object.entries(attributes).forEach(([key, value]) => element!.setAttribute(key, value));
}

export function useSeo({ title, description, path = "/", type = "website", image, jsonLd }: {
  title: string;
  description: string;
  path?: string;
  type?: "website" | "article";
  image?: string | null;
  jsonLd?: Record<string, unknown>;
}) {
  useEffect(() => {
    document.title = title;
    const canonical = `${SITE_URL}${path}`;
    ensureMeta('meta[name="description"]', { name: "description", content: description });
    ensureMeta('meta[property="og:title"]', { property: "og:title", content: title });
    ensureMeta('meta[property="og:description"]', { property: "og:description", content: description });
    ensureMeta('meta[property="og:type"]', { property: "og:type", content: type });
    ensureMeta('meta[property="og:url"]', { property: "og:url", content: canonical });
    ensureMeta('meta[name="twitter:card"]', { name: "twitter:card", content: image ? "summary_large_image" : "summary" });
    if (image) {
      const absoluteImage = image.startsWith("http") ? image : `${SITE_URL}${image}`;
      ensureMeta('meta[property="og:image"]', { property: "og:image", content: absoluteImage });
      ensureMeta('meta[name="twitter:image"]', { name: "twitter:image", content: absoluteImage });
    } else {
      document.head.querySelector('meta[property="og:image"]')?.remove();
      document.head.querySelector('meta[name="twitter:image"]')?.remove();
    }
    let link = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!link) {
      link = document.createElement("link");
      link.rel = "canonical";
      document.head.appendChild(link);
    }
    link.href = canonical;
    const previous = document.getElementById("page-jsonld");
    previous?.remove();
    if (jsonLd) {
      const script = document.createElement("script");
      script.id = "page-jsonld";
      script.type = "application/ld+json";
      script.textContent = JSON.stringify(jsonLd).replace(/</g, "\\u003c");
      document.head.appendChild(script);
    }
  }, [description, image, jsonLd, path, title, type]);
}

export function readingTime(content: string) {
  return Math.max(1, Math.ceil(content.trim().split(/\s+/).length / 220));
}
