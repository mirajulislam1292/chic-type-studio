import { fallbackCollections, defaultSettings } from "@/data/defaultContent";
import { isCmsConfigured, supabase } from "./supabase";
import type { CmsRecord, CollectionName, SiteSettings } from "./types";

export interface ListOptions {
  page?: number;
  pageSize?: number;
  search?: string;
  publishedOnly?: boolean;
}

const searchable: Partial<Record<CollectionName, string>> = {
  projects: "name",
  achievements: "title",
  certificates: "title",
  blog_posts: "title",
  gallery_items: "alt_text",
  experiences: "position",
  education: "institution",
  skills: "name",
};

export async function listRecords<T extends CmsRecord>(collection: CollectionName, options: ListOptions = {}) {
  const page = Math.max(1, options.page || 1);
  const pageSize = Math.min(50, Math.max(1, options.pageSize || 20));
  if (!supabase) {
    let rows = [...fallbackCollections[collection]] as T[];
    if (options.publishedOnly) rows = rows.filter((row) => !("status" in row) || row.status === "published");
    if (options.search) {
      const needle = options.search.toLowerCase();
      rows = rows.filter((row) => JSON.stringify(row).toLowerCase().includes(needle));
    }
    return { data: rows.slice((page - 1) * pageSize, page * pageSize), count: rows.length, error: null as Error | null };
  }

  const selection = collection === "achievements" ? "*, certificate:certificates(*)" : "*";
  let query = supabase.from(collection).select(selection, { count: "exact" });
  if (options.publishedOnly && ["projects", "achievements", "blog_posts"].includes(collection)) query = query.eq("status", "published");
  if (options.publishedOnly && collection === "gallery_items") query = query.eq("visible", true);
  if (options.search && searchable[collection]) query = query.ilike(searchable[collection]!, `%${options.search}%`);
  const from = (page - 1) * pageSize;
  const { data, count, error } = await query.order("sort_order", { ascending: true }).range(from, from + pageSize - 1);
  return { data: (data || []) as unknown as T[], count: count || 0, error: error ? new Error(error.message) : null };
}

export async function getBySlug<T extends CmsRecord>(collection: "projects" | "blog_posts", slug: string, includeDraft = false) {
  if (!supabase) {
    return (fallbackCollections[collection] as T[]).find((item) => "slug" in item && item.slug === slug) || null;
  }
  let query = supabase.from(collection).select("*").eq("slug", slug);
  if (!includeDraft) query = query.eq("status", "published");
  const { data, error } = await query.maybeSingle();
  if (error) throw new Error(error.message);
  return data as T | null;
}

export async function getRecord<T extends CmsRecord>(collection: CollectionName, id: string) {
  if (!supabase) return (fallbackCollections[collection] as T[]).find((item) => item.id === id) || null;
  const selection = collection === "achievements" ? "*, certificate:certificates(*)" : "*";
  const { data, error } = await supabase.from(collection).select(selection).eq("id", id).maybeSingle();
  if (error) throw new Error(error.message);
  return data as T | null;
}

export async function saveRecord<T extends CmsRecord>(collection: CollectionName, record: Partial<T>) {
  if (!supabase) throw new Error("The CMS is not connected. Add the Supabase environment variables first.");
  const payload = { ...record } as Record<string, unknown>;
  if (!payload.id || String(payload.id).startsWith("new-")) delete payload.id;
  delete payload.created_at;
  delete payload.updated_at;
  delete payload.certificate;
  if (collection === "blog_posts") {
    if (payload.published_at === "") payload.published_at = null;
    if (payload.status === "published" && !payload.published_at) payload.published_at = new Date().toISOString();
  }
  const { data, error } = await supabase.from(collection).upsert(payload).select().single();
  if (error) throw new Error(error.message);
  return data as T;
}

export async function deleteRecord(collection: CollectionName, id: string) {
  if (!supabase) throw new Error("The CMS is not connected.");
  const { error } = await supabase.from(collection).delete().eq("id", id);
  if (error) throw new Error(error.message);
}

export async function reorderRecord(collection: CollectionName, id: string, sortOrder: number) {
  if (!supabase) throw new Error("The CMS is not connected.");
  const { error } = await supabase.from(collection).update({ sort_order: sortOrder }).eq("id", id);
  if (error) throw new Error(error.message);
}

export async function getSettings() {
  if (!supabase) return defaultSettings;
  const { data, error } = await supabase.from("site_settings").select("*").eq("id", "main").maybeSingle();
  if (error) throw new Error(error.message);
  return (data || defaultSettings) as SiteSettings;
}

export async function saveSettings(settings: SiteSettings) {
  if (!supabase) throw new Error("The CMS is not connected.");
  const { data, error } = await supabase.from("site_settings").upsert(settings).select().single();
  if (error) throw new Error(error.message);
  return data as SiteSettings;
}

export async function getDashboardCounts() {
  if (!supabase) {
    return Object.fromEntries(Object.entries(fallbackCollections).map(([key, value]) => [key, value.length]));
  }
  const collections: CollectionName[] = ["projects", "achievements", "certificates", "blog_posts", "gallery_items", "experiences", "education", "skills"];
  const values = await Promise.all(collections.map(async (collection) => {
    const { count } = await supabase.from(collection).select("id", { head: true, count: "exact" });
    return [collection, count || 0] as const;
  }));
  const { count: drafts } = await supabase.from("blog_posts").select("id", { head: true, count: "exact" }).eq("status", "draft");
  const { count: published } = await supabase.from("blog_posts").select("id", { head: true, count: "exact" }).eq("status", "published");
  const { count: newMessages } = await supabase.from("inbound_messages").select("id", { head: true, count: "exact" }).eq("status", "new");
  return { ...Object.fromEntries(values), blog_drafts: drafts || 0, blog_published: published || 0, new_messages: newMessages || 0 };
}

export { isCmsConfigured };
