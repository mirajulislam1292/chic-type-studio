import { ArrowLeft, MessageCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Footer } from "@/components/Footer";
import { MessageForm } from "@/components/MessageForm";
import { Navbar } from "@/components/Navbar";
import { useSeo } from "@/lib/seo";

export default function AnonymousMessagePage() {
  useSeo({ title: "Anonymous message — M. Mahimmiraj", description: "Leave a private note for M. Mahimmiraj without sharing your name or email.", path: "/message" });
  return <div className="min-h-screen bg-[#050507] text-white"><Navbar /><main className="mx-auto max-w-3xl px-5 pb-24 pt-32 sm:px-6">
    <Link to="/#contact" className="mb-8 inline-flex items-center gap-2 text-sm text-zinc-500 transition hover:text-white"><ArrowLeft className="h-4 w-4" />Back to contact</Link>
    <header className="mb-10"><div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl border border-zinc-800 bg-zinc-900"><MessageCircle className="h-5 w-5 text-orange-400" /></div><p className="eyebrow mb-3 text-xs uppercase text-orange-400">Private inbox</p><h1 className="text-4xl font-bold sm:text-5xl">Leave an anonymous note</h1><p className="mt-5 max-w-2xl leading-relaxed text-zinc-400">Share an opinion, a thought, encouragement, criticism, or simply something you want me to read. You do not need to provide your name or email.</p></header>
    <MessageForm mode="anonymous" />
  </main><Footer /></div>;
}
