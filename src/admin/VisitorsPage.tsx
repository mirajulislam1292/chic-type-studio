import { useCallback, useEffect, useState } from "react";
import { ArrowRight, Clock3, Database, Globe2, MonitorSmartphone, RefreshCw, ShieldCheck, UsersRound } from "lucide-react";
import { Link } from "react-router-dom";
import { getRetentionDays, getVisitorAnalytics, listVisitors, purgeVisitorAnalytics } from "@/lib/analyticsRepository";
import type { AnalyticsBreakdown, VisitorAnalytics, VisitorProfile } from "@/lib/types";

const pageSize = 20;

function formatDate(value: string) {
  return new Intl.DateTimeFormat(undefined, { dateStyle: "medium", timeStyle: "short" }).format(new Date(value));
}

function locationLabel(visitor: VisitorProfile) {
  return [visitor.city, visitor.region, visitor.country || visitor.country_code].filter(Boolean).join(", ") || "Unknown";
}

function Breakdown({ title, items }: { title: string; items: AnalyticsBreakdown[] }) {
  const max = Math.max(1, ...items.map((item) => Number(item.count)));
  return <section className="rounded-xl border border-zinc-800 bg-[#0a0a0d] p-5"><h2 className="text-sm font-semibold text-zinc-200">{title}</h2><div className="mt-4 space-y-3">{items.length === 0 && <p className="text-sm text-zinc-500">No data yet.</p>}{items.map((item) => <div key={item.label}><div className="mb-1.5 flex items-center justify-between gap-4 text-xs"><span className="truncate text-zinc-300">{item.label}</span><span className="font-mono text-zinc-500">{Number(item.count).toLocaleString()}</span></div><div className="h-1.5 overflow-hidden rounded-full bg-zinc-800"><div className="h-full rounded-full bg-orange-500" style={{ width: `${(Number(item.count) / max) * 100}%` }} /></div></div>)}</div></section>;
}

