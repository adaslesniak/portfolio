// useViewRouting.js
import { useEffect, useState } from "react";

export default function useViewRouting(param = "v") {
  const [view, setView] = useState(null); // e.g. "cv", "about", null

  const setSearch = (value, replace = false) => {
    const url = new URL(window.location.href);
    if (value) url.searchParams.set(param, value);
    else url.searchParams.delete(param);
    if (replace) window.history.replaceState({}, "", url);
    else window.history.pushState({}, "", url);
  };

  const open = (name) => { setSearch(name); setView(name); };
  const close = () => { setSearch(null); setView(null); };

  // initialize from URL
  useEffect(() => {
    const v = new URL(window.location.href).searchParams.get(param);
    if (v) setView(v);
  }, [param]);

  // back/forward
  useEffect(() => {
    const onPop = () => {
      const v = new URL(window.location.href).searchParams.get(param);
      setView(v);
    };
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, [param]);

  return { view, open, close };
}
