import React, { useEffect, useState } from "react";
import ProjectCard from "./ProjectCard";
import { resolveAsset } from "./relativePaths";

export default function App() {
  const [siteInfo, setSiteInfo] = useState(null);
  const [projects, setProjects] = useState([]);   // ← define it here
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("./content/index.json")
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then((json) => {
        setSiteInfo(json?.siteInfo ?? {});
        setProjects(Array.isArray(json?.projects) ? json.projects : []);
      })
      .catch((err) => setError(String(err)));
  }, []);

  if (error) {
    return <p style={{ color: "#f88", textAlign: "center", marginTop: 24 }}>Error: {error}</p>;
  }
  if (!siteInfo) {
    return <p style={{ color: "#e5e7eb", textAlign: "center", marginTop: 24 }}>Loading…</p>;
  }

  return (
    <div className="app">
      <div className="shell">
        <header className="header">
          <div className="header-text">
            <h1 className="title">{siteInfo.name ?? "—"}</h1>
            <p className="tagline">{siteInfo.tagline ?? ""}</p>
          </div>
          {siteInfo.avatar ? <img src={siteInfo.avatar} alt="avatar" className="avatar" /> : null}
        </header>

        <main className="main">
          {projects.map((p) => <ProjectCard key={p} src={p} />)}
        </main>
      </div>
    </div>
  );
}
