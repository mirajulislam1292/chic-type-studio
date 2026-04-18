import React, { useEffect, useRef } from 'react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import Seo from '@/components/Seo';

export default function Whitepaper() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const url = '/TagWraps_Whitepaper.pdf';

  useEffect(() => {
    let cancelled = false;

    // load pdfjs from CDN if not present
    const loadScript = (src: string) =>
      new Promise<void>((resolve, reject) => {
        if ((window as any).pdfjsLib) return resolve();
        const s = document.createElement('script');
        s.src = src;
        s.async = true;
        s.onload = () => resolve();
        s.onerror = reject;
        document.head.appendChild(s);
      });

    async function renderPdf() {
      try {
        await loadScript('https://unpkg.com/pdfjs-dist/build/pdf.min.js');
        const pdfjsLib = (window as any).pdfjsLib;
        pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://unpkg.com/pdfjs-dist/build/pdf.worker.min.js';

        const loadingTask = pdfjsLib.getDocument(url);
        const pdf = await loadingTask.promise;
        const container = containerRef.current;
        if (!container || cancelled) return;
        container.innerHTML = '';

        for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
          const page = await pdf.getPage(pageNum);
          const viewport = page.getViewport({ scale: 1.25 });
          const canvas = document.createElement('canvas');
          const context = canvas.getContext('2d');
          canvas.width = Math.floor(viewport.width);
          canvas.height = Math.floor(viewport.height);
          canvas.style.width = '100%';
          canvas.style.height = 'auto';
          const renderContext = {
            canvasContext: context,
            viewport: viewport,
          };
          const wrapper = document.createElement('div');
          wrapper.className = 'mb-6';
          wrapper.appendChild(canvas);
          container.appendChild(wrapper);
          await page.render(renderContext).promise;
        }
      } catch (err) {
        console.error('PDF render error', err);
        if (containerRef.current) {
          containerRef.current.innerHTML = `<p class="text-sm text-muted-foreground">PDF could not be rendered. <a href="${url}" target="_blank" rel="noopener noreferrer" class="underline">Open the whitepaper</a></p>`;
        }
      }
    }

    renderPdf();

    // disable context menu & common save/print shortcuts on the whitepaper container
    const onContext = (e: MouseEvent) => e.preventDefault();
    const onKey = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && (e.key === 's' || e.key === 'p')) {
        e.preventDefault();
      }
    };

    const el = containerRef.current;
    if (el) el.addEventListener('contextmenu', onContext);
    window.addEventListener('keydown', onKey);

    return () => {
      cancelled = true;
      if (el) el.removeEventListener('contextmenu', onContext);
      window.removeEventListener('keydown', onKey);
    };
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Seo title="TagWraps Whitepaper" description="Read the TagWraps whitepaper inline without downloading." />
      <Navbar />
      <main className="pt-24 pb-16">
        <div className="max-w-5xl mx-auto px-4">
          <h1 className="text-3xl font-bold mb-6">TagWraps Whitepaper</h1>
          <div className="w-full h-[80vh] border border-border rounded-lg overflow-auto p-4" ref={containerRef} aria-label="Whitepaper viewer">
            <p className="text-sm text-muted-foreground">Loading whitepaper...</p>
          </div>
          <p className="mt-4 text-sm text-muted-foreground">If the PDF doesn’t render, <a href="/TagWraps_Whitepaper.pdf" target="_blank" rel="noopener noreferrer" className="underline">open it directly</a>.</p>
        </div>
      </main>
      <Footer />
    </div>
  );
}
