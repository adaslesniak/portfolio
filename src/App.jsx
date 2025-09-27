import React, { useEffect, useState } from "react";
import ProjectsList from "./ProjectsList";
import ProjectOverlay from "./ProjectOverlay";
import useOverlayRouting from "./useOverlayRouting";

export default function App() {
  const [projectPaths, setProjectPaths] = useState([]);
  const { openProject, openByData, close } = useOverlayRouting(projectPaths);
  const onIndexLoaded = (paths) => setProjectPaths(paths);

  return (
    <div className="app">
      <div className="shell">
        <ProjectsList
          onOpen={openByData}
          // quick inline wrapper to expose paths upward
          onPathsReady={onIndexLoaded}
        />
      </div>

      <ProjectOverlay project={openProject} onClose={close} />
    </div>
  );
}
