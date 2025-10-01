import React, { useEffect, useState } from "react";
import ProjectCard from "./ProjectCard";
import { Header } from "./Header";

export default function ProjectsList({ siteInfo, onOpenProject, onOpenView, onPathsReady }) {
  const [paths, setPaths] = useState([]);      // renamed to avoid confusion
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancel = false;
    (async () => {
      try {
        setLoading(true);
        const r = await fetch("./content/index.json");
        if (!r.ok) throw new Error(`HTTP ${r.status}`);
        const json = await r.json();
        const list = Array.isArray(json?.projects) ? json.projects : [];
        if (!cancel) {
          setPaths(list);
          onPathsReady?.(list);                // still expose to App for routing
        }
      } catch (e) {
        if (!cancel) setError(String(e));
      } finally {
        if (!cancel) setLoading(false);
      }
    })();
    return () => { cancel = true; };
  }, []);

  return (
    <>
      <Header siteInfo={siteInfo} onOpenView={onOpenView} />

      {error ? (
        <p style={{ color: "#f88" }}>Error: {error}</p>
      ) : loading ? (
        <p>Loading…</p>
      ) : (
        <main className="main">
          {paths.map((p) => (
            <ProjectCard key={p} src={p} onOpen={onOpenProject} />
          ))}
        </main>
      )}
    </>
  );
}
