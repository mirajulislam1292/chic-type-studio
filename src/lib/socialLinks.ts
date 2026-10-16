import type { CustomSocialLink, SocialLinks } from "./types";

export const socialPlatforms = [
  { key: "github", label: "GitHub" },
  { key: "linkedin", label: "LinkedIn" },
  { key: "x", label: "X (formerly Twitter)" },
  { key: "facebook", label: "Facebook" },
  { key: "instagram", label: "Instagram" },
  { key: "whatsapp", label: "WhatsApp" },
  { key: "wechat", label: "WeChat" },
  { key: "youtube", label: "YouTube" },
  { key: "telegram", label: "Telegram" },
  { key: "tiktok", label: "TikTok" },
  { key: "discord", label: "Discord" },
  { key: "medium", label: "Medium" },
] as const;

export const defaultSocialLinks: SocialLinks = {
  github: "https://github.com/mirajulislam1292",
  linkedin: "https://www.linkedin.com/in/mahimmiraj1292/",
  facebook: "https://www.facebook.com/mahimmiraj1292",
  instagram: "https://www.instagram.com/mahimmiraj1292",
};

export interface VisibleSocialLink {
  key: string;
  label: string;
  url: string;
}

export function getCustomSocialLinks(links: SocialLinks): CustomSocialLink[] {
  return Array.isArray(links.custom) ? links.custom : [];
}

export function getVisibleSocialLinks(links: SocialLinks): VisibleSocialLink[] {
  const knownKeys = new Set<string>(socialPlatforms.map((platform) => platform.key));
  const known = socialPlatforms.flatMap((platform) => {
    const value = links[platform.key];
    return typeof value === "string" && value.trim()
      ? [{ key: platform.key, label: platform.label, url: value.trim() }]
      : [];
  });
  const legacy = Object.entries(links).flatMap(([key, value]) => {
    if (key === "custom" || knownKeys.has(key) || typeof value !== "string" || !value.trim()) return [];
    return [{ key, label: key, url: value.trim() }];
  });
  const custom = getCustomSocialLinks(links).flatMap((item, index) => {
    const label = item.label.trim();
    const url = item.url.trim();
    return label && url ? [{ key: `custom-${index}-${label}`, label, url }] : [];
  });

  return [...known, ...legacy, ...custom];
}
