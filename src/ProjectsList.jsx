import React, { useEffect, useState } from "react";
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
      <header className="header">
        <div className="header-text">
          <h1 className="title">{siteInfo.name ?? "—"}</h1>
          <p className="tagline">{siteInfo.tagline ?? ""}</p>
        </div>
        {siteInfo.avatar ? <img src={siteInfo.avatar} alt="avatar" className="avatar" /> : null}
      </header>

      <main className="main">
        {projects.map((p) => (
          <ProjectCard key={p} src={p} onOpen={onOpen} />
        ))}
      </main>

      {/* expose project paths to parent through a property if needed */}
      {/* Alternatively, lift the index fetch up if you prefer. */}
    </>
  );
}
