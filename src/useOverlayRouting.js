import React, { useEffect, useMemo, useState } from "react";
import { assetUrl } from "./relativePaths";
import { projectData } from "./projectData";

const slugFromPath = (p) => p.split("/").slice(-2, -1)[0];

export default function useOverlayRouting(projectPaths) {
  const [openProject, setOpenProject] = useState(null);

  const indexBySlug = useMemo(() => {
    const map = new Map();
    for (const p of projectPaths || []) map.set(slugFromPath(p), p);
    return map;
  }, [projectPaths]);

  //TODO: remove unused replace param
  const setSearch = (slugOrNull, replace = false) => {
    const url = new URL(window.location.href);
    if (slugOrNull) url.searchParams.set("p", slugOrNull);
    else url.searchParams.delete("p");
    
    if(replace) {
      window.history.replaceState({}, "", url);
    } else {
      window.history.pushState({}, "", url);
    }
  };

  const openByData = (data) => {
    // Called by a card that already loaded metadata via useProject()
    setSearch(data.slug);
    setOpenProject(data);
  };

  const openBySlug = async (slug) => {
    if (!slug) { setOpenProject(null); return; }
    const path = indexBySlug.get(slug);
    if (!path) { setOpenProject(null); return; }
    try {
      const raw = await fetch(path);
      const jd = await raw.json();
      const data = projectData(path, jd);
      setOpenProject(data);
    } catch {
      setOpenProject(null);
    }
  };

  const close = () => {
    setSearch(null);
    setOpenProject(null);
  };

  // Initialize from URL when project list is known
  useEffect(() => {
    if (!projectPaths?.length) return;
    const slug = new URL(window.location.href).searchParams.get("p");
    if (slug) openBySlug(slug);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [projectPaths]);

  // Back/forward support
  useEffect(() => {
    const onPop = () => {
      const slug = new URL(window.location.href).searchParams.get("p");
      openBySlug(slug);
    };
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [indexBySlug]);

  return { openProject, openByData, close };
}
