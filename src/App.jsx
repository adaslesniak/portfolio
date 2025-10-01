import React, { useEffect, useState } from "react";
import ProjectsList from "./ProjectsList";
import ProjectOverlay from "./ProjectOverlay";
import CvOverlay from "./CvOverlay";
import useOverlayRouting from "./useOverlayRouting";

export default function App() {
  const [siteInfo, setSiteInfo] = useState(null);
  const [projectPaths, setProjectPaths] = useState([]);
  const { openProject, openByData, close } = useOverlayRouting(projectPaths);
  const [cvOpen, setCvOpen] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const r = await fetch("./content/index.json");
        if (!r.ok) throw new Error(`HTTP ${r.status}`);
        const json = await r.json();
        if (cancelled) return;
        setSiteInfo(json?.siteInfo ?? {});
        setProjectPaths(Array.isArray(json?.projects) ? json.projects : []);
      } catch (e) {
        if (!cancelled) setError(String(e));
      }
    })();
    return () => { cancelled = true; };
  }, []);

  return (
    <div className="app">
      <div className="shell">
        {error ? (
          <p style={{ color: "#f88" }}>Error: {error}</p>
        ) : !siteInfo ? (
          <p>Loading…</p>
        ) : (
          <ProjectsList
            siteInfo={siteInfo}
            projects={projectPaths}
            onOpenProject={openByData}
            onOpenView={() => setCvOpen(true)}   // opens CV overlay
          />
        )}
      </div>

      <ProjectOverlay project={openProject} onClose={close} />

      <CvOverlay
        open={cvOpen}
        siteInfo={siteInfo} // ensure this path exists
        onClose={() => setCvOpen(false)}
      />
    </div>
  );
}
