import { BarChart3, ExternalLink, LogOut, Menu, Settings, X } from "lucide-react";
import { useState } from "react";
import { Link, NavLink, Navigate, Outlet } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { sectionOrder, sections } from "./config";

export default function AdminLayout() {
  const { loading, isAdmin, signOut } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  if (loading) return <div className="grid min-h-screen place-items-center bg-[#050507] text-zinc-400">Checking session…</div>;
  if (!isAdmin) return <Navigate to="/admin/login" replace />;
  const items = [{ to: "/admin", label: "Dashboard", icon: BarChart3 }, ...sectionOrder.map((key) => ({ to: `/admin/${key}`, label: sections[key].label, icon: null })), { to: "/admin/settings", label: "Site Settings", icon: Settings }];
  return <div className="min-h-screen bg-[#050507] text-white"><header className="sticky top-0 z-50 border-b border-zinc-800 bg-[#070709]/95 px-4 py-3 backdrop-blur lg:hidden"><div className="flex items-center justify-between"><div><p className="text-sm font-semibold">Portfolio CMS</p><p className="text-[11px] font-mono text-zinc-500">M. Mahimmiraj</p></div><button onClick={() => setMenuOpen(!menuOpen)} className="touch-button" aria-label="Toggle admin navigation">{menuOpen ? <X /> : <Menu />}</button></div>{menuOpen && <nav className="mt-4 grid grid-cols-2 gap-2 pb-2">{items.map((item) => <NavLink key={item.to} end={item.to === "/admin"} to={item.to} onClick={() => setMenuOpen(false)} className={({ isActive }) => `rounded-lg border px-3 py-3 text-sm ${isActive ? "border-orange-500/40 bg-orange-500/10 text-orange-300" : "border-zinc-800 text-zinc-300"}`}>{item.label}</NavLink>)}</nav>}</header>
    <aside className="fixed inset-y-0 left-0 hidden w-64 border-r border-zinc-800 bg-[#070709] p-5 lg:flex lg:flex-col"><div className="mb-7"><p className="font-semibold">Portfolio CMS</p><p className="text-xs font-mono text-zinc-500">M. Mahimmiraj</p></div><nav className="flex-1 space-y-1 overflow-y-auto">{items.map((item) => <NavLink key={item.to} end={item.to === "/admin"} to={item.to} className={({ isActive }) => `flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm ${isActive ? "bg-zinc-800 text-white" : "text-zinc-400 hover:bg-zinc-900 hover:text-white"}`}>{item.icon && <item.icon className="h-4 w-4" />}{item.label}</NavLink>)}</nav><div className="space-y-2 border-t border-zinc-800 pt-4"><Link to="/" target="_blank" className="flex items-center gap-2 px-3 py-2 text-sm text-zinc-400 hover:text-white"><ExternalLink className="h-4 w-4" />View website</Link><button onClick={() => void signOut()} className="flex w-full items-center gap-2 px-3 py-2 text-sm text-zinc-400 hover:text-white"><LogOut className="h-4 w-4" />Sign out</button></div></aside>
    <main className="pb-24 lg:ml-64 lg:pb-8"><Outlet /></main>
    <nav aria-label="Quick admin navigation" className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-4 border-t border-zinc-800 bg-[#09090c]/95 p-2 backdrop-blur lg:hidden"><NavLink end to="/admin" className="mobile-admin-tab">Home</NavLink><NavLink to="/admin/projects" className="mobile-admin-tab">Projects</NavLink><NavLink to="/admin/blog" className="mobile-admin-tab">Blog</NavLink><NavLink to="/admin/gallery" className="mobile-admin-tab">Gallery</NavLink></nav>
  </div>;
}

