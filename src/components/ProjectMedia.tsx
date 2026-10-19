interface ProjectMediaProps {
  projectName: string;
  thumbnailUrl?: string | null;
  galleryUrls?: string[] | null;
}

export function ProjectMedia({ projectName, thumbnailUrl, galleryUrls = [] }: ProjectMediaProps) {
  const media = Array.from(new Set([thumbnailUrl, ...(galleryUrls || [])].filter((url): url is string => Boolean(url?.trim()))));
  if (!media.length) return null;

  return (
    <section aria-label={`${projectName} media`} className="mb-12 space-y-4">
      <a href={media[0]} target="_blank" rel="noreferrer" className="block overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-950">
        <img src={media[0]} alt={`${projectName} project preview`} className="max-h-[680px] w-full object-contain" />
      </a>
      {media.length > 1 ? <div className="grid gap-4 sm:grid-cols-2">
        {media.slice(1).map((url, index) => <a key={url} href={url} target="_blank" rel="noreferrer" className="block overflow-hidden rounded-xl border border-zinc-800 bg-zinc-950">
          <img src={url} alt={`${projectName} screenshot ${index + 1}`} loading="lazy" decoding="async" className="aspect-video w-full object-cover transition duration-300 hover:scale-[1.01]" />
        </a>)}
      </div> : null}
    </section>
  );
}
