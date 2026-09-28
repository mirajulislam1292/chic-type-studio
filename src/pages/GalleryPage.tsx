import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { listRecords } from "@/lib/contentRepository";
import { useSeo } from "@/lib/seo";
import type { GalleryItem } from "@/lib/types";

const BATCH = 12;

export default function GalleryPage() {
  const [images, setImages] = useState<GalleryItem[]>([]);
  const [count, setCount] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [visibleCount, setVisibleCount] = useState(BATCH);
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);
  const triggerRef = useRef<HTMLDivElement | null>(null);
  useSeo({ title: "Gallery — M. Mahimmiraj", description: "A visual archive of engineering, robotics, volunteering and life moments.", path: "/gallery" });

  useEffect(() => {
    let active = true;
    setLoading(true);
    listRecords<GalleryItem>("gallery_items", { publishedOnly: true, page, pageSize: 24 }).then((result) => {
      if (!active) return;
      if (result.error) throw result.error;
      setImages((current) => page === 1 ? result.data : [...current, ...result.data.filter((item) => !current.some((existing) => existing.id === item.id))]);
      setCount(result.count);
      setError(null);
    }).catch((caught) => active && setError(caught instanceof Error ? caught.message : "Unable to load gallery.")).finally(() => active && setLoading(false));
    return () => { active = false; };
  }, [page]);

  useEffect(() => {
    if ((visibleCount >= images.length && images.length >= count) || !triggerRef.current) return;
    const observer = new IntersectionObserver((entries) => {
      if (!entries[0]?.isIntersecting || loading) return;
      if (visibleCount < images.length) setVisibleCount((value) => Math.min(value + BATCH, images.length));
      else if (images.length < count) setPage((value) => value + 1);
    }, { rootMargin: "300px" });
    observer.observe(triggerRef.current);
    return () => observer.disconnect();
  }, [count, images.length, loading, visibleCount]);

  const close = useCallback(() => setSelectedIdx(null), []);
  useEffect(() => {
    const handleKey = (event: KeyboardEvent) => {
      if (selectedIdx === null) return;
      if (event.key === "Escape") close();
      if (event.key === "ArrowRight") setSelectedIdx((selectedIdx + 1) % images.length);
      if (event.key === "ArrowLeft") setSelectedIdx((selectedIdx - 1 + images.length) % images.length);
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [close, images.length, selectedIdx]);

  return <div className="min-h-screen bg-[#050507] text-white"><Navbar /><main className="mx-auto max-w-7xl px-4 pb-24 pt-32 sm:px-6"><header className="mb-12"><p className="eyebrow mb-3 text-xs uppercase text-orange-400">Visual archive</p><h1 className="text-4xl font-bold sm:text-6xl">Gallery</h1><p className="mt-4 text-zinc-400">Projects, field work, community and the moments between.</p></header>
    {loading && <p className="text-zinc-500">Loading gallery…</p>}{error && <p role="alert" className="text-red-400">{error}</p>}{!loading && !images.length && <p className="rounded-xl border border-zinc-800 p-10 text-zinc-400">The gallery is being curated.</p>}
    <div className="columns-1 gap-4 sm:columns-2 lg:columns-3 xl:columns-4">{images.slice(0, visibleCount).map((image, index) => <button key={image.id} onClick={() => setSelectedIdx(index)} className="group mb-4 block w-full break-inside-avoid overflow-hidden rounded-xl border border-zinc-800 bg-zinc-950 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500" aria-label={`Open ${image.alt_text}`}><img src={image.thumbnail_url || image.image_url} alt={image.alt_text} loading="lazy" decoding="async" className="h-auto w-full transition duration-500 group-hover:scale-[1.02]" />{(image.title || image.caption) && <span className="block p-4"><strong className="block text-sm">{image.title}</strong><span className="mt-1 block text-xs text-zinc-500">{image.caption}</span></span>}</button>)}</div>
    {(visibleCount < images.length || images.length < count) && <div ref={triggerRef} className="py-10 text-center text-xs font-mono text-zinc-500">Loading more…</div>}
  </main>
  {selectedIdx !== null && images[selectedIdx] && <div role="dialog" aria-modal="true" aria-label="Gallery image viewer" className="fixed inset-0 z-[70] flex items-center justify-center bg-black/95 p-4 backdrop-blur" onClick={close}><button onClick={close} className="absolute right-4 top-4 rounded-full border border-zinc-700 bg-zinc-900 p-3" aria-label="Close image"><X className="h-5 w-5" /></button><button onClick={(event) => { event.stopPropagation(); setSelectedIdx((selectedIdx - 1 + images.length) % images.length); }} className="absolute left-3 top-1/2 rounded-full border border-zinc-700 bg-zinc-900/90 p-3" aria-label="Previous image"><ChevronLeft /></button><img onClick={(event) => event.stopPropagation()} src={images[selectedIdx].image_url} alt={images[selectedIdx].alt_text} className="max-h-[88vh] max-w-[90vw] rounded-xl object-contain" /><button onClick={(event) => { event.stopPropagation(); setSelectedIdx((selectedIdx + 1) % images.length); }} className="absolute right-3 top-1/2 rounded-full border border-zinc-700 bg-zinc-900/90 p-3" aria-label="Next image"><ChevronRight /></button></div>}
  <Footer /></div>;
}
