import { useEffect, useMemo, useState, type FormEvent } from "react";
import { ArrowLeft, ExternalLink, ImagePlus, Loader2, Save, Send, Trash2 } from "lucide-react";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import { MarkdownContent } from "@/components/MarkdownContent";
import { deleteRecord, getRecord, listRecords, saveRecord } from "@/lib/contentRepository";
import { createImageThumbnail, removeMedia, uploadMedia } from "@/lib/media";
import type { Certificate, CmsRecord } from "@/lib/types";
import { sections, type FieldConfig } from "./config";

function slugify(value: string) { return value.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, ""); }

export default function EditorPage() {
  const { section = "", id = "new" } = useParams();
  const config = sections[section];
  const navigate = useNavigate();
  const [record, setRecord] = useState<Record<string, unknown>>({});
  const [loading, setLoading] = useState(id !== "new");
  const [savingAction, setSavingAction] = useState<"save" | "publish" | null>(null);
  const [uploading, setUploading] = useState<string | null>(null);
  const [message, setMessage] = useState("");
  const [preview, setPreview] = useState(false);
  const [certificates, setCertificates] = useState<Certificate[]>([]);

  useEffect(() => {
    if (!config) return;
    if (id === "new") { setRecord({ ...config.defaults, id: `new-${crypto.randomUUID()}` }); return; }
    getRecord(config.collection, id).then((data) => setRecord((data || config.defaults) as unknown as Record<string, unknown>)).finally(() => setLoading(false));
  }, [config, id]);
  useEffect(() => {
    if (section === "achievements") void listRecords<Certificate>("certificates", { pageSize: 50 }).then((result) => setCertificates(result.data));
  }, [section]);
  const publicUrl = useMemo(() => config?.publicPath && record.slug ? `${config.publicPath}${record.slug}` : null, [config, record.slug]);
  if (!config) return <Navigate to="/admin" replace />;
  const update = (key: string, value: unknown) => setRecord((current) => ({ ...current, [key]: value }));
  const persist = async (overrides: Record<string, unknown> = {}, action: "save" | "publish" = "save") => {
    setSavingAction(action); setMessage("");
    try {
      const saved = await saveRecord(config.collection, { ...record, ...overrides } as Partial<CmsRecord>);
      setRecord(saved as unknown as Record<string, unknown>);
      setMessage(action === "publish" ? "Published successfully. It is now visible on the public Blog page." : "Saved successfully.");
      if (id === "new") navigate(`/admin/${section}/${saved.id}`, { replace: true });
    } catch (caught) { setMessage(caught instanceof Error ? caught.message : "Save failed."); } finally { setSavingAction(null); }
  };
  const submit = async (event: FormEvent) => {
    event.preventDefault();
    await persist();
  };
  const publish = async () => persist({ status: "published", published_at: record.published_at || new Date().toISOString() }, "publish");
  const upload = async (field: FieldConfig, file?: File) => {
    if (!file) return; setUploading(field.key); setMessage("");
    try {
      const url = await uploadMedia(file, section, field.type === "file"); update(field.key, url);
      if (section === "gallery" && field.key === "image_url") {
        const thumbnail = await createImageThumbnail(file);
        update("thumbnail_url", await uploadMedia(thumbnail, "gallery-thumbnails"));
      }
    } catch (caught) { setMessage(caught instanceof Error ? caught.message : "Upload failed."); } finally { setUploading(null); }
  };
  const clearMedia = async (key: string) => {
    const url = String(record[key] || "");
    if (url && window.confirm("Remove this file? It will be deleted from managed storage when possible.")) { try { await removeMedia(url); update(key, ""); } catch (caught) { setMessage(caught instanceof Error ? caught.message : "Unable to remove file."); } }
  };
  const attachCertificate = async (file?: File) => {
    if (!file) return; setUploading("certificate_id"); setMessage("");
    try {
      const fileUrl = await uploadMedia(file, "certificates", true);
      const certificate = await saveRecord<Certificate>("certificates", { title: `${String(record.title || "Achievement")} Certificate`, file_url: fileUrl, file_type: file.type === "application/pdf" ? "pdf" : "image", issuer: null, issued_at: null, sort_order: certificates.length });
      setCertificates((current) => [...current, certificate]); update("certificate_id", certificate.id);
    } catch (caught) { setMessage(caught instanceof Error ? caught.message : "Certificate upload failed."); } finally { setUploading(null); }
  };
  const appendImages = async (fieldKey: string, files: FileList | null) => {
    if (!files?.length) return; setUploading(fieldKey); setMessage("");
    try {
      const urls = await Promise.all(Array.from(files).map((file) => uploadMedia(file, `${section}-gallery`)));
      update(fieldKey, [...(Array.isArray(record[fieldKey]) ? record[fieldKey] as string[] : []), ...urls]);
    } catch (caught) { setMessage(caught instanceof Error ? caught.message : "Image upload failed."); } finally { setUploading(null); }
  };
  const insertContentImage = async (file?: File) => {
    if (!file) return; setUploading("content"); setMessage("");
    try { const url = await uploadMedia(file, "blog-content"); update("content", `${String(record.content || "")}\n\n![${file.name.replace(/\.[^.]+$/, "")}](${url})\n`); } catch (caught) { setMessage(caught instanceof Error ? caught.message : "Image upload failed."); } finally { setUploading(null); }
  };
  const remove = async () => {
    if (id === "new" || !window.confirm(`Delete this ${config.singular}? This cannot be undone.`)) return;
    try { await deleteRecord(config.collection, id); navigate(`/admin/${section}`); } catch (caught) { setMessage(caught instanceof Error ? caught.message : "Delete failed."); }
  };
  if (loading) return <div className="admin-page text-zinc-500">Loading editor…</div>;
  return <form onSubmit={submit} className="admin-page"><header className="mb-7 flex items-start justify-between gap-4"><div><Link to={`/admin/${section}`} className="mb-3 inline-flex items-center gap-2 text-sm text-zinc-500 hover:text-white"><ArrowLeft className="h-4 w-4" />{config.label}</Link><h1 className="text-2xl font-semibold sm:text-3xl">{id === "new" ? `New ${config.singular}` : `Edit ${config.singular}`}</h1></div><div className="flex gap-2">{("content" in record || "long_description" in record) && <button type="button" className="action-secondary" onClick={() => setPreview(!preview)}>{preview ? "Edit" : "Preview"}</button>}{publicUrl && <Link to={publicUrl} target="_blank" className="touch-button" aria-label="Open public page"><ExternalLink className="h-4 w-4" /></Link>}</div></header>
    {preview ? <div className="rounded-xl border border-zinc-800 bg-[#09090c] p-6 sm:p-10"><h1 className="mb-6 text-3xl font-semibold">{String(record.title || record.name || "Untitled")}</h1><MarkdownContent content={String(record.content || record.long_description || "")} /></div> : <div className="space-y-6">{config.fields.map((field) => <Field key={field.key} field={field} value={record[field.key]} record={record} update={update} upload={upload} uploading={uploading} clearMedia={clearMedia} certificates={certificates} attachCertificate={attachCertificate} appendImages={appendImages} insertContentImage={insertContentImage} />)}</div>}
    {message && <p role="status" className={`mt-6 rounded-lg border p-3 text-sm ${message.includes("success") ? "border-emerald-500/30 text-emerald-300" : "border-red-500/30 text-red-300"}`}>{message}</p>}
    <div className="sticky bottom-[72px] z-30 mt-8 flex flex-wrap items-center gap-3 rounded-xl border border-zinc-700 bg-[#101014]/95 p-3 shadow-2xl backdrop-blur lg:bottom-4">{section === "blog" && record.status !== "published" ? <><button type="submit" disabled={Boolean(savingAction) || Boolean(uploading)} className="action-secondary flex-1 justify-center py-3 sm:flex-none sm:px-6">{savingAction === "save" ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}{savingAction === "save" ? "Saving…" : "Save draft"}</button><button type="button" onClick={() => void publish()} disabled={Boolean(savingAction) || Boolean(uploading)} className="action-primary flex-1 justify-center py-3 sm:flex-none sm:px-7">{savingAction === "publish" ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}{savingAction === "publish" ? "Publishing…" : "Publish now"}</button></> : <button type="submit" disabled={Boolean(savingAction) || Boolean(uploading)} className="action-primary flex-1 justify-center py-3 sm:flex-none sm:px-7">{savingAction ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}{savingAction ? "Saving…" : section === "blog" ? "Update published post" : "Save"}</button>}{id !== "new" && <button type="button" onClick={() => void remove()} className="touch-button ml-auto text-red-400" aria-label={`Delete ${config.singular}`}><Trash2 /></button>}</div>
  </form>;
}

