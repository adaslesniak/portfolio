// AboutMeOverlay.jsx
import React, { useEffect, useState } from "react";

export default function AboutMeOverlay({ open, siteInfo, onClose }) {
  const [info, setInfo] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // 1) Hooks must be unconditional
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  useEffect(() => {
    if (!open || !siteInfo?.about) return;
    let cancelled = false;

    (async () => {
      try {
        setLoading(true);
        setError(null);
        const r = await fetch(siteInfo.about);
        if (!r.ok) throw new Error(`HTTP ${r.status}`);
        const j = await r.json();
        if (!cancelled) setInfo(j);
      } catch (e) {
        if (!cancelled) setError(e.message || String(e));
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();

    return () => { cancelled = true; };
  }, [open, siteInfo?.about]);

  // 2) Single early return AFTER all hooks
  if (!open) return null;

  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,.6)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1000,
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          background: "#111214",
          color: "#e5e7eb",
          padding: 24,
          borderRadius: 12,
          minWidth: 320,
          textAlign: "center",
          border: "1px solid #2a2f36",
        }}
      >
        {error ? `Error: ${error}` : loading ? "Loading…" : (info?.title || "___")}
        <div className="overlayButtons">
          <button className="overlayBtn" onClick={onClose} autoFocus>
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
