import { useMemo, useState } from "react";
import { ChevronDown, ChevronUp, Pencil, Plus, Search, Trash2 } from "lucide-react";
import { Link, Navigate, useParams } from "react-router-dom";
import { deleteRecord, reorderRecord } from "@/lib/contentRepository";
import { useCollection } from "@/hooks/useContent";
import type { CmsRecord } from "@/lib/types";
import { sections } from "./config";

export default function CollectionPage() {
  const { section = "" } = useParams();
  const config = sections[section];
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const options = useMemo(() => ({ search, page, pageSize: 20 }), [page, search]);
  const { data, count, loading, error, refresh } = useCollection<CmsRecord>(config?.collection || "projects", options);
  if (!config) return <Navigate to="/admin" replace />;
  const title = (record: CmsRecord) => String((record as unknown as Record<string, unknown>)[config.titleKey] || `Untitled ${config.singular}`);
  const remove = async (record: CmsRecord) => {
    if (!window.confirm(`Delete “${title(record)}”? This cannot be undone.`)) return;
    try { await deleteRecord(config.collection, record.id); await refresh(); } catch (caught) { window.alert(caught instanceof Error ? caught.message : "Delete failed."); }
  };
  const move = async (index: number, direction: -1 | 1) => {
    const swapIndex = index + direction;
    if (!data[swapIndex]) return;
    await Promise.all([reorderRecord(config.collection, data[index].id, data[swapIndex].sort_order), reorderRecord(config.collection, data[swapIndex].id, data[index].sort_order)]);
    await refresh();
  };
  return <div className="admin-page"><header className="mb-6 flex items-start justify-between gap-4"><div><h1 className="text-3xl font-semibold">{config.label}</h1><p className="mt-2 text-sm text-zinc-500">{count} total</p></div><Link to={`/admin/${section}/new`} className="action-primary shrink-0"><Plus className="h-4 w-4" />Add <span className="hidden sm:inline">{config.singular}</span></Link></header><label className="relative mb-6 block"><span className="sr-only">Search {config.label}</span><Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-600" /><input className="cms-input pl-11" placeholder={`Search ${config.label.toLowerCase()}`} value={search} onChange={(event) => { setSearch(event.target.value); setPage(1); }} /></label>
    {loading && <p className="text-zinc-500">Loading…</p>}{error && <p role="alert" className="text-red-400">{error}</p>}{!loading && !data.length && <div className="rounded-xl border border-dashed border-zinc-700 p-10 text-center"><p className="text-zinc-400">No {config.label.toLowerCase()} found.</p><Link to={`/admin/${section}/new`} className="mt-4 inline-flex text-sm text-orange-400">Create the first {config.singular}</Link></div>}
    <div className="space-y-3">{data.map((record, index) => { const raw = record as unknown as Record<string, unknown>; const status = String(raw.status ?? (raw.visible === false ? "hidden" : "published")); return <article key={record.id} className="flex items-center gap-3 rounded-xl border border-zinc-800 bg-[#0a0a0d] p-3 sm:p-4">{typeof raw.thumbnail_url === "string" || typeof raw.image_url === "string" ? <img src={String(raw.thumbnail_url || raw.image_url)} alt="" className="h-14 w-14 shrink-0 rounded-lg object-cover" /> : null}<div className="min-w-0 flex-1"><h2 className="truncate font-medium">{title(record)}</h2><p className="mt-1 text-xs font-mono text-zinc-500">{status}</p></div><div className="flex shrink-0 items-center"><button onClick={() => void move(index, -1)} disabled={index === 0} className="touch-button" aria-label={`Move ${title(record)} up`}><ChevronUp className="h-4 w-4" /></button><button onClick={() => void move(index, 1)} disabled={index === data.length - 1} className="touch-button" aria-label={`Move ${title(record)} down`}><ChevronDown className="h-4 w-4" /></button><Link to={`/admin/${section}/${record.id}`} className="touch-button" aria-label={`Edit ${title(record)}`}><Pencil className="h-4 w-4" /></Link><button onClick={() => void remove(record)} className="touch-button text-red-400" aria-label={`Delete ${title(record)}`}><Trash2 className="h-4 w-4" /></button></div></article>; })}</div>
    {count > 20 && <nav className="mt-7 flex items-center justify-between"><button className="action-secondary" disabled={page === 1} onClick={() => setPage((value) => value - 1)}>Previous</button><span className="text-xs text-zinc-500">Page {page}</span><button className="action-secondary" disabled={page * 20 >= count} onClick={() => setPage((value) => value + 1)}>Next</button></nav>}
  </div>;
}

