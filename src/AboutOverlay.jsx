// AboutMeOverlay.jsx
import React, { useEffect, useState } from "react";
import { assetUrl } from "./relativePaths";

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

  const aboutTitle = info?.title ?? "";
  const intro = info?.intro ?? "";
  const values = Array.isArray(info?.values) ? info.values : [];
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
          width: "100%", maxWidth: 860,
          maxHeight: "calc(100vh - 96px)",
          overflowY: "auto"
        }}
      >
        <h1 style={{ margin: "0 0 12px 0", fontSize: 28, fontWeight: 600 }}>
          {error ? `Error: ${error}` : loading ? "Loading…" : (aboutTitle)}
        </h1>
        {!loading && !error && (
          <p style={{ margin: "0 0 20px 0", opacity: 0.9, lineHeight: 1.7 }}>
            {intro}
          </p>
        )}
        {!loading && !error && values.length > 0 && (
          <div style={{ display: "grid", gap: 12 }}>
            {values.map((v, i) => {
              const imgName = v.illustration || v.image;
              const caption = v.img_text || v.imgText || "";
              const base = (siteInfo?.about || "").replace(/[^/]+$/, "");
              const imgSrc = imgName ? assetUrl(base, imgName) : null;
              const title = ((v.title || `Item ${i + 1}`).trim().replace(/\s*:?$/, "")) + ":";

              return (
                <div
                  key={i}
                  style={{
                    padding: "12px 14px",
                    border: "1px solid var(--border)",
                    borderRadius: 10,
                    background: "rgba(255,255,255,0.02)",
                  }}
                >
                  {/* GRID: left = title+text, right = image+caption */}
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "minmax(0,1fr) 320px",
                      gap: 16,
                      alignItems: "start",
                    }}
                  >
                    {/* LEFT COLUMN */}
                    <div>
                      <div style={{ fontWeight: 700, fontSize: 18, marginBottom: 8 }}>
                        {title}
                      </div>
                      <div style={{ lineHeight: 1.7, marginTop: 4 }}>
                        {v.text || ""}
                      </div>
                    </div>

                    {/* RIGHT COLUMN */}
                    <div style={{ alignSelf: "start" }}>
                      {imgSrc ? (
                        <figure style={{ margin: 0, textAlign: "center" }}>
                          <img
                            src={imgSrc}
                            alt={caption || v.title || `image ${i + 1}`}
                            style={{ width: "85%", height: "auto", borderRadius: 8, display: "block" }}
                          />
                          {caption && (
                            <figcaption style={{ fontSize: 12, color: "#707088", marginTop: 6 }}>
                              {caption}
                            </figcaption>
                          )}
                        </figure>
                      ) : null}
                    </div>
                  </div>
                </div>
              );
            })}


          </div>
        )}

        <div className="overlayButtons">
          <button className="overlayBtn" onClick={onClose} autoFocus>
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
