import { useState, type FormEvent } from "react";
import { Navigate } from "react-router-dom";
import { LockKeyhole } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { isCmsConfigured } from "@/lib/contentRepository";
import { getRememberSessionPreference } from "@/lib/supabase";

export default function AdminLogin() {
  const { isAdmin, signIn, sendPasswordReset } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const [remember, setRemember] = useState(getRememberSessionPreference);
  const [submitting, setSubmitting] = useState(false);
  const [resetting, setResetting] = useState(false);
  if (isAdmin) return <Navigate to="/admin" replace />;
  const submit = async (event: FormEvent) => {
    event.preventDefault(); setError(""); setNotice(""); setSubmitting(true);
    try { await signIn(email.trim(), password, remember); } catch (caught) { setError(caught instanceof Error ? caught.message : "Unable to sign in."); } finally { setSubmitting(false); }
  };
  const resetPassword = async () => {
    setError(""); setNotice("");
    if (!email.trim()) { setError("Enter your administrator email first."); return; }
    setResetting(true);
    try { await sendPasswordReset(email.trim()); setNotice("Password recovery sent. Check your email and open the secure link."); } catch (caught) { setError(caught instanceof Error ? caught.message : "Unable to send password recovery."); } finally { setResetting(false); }
  };
  return <main className="flex min-h-screen items-center justify-center bg-[#050507] px-5 text-white"><div className="w-full max-w-md rounded-2xl border border-zinc-800 bg-[#0a0a0e] p-6 sm:p-8"><div className="mb-7 flex h-11 w-11 items-center justify-center rounded-xl border border-zinc-700 bg-zinc-900"><LockKeyhole className="h-5 w-5 text-orange-400" /></div><p className="mb-2 text-xs font-mono uppercase tracking-wider text-zinc-500">Private control center</p><h1 className="text-3xl font-semibold">Portfolio admin</h1><p className="mt-3 text-sm leading-relaxed text-zinc-400">Sign in with the authorized administrator account.</p>
    {!isCmsConfigured ? <div className="mt-7 rounded-xl border border-amber-500/30 bg-amber-500/10 p-4 text-sm text-amber-200">The content service is not connected in this deployment. Add the required environment variables before signing in.</div> : <form onSubmit={submit} className="mt-8 space-y-5"><label className="block"><span className="cms-label">Email</span><input className="cms-input" type="email" autoComplete="email" required value={email} onChange={(event) => setEmail(event.target.value)} /></label><label className="block"><span className="cms-label">Password</span><input className="cms-input" type="password" autoComplete="current-password" required value={password} onChange={(event) => setPassword(event.target.value)} /></label><label className="flex cursor-pointer items-start gap-3 text-sm text-zinc-300"><input type="checkbox" checked={remember} onChange={(event) => setRemember(event.target.checked)} className="mt-0.5 h-4 w-4 accent-orange-500" /><span>Remember me<span className="mt-1 block text-xs text-zinc-500">Keep me signed in securely on this device.</span></span></label>{error && <p role="alert" className="text-sm text-red-400">{error}</p>}{notice && <p role="status" className="text-sm text-emerald-400">{notice}</p>}<button disabled={submitting || resetting} className="action-primary w-full justify-center py-3">{submitting ? "Signing in…" : "Sign in"}</button><button type="button" disabled={submitting || resetting} onClick={() => void resetPassword()} className="w-full text-sm text-zinc-400 transition hover:text-white">{resetting ? "Sending recovery…" : "Forgot or never set your password?"}</button></form>}
  </div></main>;
}
