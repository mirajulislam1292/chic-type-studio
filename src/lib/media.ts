import { supabase } from "./supabase";

const IMAGE_TYPES = new Set(["image/jpeg", "image/png", "image/webp", "image/avif", "image/gif"]);
const DOCUMENT_TYPES = new Set(["application/pdf", ...IMAGE_TYPES]);

export async function uploadMedia(file: File, folder: string, allowPdf = false) {
  if (!supabase) throw new Error("Connect Supabase before uploading files.");
  const allowed = allowPdf ? DOCUMENT_TYPES : IMAGE_TYPES;
  if (!allowed.has(file.type)) throw new Error(allowPdf ? "Use a JPG, PNG, WebP, AVIF, GIF or PDF file." : "Use a JPG, PNG, WebP, AVIF or GIF image.");
  const max = allowPdf ? 10 * 1024 * 1024 : 6 * 1024 * 1024;
  if (file.size > max) throw new Error(`File is larger than ${allowPdf ? 10 : 6} MB.`);
  const extension = file.name.split(".").pop()?.toLowerCase().replace(/[^a-z0-9]/g, "") || "bin";
  const path = `${folder}/${crypto.randomUUID()}.${extension}`;
  const { error } = await supabase.storage.from("portfolio-media").upload(path, file, {
    cacheControl: "31536000",
    contentType: file.type,
    upsert: false,
  });
  if (error) throw error;
  return supabase.storage.from("portfolio-media").getPublicUrl(path).data.publicUrl;
}

export async function removeMedia(url: string) {
  if (!supabase || !url.includes("/portfolio-media/")) return;
  const path = decodeURIComponent(url.split("/portfolio-media/")[1]?.split("?")[0] || "");
  if (!path) return;
  const { error } = await supabase.storage.from("portfolio-media").remove([path]);
  if (error) throw error;
}

export async function createImageThumbnail(file: File, maxDimension = 1200) {
  if (!IMAGE_TYPES.has(file.type) || file.type === "image/gif") return file;
  try {
    const bitmap = await createImageBitmap(file);
    const scale = Math.min(1, maxDimension / Math.max(bitmap.width, bitmap.height));
    const canvas = document.createElement("canvas");
    canvas.width = Math.max(1, Math.round(bitmap.width * scale));
    canvas.height = Math.max(1, Math.round(bitmap.height * scale));
    const context = canvas.getContext("2d");
    if (!context) return file;
    context.drawImage(bitmap, 0, 0, canvas.width, canvas.height);
    bitmap.close();
    const blob = await new Promise<Blob | null>((resolve) => canvas.toBlob(resolve, "image/webp", 0.82));
    return blob ? new File([blob], "thumbnail.webp", { type: "image/webp" }) : file;
  } catch {
    return file;
  }
}
