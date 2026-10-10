import { useCallback, useEffect, useState } from "react";
import { Archive, Check, Mail, MessageCircle, RotateCcw, Trash2 } from "lucide-react";
import { deleteMessage, listMessages, updateMessageStatus } from "@/lib/messageRepository";
import type { InboundMessage } from "@/lib/types";

function locationLabel(message: InboundMessage) {
  return [message.city, message.region, message.country || message.country_code].filter(Boolean).join(", ") || "Location unavailable";
}

export default function MessagesPage() {
  const [messages, setMessages] = useState<InboundMessage[]>([]);
  const [count, setCount] = useState(0);
  const [page, setPage] = useState(1);
  const [type, setType] = useState("all");
  const [status, setStatus] = useState("all");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const result = await listMessages({ page, pageSize: 20, type, status });
      setMessages(result.data);
      setCount(result.count);
      setError(null);
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "Unable to load messages.");
    } finally {
      setLoading(false);
    }
  }, [page, status, type]);

  useEffect(() => { void load(); }, [load]);

  const changeStatus = async (message: InboundMessage, nextStatus: InboundMessage["status"]) => {
    try { await updateMessageStatus(message.id, nextStatus); await load(); }
    catch (caught) { window.alert(caught instanceof Error ? caught.message : "Update failed."); }
  };

  const remove = async (message: InboundMessage) => {
    if (!window.confirm("Delete this message permanently?")) return;
    try { await deleteMessage(message.id); await load(); }
    catch (caught) { window.alert(caught instanceof Error ? caught.message : "Delete failed."); }
  };

  return <div className="admin-page"><header className="mb-7"><p className="text-xs font-mono uppercase tracking-wider text-orange-400">Private inbox</p><h1 className="mt-2 text-3xl font-semibold sm:text-4xl">Messages</h1><p className="mt-2 text-sm text-zinc-500">Anonymous notes and professional contact requests. Only the admin account can read these records.</p></header>
    <div className="mb-6 grid gap-3 sm:grid-cols-2"><label><span className="cms-label">Message type</span><select className="cms-input" value={type} onChange={(event) => { setType(event.target.value); setPage(1); }}><option value="all">All types</option><option value="anonymous">Anonymous notes</option><option value="contact">Contact requests</option></select></label><label><span className="cms-label">Status</span><select className="cms-input" value={status} onChange={(event) => { setStatus(event.target.value); setPage(1); }}><option value="all">All statuses</option><option value="new">New</option><option value="read">Read</option><option value="archived">Archived</option></select></label></div>
    <p className="mb-4 text-xs font-mono text-zinc-600">{count} message{count === 1 ? "" : "s"}</p>
    {loading ? <p className="text-zinc-500">Loading messages…</p> : null}
    {error ? <p role="alert" className="text-red-400">{error}</p> : null}
    {!loading && !error && !messages.length ? <div className="rounded-xl border border-dashed border-zinc-700 p-10 text-center text-zinc-400">No messages in this view.</div> : null}
    <div className="space-y-4">{messages.map((message) => <article key={message.id} className={`rounded-2xl border p-5 sm:p-6 ${message.status === "new" ? "border-orange-500/30 bg-orange-500/[0.04]" : "border-zinc-800 bg-[#0a0a0d]"}`}>
      <div className="flex flex-wrap items-start justify-between gap-3"><div className="flex items-center gap-3">{message.message_type === "contact" ? <Mail className="h-5 w-5 text-orange-400" /> : <MessageCircle className="h-5 w-5 text-zinc-400" />}<div><p className="font-semibold">{message.message_type === "contact" ? message.name || "Contact request" : "Anonymous note"}</p><p className="mt-1 text-xs font-mono text-zinc-600"><time dateTime={message.created_at}>{new Date(message.created_at).toLocaleString()}</time> · {message.status}</p></div></div><div className="flex items-center gap-1">{message.status !== "read" ? <button className="touch-button" onClick={() => void changeStatus(message, "read")} aria-label="Mark as read" title="Mark as read"><Check className="h-4 w-4" /></button> : <button className="touch-button" onClick={() => void changeStatus(message, "new")} aria-label="Mark as new" title="Mark as new"><RotateCcw className="h-4 w-4" /></button>}<button className="touch-button" onClick={() => void changeStatus(message, "archived")} aria-label="Archive message" title="Archive"><Archive className="h-4 w-4" /></button><button className="touch-button text-red-400" onClick={() => void remove(message)} aria-label="Delete message" title="Delete"><Trash2 className="h-4 w-4" /></button></div></div>
      {message.subject ? <h2 className="mt-5 text-lg font-semibold">{message.subject}</h2> : null}
      <p className="mt-4 whitespace-pre-wrap text-sm leading-7 text-zinc-300">{message.message}</p>
      <dl className="mt-5 grid gap-3 border-t border-zinc-800 pt-4 text-xs sm:grid-cols-2"><div><dt className="text-zinc-600">Reply address</dt><dd className="mt-1 text-zinc-400">{message.email ? <a className="hover:text-white" href={`mailto:${message.email}`}>{message.email}</a> : "Not provided"}</dd></div><div><dt className="text-zinc-600">Approximate location</dt><dd className="mt-1 text-zinc-400">{locationLabel(message)}</dd></div><div><dt className="text-zinc-600">IP address</dt><dd className="mt-1 font-mono text-zinc-400">{message.ip_address}</dd></div><div><dt className="text-zinc-600">Technical data</dt><dd className="mt-1 break-words text-zinc-500">{message.user_agent || "Unavailable"}</dd></div></dl>
    </article>)}</div>
    {count > 20 ? <nav className="mt-7 flex items-center justify-between"><button className="action-secondary" disabled={page === 1} onClick={() => setPage((value) => value - 1)}>Previous</button><span className="text-xs text-zinc-500">Page {page}</span><button className="action-secondary" disabled={page * 20 >= count} onClick={() => setPage((value) => value + 1)}>Next</button></nav> : null}
  </div>;
}
