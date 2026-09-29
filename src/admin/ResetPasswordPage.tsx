import { useState, type FormEvent } from "react";
import { CheckCircle2, KeyRound } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";

export default function ResetPasswordPage() {
  const { user, loading, updatePassword } = useAuth();
  const [password, setPassword] = useState("");
  const [confirmation, setConfirmation] = useState("");
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);
  const [complete, setComplete] = useState(false);

  async function submit(event: FormEvent) {
    event.preventDefault(); setError("");
    if (password.length < 10) { setError("Use at least 10 characters."); return; }
    if (password !== confirmation) { setError("The passwords do not match."); return; }
    setSaving(true);
    try { await updatePassword(password); setComplete(true); setPassword(""); setConfirmation(""); } catch (caught) { setError(caught instanceof Error ? caught.message : "Unable to update password."); } finally { setSaving(false); }
  }

  return <main className="flex min-h-screen items-center justify-center bg-[#050507] px-5 text-white"><div className="w-full max-w-md rounded-2xl border border-zinc-800 bg-[#0a0a0e] p-6 sm:p-8">{complete ? <><CheckCircle2 className="h-9 w-9 text-emerald-400" /><h1 className="mt-5 text-3xl font-semibold">Password updated</h1><p className="mt-3 text-sm text-zinc-400">Your new password is active and this device remains securely signed in.</p><Link to="/admin" className="action-primary mt-7 w-full justify-center">Open dashboard</Link></> : <><KeyRound className="h-9 w-9 text-orange-400" /><h1 className="mt-5 text-3xl font-semibold">Set a new password</h1><p className="mt-3 text-sm text-zinc-400">Choose a unique password with at least 10 characters.</p>{loading ? <p className="mt-7 text-sm text-zinc-500">Verifying recovery link…</p> : !user ? <div className="mt-7 rounded-xl border border-amber-500/30 bg-amber-500/10 p-4 text-sm text-amber-200">This recovery link is missing, invalid, or expired. Return to login and request a new one.</div> : <form onSubmit={submit} className="mt-7 space-y-5"><label className="block"><span className="cms-label">New password</span><input className="cms-input" type="password" autoComplete="new-password" required minLength={10} value={password} onChange={(event) => setPassword(event.target.value)} /></label><label className="block"><span className="cms-label">Confirm password</span><input className="cms-input" type="password" autoComplete="new-password" required minLength={10} value={confirmation} onChange={(event) => setConfirmation(event.target.value)} /></label>{error && <p role="alert" className="text-sm text-red-400">{error}</p>}<button disabled={saving} className="action-primary w-full justify-center">{saving ? "Updating…" : "Update password"}</button></form>}<Link to="/admin/login" className="mt-6 block text-center text-sm text-zinc-500 hover:text-white">Back to login</Link></>}</div></main>;
}