export default function VisitorsPage() {
  const [analytics, setAnalytics] = useState<VisitorAnalytics | null>(null);
  const [visitors, setVisitors] = useState<VisitorProfile[]>([]);
  const [count, setCount] = useState(0);
  const [page, setPage] = useState(1);
  const [retentionDays, setRetentionDays] = useState(180);
  const [loading, setLoading] = useState(true);
  const [purging, setPurging] = useState(false);
  const [notice, setNotice] = useState("");
  const [error, setError] = useState("");

  const load = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const [summary, recent, retention] = await Promise.all([
        getVisitorAnalytics(),
        listVisitors(page, pageSize),
        getRetentionDays(),
      ]);
      setAnalytics(summary);
      setVisitors(recent.data);
      setCount(recent.count);
      setRetentionDays(retention);
    } catch (loadError) {
      setError(loadError instanceof Error ? loadError.message : "Unable to load visitor analytics.");
    } finally {
      setLoading(false);
    }
  }, [page]);

  useEffect(() => { void load(); }, [load]);

  async function purge() {
    if (!window.confirm(`Delete visit events older than ${retentionDays} days? This cannot be undone.`)) return;
    setPurging(true);
    setNotice("");
    try {
      const deleted = await purgeVisitorAnalytics(retentionDays);
      setNotice(`${deleted.toLocaleString()} old visit ${deleted === 1 ? "event was" : "events were"} deleted. Retention is now ${retentionDays} days.`);
      await load();
    } catch (purgeError) {
      setError(purgeError instanceof Error ? purgeError.message : "Unable to apply retention.");
    } finally {
      setPurging(false);
    }
  }

  const summary = analytics || { total_visits: 0, unique_visitors: 0, today_visits: 0, week_visits: 0, month_visits: 0, top_pages: [], devices: [], browsers: [], operating_systems: [], countries: [] };
  const stats = [
    ["Total visits", summary.total_visits, Database],
    ["Unique visitors", summary.unique_visitors, UsersRound],
    ["Today", summary.today_visits, Clock3],
    ["This week", summary.week_visits, RefreshCw],
    ["This month", summary.month_visits, Globe2],
  ] as const;

  return <div className="admin-page max-w-7xl"><header className="mb-8 flex flex-wrap items-end justify-between gap-4"><div><p className="text-xs font-mono uppercase tracking-wider text-orange-400">Private analytics</p><h1 className="mt-2 text-3xl font-semibold sm:text-4xl">Visitors</h1><p className="mt-2 max-w-2xl text-sm text-zinc-400">Real server-recorded visits. Locations are approximate and depend on available network data.</p></div><button onClick={() => void load()} disabled={loading} className="action-secondary"><RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} />Refresh</button></header>

    {error && <div className="mb-6 rounded-xl border border-red-500/30 bg-red-500/10 p-4 text-sm text-red-200">{error}</div>}
    {notice && <div className="mb-6 rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-4 text-sm text-emerald-200">{notice}</div>}

    <div className="mb-8 grid grid-cols-2 gap-3 lg:grid-cols-5">{stats.map(([label, value, Icon]) => <div key={label} className="rounded-xl border border-zinc-800 bg-[#0a0a0d] p-4 sm:p-5"><div className="flex items-center justify-between"><p className="text-xs text-zinc-500">{label}</p><Icon className="h-4 w-4 text-zinc-600" /></div><p className="mt-3 text-2xl font-semibold sm:text-3xl">{loading && !analytics ? "—" : Number(value).toLocaleString()}</p></div>)}</div>

    <div className="mb-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3"><Breakdown title="Most visited pages" items={summary.top_pages} /><Breakdown title="Devices" items={summary.devices} /><Breakdown title="Browsers" items={summary.browsers} /><Breakdown title="Operating systems" items={summary.operating_systems} /><Breakdown title="Countries" items={summary.countries} /></div>

    <section className="mb-8 overflow-hidden rounded-xl border border-zinc-800 bg-[#0a0a0d]"><div className="flex flex-wrap items-center justify-between gap-3 border-b border-zinc-800 p-5"><div><h2 className="font-semibold">Recent visitors</h2><p className="mt-1 text-xs text-zinc-500">{count.toLocaleString()} unique visitor profiles</p></div></div>{!loading && visitors.length === 0 ? <div className="p-8 text-center text-sm text-zinc-500">No visits have been recorded yet.</div> : <div className="divide-y divide-zinc-800">{visitors.map((visitor) => <Link key={visitor.id} to={`/admin/visitors/${visitor.id}`} className="grid gap-3 p-4 transition hover:bg-zinc-900/70 sm:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)_auto_auto] sm:items-center sm:px-5"><div><p className="truncate font-mono text-sm text-zinc-100">{visitor.ip_address}</p><p className="mt-1 truncate text-xs text-zinc-500">{locationLabel(visitor)}</p></div><div className="text-xs text-zinc-400"><p>{visitor.device_type || "Unknown device"} · {visitor.browser || "Unknown browser"}</p><p className="mt-1 text-zinc-600">{formatDate(visitor.last_visit_at)}</p></div><div><p className="text-lg font-semibold">{Number(visitor.visit_count).toLocaleString()}</p><p className="text-[11px] text-zinc-600">visits</p></div><ArrowRight className="hidden h-4 w-4 text-zinc-600 sm:block" /></Link>)}</div>}<div className="flex items-center justify-between border-t border-zinc-800 p-4"><button className="action-secondary" disabled={page === 1 || loading} onClick={() => setPage((value) => Math.max(1, value - 1))}>Previous</button><span className="text-xs text-zinc-500">Page {page} of {Math.max(1, Math.ceil(count / pageSize))}</span><button className="action-secondary" disabled={page * pageSize >= count || loading} onClick={() => setPage((value) => value + 1)}>Next</button></div></section>

    <section className="rounded-xl border border-zinc-800 bg-[#0a0a0d] p-5"><div className="flex items-start gap-3"><ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-orange-400" /><div className="flex-1"><h2 className="font-semibold">Raw data retention</h2><p className="mt-1 max-w-2xl text-sm text-zinc-500">Keep only the visit history you need. Applying this setting deletes older events and visitor profiles with no remaining events.</p><div className="mt-4 flex flex-wrap items-center gap-3"><label className="sr-only" htmlFor="retention-days">Retention period</label><select id="retention-days" value={retentionDays} onChange={(event) => setRetentionDays(Number(event.target.value))} className="cms-input max-w-52"><option value={30}>30 days</option><option value={90}>90 days</option><option value={180}>180 days</option><option value={365}>1 year</option><option value={730}>2 years</option></select><button onClick={() => void purge()} disabled={purging} className="action-secondary">{purging ? "Applying…" : "Apply and delete older data"}</button></div></div></div></section>
  </div>;
}
