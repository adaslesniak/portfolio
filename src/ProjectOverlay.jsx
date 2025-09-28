import React, { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import OverlayRenderer from "./OverlayRenderer";

export default function ProjectOverlay({ project, onClose }) {
  const [md, setMd] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!project) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = prev; };
  }, [project]);

  useEffect(() => {
    if (!project?.details) return;
    let cancel = false;
    async function run() {
      setLoading(true);
      try {
        const r = await fetch(project.details);
        const t = await r.text();
        if (!cancel) setMd(t);
      } catch (e) {
        if (!cancel) setMd(String(e));
      } finally {
        if (!cancel) setLoading(false);
      }
    }
    run();
    return () => { cancel = true; };
  }, [project]);

  if (!project) return null;
  
  const allTags = Array.from(
    new Set([...(project.tags ?? []), ...(project.aux_tags ?? [])])
  );

  return (
    <div
      aria-modal="true" role="dialog"
      style={{
        position: "fixed", inset: 0, background: "rgba(0,0,0,.6)",
        display: "flex", alignItems: "flex-start", justifyContent: "center",
        padding: "48px 16px", zIndex: 1000,
        overflowY: "auto",           // backdrop scroll (for very tall sheets)
        overscrollBehavior: "contain"// prevent rubber-banding -> background
      }}
      onClick={onClose}
    >
    <div
        style={{
          background: "#111214", color: "#e5e7eb",
          width: "100%", maxWidth: 860,
          borderRadius: 12, padding: 20, boxShadow: "0 10px 30px rgba(0,0,0,.5)",
          maxHeight: "90vh",          // 2) sheet itself scrolls
          overflowY: "auto",
          overscrollBehavior: "contain"
        }}
        onClick={(e) => e.stopPropagation()}
    >
    {/* Header */}
        <div style={{ marginBottom: 12 }}>
          <h2 style={{ margin: 0 }}>{project.title}</h2>
          {project.date && (
            <div style={{ opacity: .7, fontSize: 14, marginTop: 4 }}>{project.date.split("-")[2]}</div>
          )}
        </div>

    {loading ? (
       <p>Loading…</p>
    ) : (
        <OverlayRenderer markdown={md} data={project} />
    )}

        {/* Footer: tags + close */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: 8,
            alignItems: "center",
            justifyContent: "space-between",
            borderTop: "1px solid #2a2f36",
            marginTop: 16,
            paddingTop: 12
          }}
        >
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
            {allTags.map((t, i) => (
              <span
                key={i}
                style={{
                  fontSize: 12,
                  padding: "4px 8px",
                  border: "1px solid #2a2f36",
                  borderRadius: 999,
                  opacity: .9
                }}
              >
                {t}
              </span>
            ))}
          </div>
          <div style={{ display: "flex", gap: 8, marginLeft: "auto", marginTop: 8 }}>
          <a
            href="https://www.aulendil.net/cv"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              background: "#222",
              color: "#eee",
              border: "1px solid #333",
              borderRadius: 8,
              padding: "6px 10px",
              fontSize: 14,
              textDecoration: "none",
              cursor: "pointer"
            }}
          >
            View CV
          </a>
          <button
            onClick={onClose}
            style={{
              background: "#222",
              color: "#eee",
              border: "1px solid #333",
              borderRadius: 8,
              padding: "6px 10px",
              cursor: "pointer"
            }}
          >
            Close
          </button>
        </div>
        </div>
    </div>
   </div>
);
}
