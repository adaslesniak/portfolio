import React, { useEffect, useState } from "react";
import { Header } from "./Header";
import ProjectCard from "./ProjectCard";

export default function ProjectsList({ onOpen, onPathsReady }) {
  const [siteInfo, setSiteInfo] = useState(null);
  const [projects, setProjects] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("./content/index.json")
      .then((r) => { if (!r.ok) throw new Error(`HTTP ${r.status}`); return r.json(); })
      .then((json) => {
        setSiteInfo(json?.siteInfo ?? {});
        const paths = Array.isArray(json?.projects) ? json.projects : [];
        setProjects(paths)
        onPathsReady?.(paths)
      })
      .catch((e) => setError(String(e)));
  }, []);

  if (error) return <p style={{ color:"#f88" }}>Error: {error}</p>;
  if (!siteInfo) return <p>Loading…</p>;

  return (
    <>
      <Header siteInfo={siteInfo} />
      <main className="main">
        {projects.map((p) => (
          <ProjectCard key={p} src={p} onOpen={onOpen} />
        ))}
      </main>
    </>
  );
}