function Field({ field, value, record, update, upload, uploading, clearMedia, certificates, attachCertificate, appendImages, insertContentImage }: { field: FieldConfig; value: unknown; record: Record<string, unknown>; update: (key: string, value: unknown) => void; upload: (field: FieldConfig, file?: File) => Promise<void>; uploading: string | null; clearMedia: (key: string) => Promise<void>; certificates: Certificate[]; attachCertificate: (file?: File) => Promise<void>; appendImages: (fieldKey: string, files: FileList | null) => Promise<void>; insertContentImage: (file?: File) => Promise<void> }) {
  const id = `field-${field.key}`;
  if (field.key === "certificate_id") return <div><label className="block" htmlFor={id}><span className="cms-label">Certificate (optional)</span><select id={id} className="cms-input" value={String(value || "")} onChange={(event) => update(field.key, event.target.value || null)}><option value="">No certificate</option>{certificates.map((certificate) => <option key={certificate.id} value={certificate.id}>{certificate.title}</option>)}</select></label><label className="mt-3 flex min-h-12 cursor-pointer items-center justify-center rounded-xl border border-dashed border-zinc-700 text-sm text-zinc-300">{uploading === "certificate_id" ? "Uploading certificate…" : "Upload and attach a new certificate"}<input type="file" className="sr-only" accept="image/jpeg,image/png,image/webp,application/pdf" onChange={(event) => void attachCertificate(event.target.files?.[0])} /></label></div>;
  if (field.type === "imageArray") { const images = Array.isArray(value) ? value as string[] : []; return <div><span className="cms-label">{field.label}</span><div className="mb-3 grid grid-cols-3 gap-2 sm:grid-cols-5">{images.map((url, index) => <div key={`${url}-${index}`} className="relative"><img src={url} alt="" className="aspect-square w-full rounded-lg object-cover" /><button type="button" onClick={() => update(field.key, images.filter((_, imageIndex) => imageIndex !== index))} className="absolute right-1 top-1 rounded-full bg-black/80 p-1 text-red-300" aria-label="Remove project image"><Trash2 className="h-3.5 w-3.5" /></button></div>)}</div><label className="flex min-h-12 cursor-pointer items-center justify-center rounded-xl border border-dashed border-zinc-700 text-sm text-zinc-300">{uploading === field.key ? "Uploading images…" : "Add project images"}<input type="file" multiple accept="image/jpeg,image/png,image/webp,image/avif" className="sr-only" onChange={(event) => void appendImages(field.key, event.target.files)} /></label></div>; }
  if (field.type === "boolean") return <label className="flex min-h-12 items-center justify-between gap-4 rounded-xl border border-zinc-800 bg-[#0a0a0d] px-4 py-3"><span><strong className="block text-sm">{field.label}</strong>{field.help && <small className="text-zinc-500">{field.help}</small>}</span><input id={id} type="checkbox" className="h-5 w-5 accent-orange-500" checked={Boolean(value)} onChange={(event) => update(field.key, event.target.checked)} /></label>;
  if (field.type === "image" || field.type === "file") return <div><span className="cms-label">{field.label}</span>{typeof value === "string" && value && <div className="mb-3 flex items-center gap-3 rounded-xl border border-zinc-800 p-3">{field.type === "image" && <img src={value} alt="Preview" className="h-20 w-20 rounded-lg object-cover" />}<a href={value} target="_blank" rel="noreferrer" className="min-w-0 flex-1 truncate text-sm text-orange-300">{value}</a><button type="button" onClick={() => void clearMedia(field.key)} className="touch-button text-red-400" aria-label="Remove file"><Trash2 className="h-4 w-4" /></button></div>}<label className="flex min-h-14 cursor-pointer items-center justify-center gap-2 rounded-xl border border-dashed border-zinc-700 bg-zinc-900/40 px-4 text-sm text-zinc-300 hover:border-zinc-500"><ImagePlus className="h-4 w-4" />{uploading === field.key ? "Uploading…" : value ? "Replace file" : "Choose or capture file"}<input type="file" className="sr-only" accept={field.type === "file" ? "image/jpeg,image/png,image/webp,image/avif,image/gif,application/pdf" : "image/jpeg,image/png,image/webp,image/avif,image/gif"} onChange={(event) => void upload(field, event.target.files?.[0])} /></label><label className="mt-3 block"><span className="cms-label">Or paste a URL</span><input className="cms-input" type="url" value={String(value || "")} onChange={(event) => update(field.key, event.target.value)} /></label></div>;
  if (field.type === "textarea") return <label className="block" htmlFor={id}><span className="cms-label">{field.label}</span><textarea id={id} className={`cms-input ${field.key === "content" || field.key === "long_description" ? "min-h-80" : "min-h-28"}`} required={field.required} value={String(value || "")} onChange={(event) => update(field.key, event.target.value)} />{field.key === "content" && <span className="mt-3 flex"><span className="action-secondary cursor-pointer">{uploading === "content" ? "Uploading image…" : "Insert content image"}<input type="file" className="sr-only" accept="image/jpeg,image/png,image/webp,image/avif" onChange={(event) => void insertContentImage(event.target.files?.[0])} /></span></span>}{field.help && <small className="mt-1 block text-zinc-500">{field.help}</small>}</label>;
  if (field.type === "select") return <label className="block" htmlFor={id}><span className="cms-label">{field.label}</span><select id={id} className="cms-input" value={String(value || "")} onChange={(event) => update(field.key, event.target.value)}>{field.options?.map((option) => <option key={option} value={option}>{option}</option>)}</select></label>;
  if (field.type === "array") return <label className="block" htmlFor={id}><span className="cms-label">{field.label}</span><input id={id} className="cms-input" value={Array.isArray(value) ? value.join(", ") : ""} onChange={(event) => update(field.key, event.target.value.split(",").map((item) => item.trim()).filter(Boolean))} placeholder="Separate items with commas" /></label>;
  const type = field.type === "slug" ? "text" : field.type;
  const inputValue = field.type === "date" && typeof value === "string" ? value.slice(0, 10) : String(value || "");
  return <label className="block" htmlFor={id}><span className="cms-label">{field.label}</span><input id={id} className="cms-input" type={type} required={field.required} value={inputValue} onChange={(event) => { update(field.key, event.target.value); if ((field.key === "title" || field.key === "name") && !record.slug) update("slug", slugify(event.target.value)); }} />{field.help && <small className="mt-1 block text-zinc-500">{field.help}</small>}</label>;
}
