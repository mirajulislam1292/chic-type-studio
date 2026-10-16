import { useEffect, useState, type FormEvent } from "react";
import { Loader2, Plus, Save, Trash2 } from "lucide-react";
import { getSettings, saveSettings } from "@/lib/contentRepository";
import { uploadMedia } from "@/lib/media";
import { getCustomSocialLinks, socialPlatforms } from "@/lib/socialLinks";
import type { CustomSocialLink, SiteSettings } from "@/lib/types";

export default function SettingsPage() {
  const [settings, setSettings] = useState<SiteSettings | null>(null);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => { void getSettings().then(setSettings); }, []);

  if (!settings) return <div className="admin-page text-zinc-500">Loading settings…</div>;

  const update = <K extends keyof SiteSettings>(key: K, value: SiteSettings[K]) => {
    setSettings((current) => current ? { ...current, [key]: value } : current);
  };
  const updateSocial = (key: string, value: string) => {
    update("social_links", { ...settings.social_links, [key]: value });
  };
  const updateCustomSocials = (custom: CustomSocialLink[]) => {
    update("social_links", { ...settings.social_links, custom });
  };
  const customSocials = getCustomSocialLinks(settings.social_links);
  const submit = async (event: FormEvent) => {
    event.preventDefault();
    setSaving(true);
    setMessage("");
    try {
      setSettings(await saveSettings(settings));
      setMessage("Settings saved successfully.");
    } catch (caught) {
      setMessage(caught instanceof Error ? caught.message : "Save failed.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <form onSubmit={submit} className="admin-page">
      <header className="mb-8">
        <h1 className="text-3xl font-semibold">Site Settings</h1>
        <p className="mt-2 text-sm text-zinc-500">Global identity, contact and search information.</p>
      </header>
      <div className="space-y-6">
        <Field label="Name" value={settings.name} onChange={(value) => update("name", value)} required />
        <Field label="Short bio" value={settings.short_bio} onChange={(value) => update("short_bio", value)} textarea />
        <Field label="About" value={settings.about_content} onChange={(value) => update("about_content", value)} textarea />
        <div>
          <span className="cms-label">Profile image</span>
          {settings.profile_image_url ? <img src={settings.profile_image_url} alt="Profile preview" className="mb-3 h-24 w-24 rounded-full object-cover" /> : null}
          <label className="action-secondary cursor-pointer">
            Choose photo
            <input type="file" accept="image/jpeg,image/png,image/webp,image/avif" className="sr-only" onChange={async (event) => {
              const file = event.target.files?.[0];
              if (file) update("profile_image_url", await uploadMedia(file, "profile"));
            }} />
          </label>
        </div>
        <div className="grid gap-6 sm:grid-cols-2">
          <Field label="Email" type="email" value={settings.email} onChange={(value) => update("email", value)} required />
          <Field label="Phone" value={settings.phone || ""} onChange={(value) => update("phone", value)} />
          <Field label="Location" value={settings.location || ""} onChange={(value) => update("location", value)} />
        </div>

        <section className="border-t border-zinc-800 pt-6">
          <div className="mb-5">
            <h2 className="text-lg font-semibold">Social links</h2>
            <p className="mt-1 text-sm text-zinc-500">Paste any available profile link. Empty links stay hidden on the public site.</p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2">
            {socialPlatforms.map((platform) => (
              <Field
                key={platform.key}
                label={platform.label}
                type="url"
                value={typeof settings.social_links[platform.key] === "string" ? settings.social_links[platform.key] as string : ""}
                onChange={(value) => updateSocial(platform.key, value)}
              />
            ))}
          </div>

          <div className="mt-7 space-y-4">
            <div className="flex items-center justify-between gap-4">
              <div>
                <h3 className="text-sm font-semibold text-zinc-200">Other platforms</h3>
                <p className="mt-1 text-xs text-zinc-500">Add any platform or personal profile not listed above.</p>
              </div>
              <button type="button" className="action-secondary shrink-0" onClick={() => updateCustomSocials([...customSocials, { id: crypto.randomUUID(), label: "", url: "" }])}>
                <Plus className="h-4 w-4" /> Add link
              </button>
            </div>
            {customSocials.map((item, index) => (
              <div key={item.id || `custom-social-${index}`} className="grid gap-3 rounded-xl border border-zinc-800 bg-[#0b0b0e] p-4 sm:grid-cols-[1fr_2fr_auto] sm:items-end">
                <Field label="Platform name" value={item.label} onChange={(value) => updateCustomSocials(customSocials.map((current, itemIndex) => itemIndex === index ? { ...current, label: value } : current))} />
                <Field label="Profile URL" type="url" value={item.url} onChange={(value) => updateCustomSocials(customSocials.map((current, itemIndex) => itemIndex === index ? { ...current, url: value } : current))} />
                <button type="button" className="action-secondary justify-center px-3" aria-label={`Remove ${item.label || "custom social"}`} onClick={() => updateCustomSocials(customSocials.filter((_, itemIndex) => itemIndex !== index))}>
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>
        </section>

        <section className="border-t border-zinc-800 pt-6">
          <h2 className="mb-5 text-lg font-semibold">SEO defaults</h2>
          <div className="space-y-6">
            <Field label="SEO title" value={settings.seo_title} onChange={(value) => update("seo_title", value)} required />
            <Field label="SEO description" value={settings.seo_description} onChange={(value) => update("seo_description", value)} textarea required />
            <Field label="Footer text" value={settings.footer_text} onChange={(value) => update("footer_text", value)} />
          </div>
        </section>
      </div>
      {message ? <p role="status" className="mt-6 text-sm text-zinc-300">{message}</p> : null}
      <div className="sticky bottom-[72px] mt-8 rounded-xl border border-zinc-700 bg-[#101014]/95 p-3 lg:bottom-4">
        <button disabled={saving} className="action-primary w-full justify-center py-3 sm:w-auto">
          {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
          {saving ? "Saving…" : "Save settings"}
        </button>
      </div>
    </form>
  );
}

function Field({ label, value, onChange, textarea, type = "text", required }: { label: string; value: string; onChange: (value: string) => void; textarea?: boolean; type?: string; required?: boolean }) {
  return (
    <label className="block">
      <span className="cms-label">{label}</span>
      {textarea
        ? <textarea className="cms-input min-h-28" value={value} required={required} onChange={(event) => onChange(event.target.value)} />
        : <input className="cms-input" type={type} value={value} required={required} onChange={(event) => onChange(event.target.value)} />}
    </label>
  );
}
