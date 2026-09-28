import { useCallback, useEffect, useMemo, useState } from "react";
import { ArrowLeft, ExternalLink, MapPin, MonitorSmartphone } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { getVisitor, listVisitorEvents } from "@/lib/analyticsRepository";
import type { VisitorEvent, VisitorProfile } from "@/lib/types";

const pageSize = 25;

function formatDate(value: string) {
  return new Intl.DateTimeFormat(undefined, { dateStyle: "long", timeStyle: "short" }).format(new Date(value));
}

export default function VisitorDetailPage() {
  const { id = "" } = useParams();
  const [visitor, setVisitor] = useState<VisitorProfile | null>(null);
  const [events, setEvents] = useState<VisitorEvent[]>([]);
  const [count, setCount] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const load = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const [profile, history] = await Promise.all([getVisitor(id), listVisitorEvents(id, page, pageSize)]);
      setVisitor(profile);
      setEvents(history.data);
      setCount(history.count);
    } catch (loadError) {
      setError(loadError instanceof Error ? loadError.message : "Unable to load this visitor.");
    } finally {
      setLoading(false);
    }
  }, [id, page]);

  useEffect(() => { void load(); }, [load]);

  const pagesVisited = useMemo(() => Array.from(new Set(events.map((event) => event.path))), [events]);
  const location = visitor ? [visitor.city, visitor.region, visitor.country || visitor.country_code].filter(Boolean).join(", ") || "Unknown" : "—";

  return <div className="admin-page"><Link to="/admin/visitors" className="mb-6 inline-flex items-center gap-2 text-sm text-zinc-400 hover:text-white"><ArrowLeft className="h-4 w-4" />All visitors</Link>{error && <div className="mb-6 rounded-xl border border-red-500/30 bg-red-500/10 p-4 text-sm text-red-200">{error}</div>}{loading && !visitor ? <p className="text-sm text-zinc-500">Loading visitor…</p> : !visitor ? <div className="rounded-xl border border-zinc-800 p-8 text-center text-zinc-500">Visitor not found.</div> : <><header className="mb-8"><p className="text-xs font-mono uppercase tracking-wider text-orange-400">Visitor</p><h1 className="mt-2 break-all font-mono text-2xl font-semibold sm:text-4xl">{visitor.ip_address}</h1><p className="mt-2 text-sm text-zinc-500">IP-based identity · Location is approximate</p></header>

    <div className="mb-8 grid grid-cols-2 gap-3 lg:grid-cols-4"><div className="rounded-xl border border-zinc-800 bg-[#0a0a0d] p-4"><p className="text-xs text-zinc-500">Total visits</p><p className="mt-2 text-3xl font-semibold">{Number(visitor.visit_count).toLocaleString()}</p></div><div className="rounded-xl border border-zinc-800 bg-[#0a0a0d] p-4"><p className="text-xs text-zinc-500">First visit</p><p className="mt-2 text-sm font-medium text-zinc-200">{formatDate(visitor.first_visit_at)}</p></div><div className="rounded-xl border border-zinc-800 bg-[#0a0a0d] p-4"><p className="text-xs text-zinc-500">Last visit</p><p className="mt-2 text-sm font-medium text-zinc-200">{formatDate(visitor.last_visit_at)}</p></div><div className="rounded-xl border border-zinc-800 bg-[#0a0a0d] p-4"><p className="text-xs text-zinc-500">Known pages</p><p className="mt-2 text-3xl font-semibold">{pagesVisited.length}</p><p className="mt-1 text-[11px] text-zinc-600">on this page of history</p></div></div>

    <div className="mb-8 grid gap-4 md:grid-cols-2"><section className="rounded-xl border border-zinc-800 bg-[#0a0a0d] p-5"><div className="flex gap-3"><MapPin className="h-5 w-5 text-orange-400" /><div><h2 className="text-sm font-semibold">Approximate location</h2><p className="mt-2 text-sm text-zinc-300">{location}</p><p className="mt-1 text-xs text-zinc-600">Derived from network headers when available; not an exact physical address.</p></div></div></section><section className="rounded-xl border border-zinc-800 bg-[#0a0a0d] p-5"><div className="flex gap-3"><MonitorSmartphone className="h-5 w-5 text-orange-400" /><div><h2 className="text-sm font-semibold">Latest device</h2><p className="mt-2 text-sm text-zinc-300">{visitor.device_type || "Unknown"} · {visitor.browser || "Unknown browser"}</p><p className="mt-1 text-xs text-zinc-600">{visitor.operating_system || "Unknown operating system"}</p></div></div></section></div>

    <section className="overflow-hidden rounded-xl border border-zinc-800 bg-[#0a0a0d]"><div className="border-b border-zinc-800 p-5"><h2 className="font-semibold">Visit history</h2><p className="mt-1 text-xs text-zinc-500">{count.toLocaleString()} recorded events</p></div>{events.length === 0 ? <div className="p-8 text-center text-sm text-zinc-500">No visit events remain for this visitor.</div> : <div className="divide-y divide-zinc-800">{events.map((event) => <article key={event.id} className="p-4 sm:p-5"><div className="flex flex-wrap items-start justify-between gap-3"><div><p className="break-all font-mono text-sm text-zinc-100">{event.path}</p><p className="mt-1 text-xs text-zinc-500">{formatDate(event.visited_at)}</p></div><p className="text-xs text-zinc-500">{event.device_type || "Unknown"} · {event.browser || "Unknown"} · {event.operating_system || "Unknown"}</p></div>{event.referrer && <a href={event.referrer} target="_blank" rel="noreferrer" className="mt-3 inline-flex max-w-full items-center gap-1.5 truncate text-xs text-orange-300 hover:text-orange-200"><ExternalLink className="h-3.5 w-3.5 shrink-0" />{event.referrer}</a>}{event.user_agent && <details className="mt-3"><summary className="cursor-pointer text-xs text-zinc-600">User agent</summary><p className="mt-2 break-all font-mono text-[11px] leading-relaxed text-zinc-500">{event.user_agent}</p></details>}</article>)}</div>}<div className="flex items-center justify-between border-t border-zinc-800 p-4"><button className="action-secondary" disabled={page === 1 || loading} onClick={() => setPage((value) => Math.max(1, value - 1))}>Previous</button><span className="text-xs text-zinc-500">Page {page} of {Math.max(1, Math.ceil(count / pageSize))}</span><button className="action-secondary" disabled={page * pageSize >= count || loading} onClick={() => setPage((value) => value + 1)}>Next</button></div></section></>}
  </div>;
}
