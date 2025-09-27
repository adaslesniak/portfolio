import React, { useEffect, useState } from "react";

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
    <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:12 }}>
        <h2 style={{ margin:0 }}>{project.title}</h2>
        <button onClick={onClose}
          style={{ background:"#222", color:"#eee", border:"1px solid #333",
                   borderRadius:8, padding:"6px 10px", cursor:"pointer" }}>
          Close
        </button>
    </div>
    <pre style={{ whiteSpace:"pre-wrap", margin:0 }}>
       {loading ? "Loading…" : md}
    </pre>
    </div>
   </div>
);
}
