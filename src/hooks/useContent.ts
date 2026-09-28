import { useCallback, useEffect, useState } from "react";
import { getSettings, listRecords, type ListOptions } from "@/lib/contentRepository";
import type { CmsRecord, CollectionName, SiteSettings } from "@/lib/types";

export function useCollection<T extends CmsRecord>(collection: CollectionName, options: ListOptions = {}) {
  const [data, setData] = useState<T[]>([]);
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const serialized = JSON.stringify(options);

  const refresh = useCallback(async () => {
    setLoading(true);
    try {
      const result = await listRecords<T>(collection, JSON.parse(serialized) as ListOptions);
      if (result.error) throw result.error;
      setData(result.data);
      setCount(result.count);
      setError(null);
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "Unable to load content.");
    } finally {
      setLoading(false);
    }
  }, [collection, serialized]);

  useEffect(() => { void refresh(); }, [refresh]);
  return { data, count, loading, error, refresh, setData };
}

export function useSiteSettings() {
  const [settings, setSettings] = useState<SiteSettings | null>(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    getSettings().then(setSettings).finally(() => setLoading(false));
  }, []);
  return { settings, loading, setSettings };
}
