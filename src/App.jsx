import React, { useEffect, useState } from "react";
import ProjectsList from "./ProjectsList";
import ProjectOverlay from "./ProjectOverlay";
import CvOverlay from "./CvOverlay";
import useOverlayRouting from "./useOverlayRouting";
import useViewRouting from "./useViewRouting";

export default function App() {
  const [siteInfo, setSiteInfo] = useState(null);
  const [projectPaths, setProjectPaths] = useState([]);
  const { openProject, openByData, close } = useOverlayRouting(projectPaths);
  const { view, open: openView, close: closeView } = useViewRouting("v"); // <<—

  const [error, setError] = useState(null);

  // Fetch ONLY siteInfo here
  useEffect(() => {
    let cancel = false;
    (async () => {
      try {
        const r = await fetch("./content/index.json");
        if (!r.ok) throw new Error(`HTTP ${r.status}`);
        const json = await r.json();
        if (!cancel) setSiteInfo(json?.siteInfo ?? {});
      } catch (e) {
        if (!cancel) setError(String(e));
      }
    })();
    return () => { cancel = true; };
  }, []);

  const onPathsReady = (paths) => setProjectPaths(paths);

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
            onOpenProject={openByData}
            onOpenView={() => openView("cv")}    
            onPathsReady={onPathsReady}
          />
        )}
      </div>

      <ProjectOverlay project={openProject} onClose={close} />

      {siteInfo && (
        <CvOverlay
          open={view === "cv"}
          siteInfo={siteInfo}
          onClose={closeView}                     
        />
      )}
    </div>
  );
}
