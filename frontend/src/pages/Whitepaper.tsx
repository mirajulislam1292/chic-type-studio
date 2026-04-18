import React from 'react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import Seo from '@/components/Seo';

export default function Whitepaper() {
  return (
    <div className="min-h-screen bg-background">
      <Seo title="TagWraps Whitepaper" description="Read the TagWraps whitepaper inline without downloading." />
      <Navbar />
      <main className="pt-24 pb-16">
        <div className="max-w-5xl mx-auto px-4">
          <h1 className="text-3xl font-bold mb-6">TagWraps Whitepaper</h1>
          <div className="w-full h-[80vh] border border-border rounded-lg overflow-hidden">
            <iframe
              src="/TagWraps_Whitepaper.pdf#toolbar=0&navpanes=0&scrollbar=0"
              title="TagWraps Whitepaper"
              className="w-full h-full"
            />
          </div>
          <p className="mt-4 text-sm text-muted-foreground">If the PDF doesn’t render, <a href="/TagWraps_Whitepaper.pdf" target="_blank" rel="noopener noreferrer" className="underline">open it directly</a>.</p>
        </div>
      </main>
      <Footer />
    </div>
  );
}
