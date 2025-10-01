import React from "react";

export function Header({ siteInfo, onOpenView }) {
  return (
    <header
      className="header"
      style={{
        display: "grid",
        gridTemplateColumns: "minmax(0,1fr) auto", // wide left, avatar right
        gridTemplateRows: "auto auto",             // two rows in the header
        gap: 24,
        alignItems: "start",
        paddingTop: 10,                            // push content up inside the card
      }}
    >
      {/* Left column spans both rows: top = nav, bottom = title/tagline */}
      <div
        style={{
          gridRow: "1 / span 2",
          display: "grid",
          gridTemplateRows: "auto 1fr",
          rowGap: 8,
          minWidth: 0,
        }}
      >
        <nav
          aria-label="Primary"
          className="nav-links"
          style={{
            display: "flex",
            gap: 9,
            flexWrap: "wrap",
            alignItems: "center",
            lineHeight: 1.2,
            marginTop: -2,                         // nudges the buttons even closer to the top
            marginBottom: 12
          }}
        >
          <a className="nav-btn" href={siteInfo?.about} onClick={(e) => {e.preventDefault(); onOpenView?.("about")}} >About Me</a>
          <a className="nav-btn" href="https://aulendil.net/hallucinations/">AI Notes</a>
          <a className="nav-btn"  href={siteInfo?.cv} onClick={(e) => { e.preventDefault(); onOpenView?.("cv"); }} >CV</a>
          <a className="nav-btn" href="https://www.linkedin.com/in/adas-lesniak/" target="_blank" rel="noopener noreferrer">Contact</a>
        </nav>

        <div className="header-text">
          <h1 className="title" style={{ margin: "2px 0 0 0" }}>{siteInfo.name ?? "—"}</h1>
          <p className="tagline" style={{ margin: "4px 0 0 0" }}>{siteInfo.tagline ?? ""}</p>
        </div>
      </div>

      {/* Right column: avatar spans both rows */}
      {siteInfo.avatar ? (
        <img
          src={siteInfo.avatar}
          alt="avatar"
          className="avatar"
          style={{
            gridRow: "1 / span 2",   
            width: 133,     
            height: 133,
            objectFit: "cover",
            borderRadius: "50%",
            alignSelf: "center",
            justifySelf: "center",
            boxShadow: "0 6px 20px rgba(0,0,0,.35)",
          }}
        />
      ) : null}
    </header>
  );
}
