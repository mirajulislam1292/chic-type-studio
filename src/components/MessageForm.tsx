import { useState, type FormEvent } from "react";
import { CheckCircle2, Send } from "lucide-react";

type MessageMode = "anonymous" | "contact";

export function MessageForm({ mode }: { mode: MessageMode }) {
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (sending) return;
    setSending(true);
    setError(null);
    const form = new FormData(event.currentTarget);
    const payload = {
      type: mode,
      message: String(form.get("message") || ""),
      website: String(form.get("website") || ""),
      ...(mode === "contact" ? {
        name: String(form.get("name") || ""),
        email: String(form.get("email") || ""),
        subject: String(form.get("subject") || ""),
      } : {}),
    };

    try {
      const response = await fetch("/api/submit-message", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const result = await response.json().catch(() => ({})) as { error?: string };
      if (!response.ok) throw new Error(result.error || "Unable to send your message.");
      setSent(true);
      event.currentTarget.reset();
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "Unable to send your message.");
    } finally {
      setSending(false);
    }
  };

  if (sent) {
    return <div className="rounded-2xl border border-emerald-500/25 bg-emerald-500/5 p-8 text-center" role="status">
      <CheckCircle2 className="mx-auto h-8 w-8 text-emerald-400" />
      <h2 className="mt-4 text-xl font-semibold">Message sent</h2>
      <p className="mt-2 text-sm text-zinc-400">Thank you. Your message is now in Mahim's private inbox.</p>
      <button type="button" onClick={() => setSent(false)} className="action-secondary mt-6">Send another</button>
    </div>;
  }

  return <form onSubmit={submit} className="space-y-5 rounded-2xl border border-zinc-800 bg-[#0a0a0d] p-5 shadow-2xl shadow-black/20 sm:p-8">
    <div className="absolute -left-[10000px] top-auto h-px w-px overflow-hidden" aria-hidden="true">
      <label htmlFor={`${mode}-website`}>Website</label>
      <input id={`${mode}-website`} name="website" tabIndex={-1} autoComplete="off" />
    </div>

    {mode === "contact" ? <>
      <div className="grid gap-5 sm:grid-cols-2">
        <label><span className="cms-label">Your name</span><input name="name" className="cms-input" required minLength={2} maxLength={120} autoComplete="name" placeholder="Full name" /></label>
        <label><span className="cms-label">Email address</span><input name="email" type="email" className="cms-input" required maxLength={254} autoComplete="email" placeholder="you@example.com" /></label>
      </div>
      <label><span className="cms-label">Subject <span className="text-zinc-600">(optional)</span></span><input name="subject" className="cms-input" maxLength={160} placeholder="What would you like to discuss?" /></label>
    </> : null}

    <label>
      <span className="cms-label">{mode === "anonymous" ? "Your message" : "Message"}</span>
      <textarea name="message" required minLength={2} maxLength={4000} rows={8} className="cms-input resize-y" placeholder={mode === "anonymous" ? "Leave an opinion, thought, criticism, encouragement, or anything you want me to read…" : "Tell me about your idea, project, or question…"} />
    </label>

    {error ? <p role="alert" className="rounded-lg border border-red-500/20 bg-red-500/5 px-4 py-3 text-sm text-red-300">{error}</p> : null}

    <button type="submit" disabled={sending} className="action-primary w-full justify-center sm:w-auto">
      <Send className="h-4 w-4" />{sending ? "Sending…" : "Send message"}
    </button>

    <p className="text-[11px] leading-relaxed text-zinc-600">
      {mode === "anonymous"
        ? "No name or email is requested. To prevent abuse, your IP address and basic technical and approximate location data are recorded with this message. It is anonymous by name, but not untraceable."
        : "Your contact details, message, IP address, and basic technical and approximate location data are stored so Mahim can reply and protect this form from abuse."}
    </p>
  </form>;
}
