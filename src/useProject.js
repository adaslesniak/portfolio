import { useEffect, useState } from "react";
import { resolveAsset } from "./relativePaths";

export function useProject(src) {
  const [data, setData] = useState(null);
  const [err, setErr] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancel = false;
    async function run() {
      try {
        setLoading(true);
        const r = await fetch(src);
        if (!r.ok) throw new Error(`${src} HTTP ${r.status}`);
        const j = await r.json();
        const normalized = {
          slug: src.split("/").slice(-2, -1)[0],
          title: j.title ?? "Untitled",
          summary: j.summary ?? "",
          date: j.date ?? "",
          tags: j.tech_tags ?? [],
          cover: resolveAsset(src, j.small_img),
        };
        if (!cancel) { setData(normalized); setErr(null); }
      } catch (e) {
        if (!cancel) setErr(String(e));
      } finally {
        if (!cancel) setLoading(false);
      }
    }
    run();
    return () => { cancel = true; };
  }, [src]);

  return { data, loading, error: err };
}
