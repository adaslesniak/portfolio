import React, { useEffect } from "react";

export default function CvOverlay({ open, siteInfo, onClose }) {

  // lock page scroll while overlay is open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  if (!open) return null;

  return (
    <div
      aria-modal="true" role="dialog"
      onClick={onClose}
      style={{
        position: "fixed", inset: 0, zIndex: 1000,
        background: "rgba(0,0,0,.65)",
        display: "flex", alignItems: "center", justifyContent: "center",
        padding: 16
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          width: "min(1100px, 96vw)",
          height: "min(90vh, 1200px)",
          background: "#111214",
          border: "1px solid #2a2f36",
          borderRadius: 12,
          boxShadow: "0 10px 30px rgba(0,0,0,.5)",
          display: "flex",
          flexDirection: "column",
          overflow: "hidden"
        }}
      >
        <div className="overlayButtons">
            <a className="overlayBtn" href={siteInfo.cv} download="Adam_Lesniak_CV.pdf">Download</a>
            <button className="overlayBtn" onClick={onClose} autoFocus>Close</button>
        </div>

        {/* PDF viewer */}
        <div style={{ position: "relative", flex: 1, background: "#0b0b0b" }}>
          <iframe
            title="CV"
            src={siteInfo.cv}
            style={{ border: "none", width: "100%", height: "100%", display: "block" }}
          />
          {/* Visual mask to hide any built-in viewer toolbar (e.g., Firefox PDF.js) */}
          <div
            className="pdf-mask"
            style={{
              position: "absolute", top: 0, left: 0, right: 0, height: 42,
              background: "#111214", pointerEvents: "none"
            }}
          />
        </div>

        {/* Fallback link if the PDF cannot be embedded */}
        <div style={{ padding: 8, borderTop: "1px solid #2a2f36", textAlign: "center", fontSize: 12, opacity: .8 }}>
          Having trouble viewing the PDF? <a href={siteInfo.cv} target="_blank" rel="noopener noreferrer">Open in new tab</a>.
        </div>
      </div>
    </div>
  );
}
