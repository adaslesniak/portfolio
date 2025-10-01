import React from "react"
export function Header({siteInfo}) {
  return <header
    className="header"
    style={{
      display: "grid",
      gridTemplateColumns: "minmax(0,1fr) auto", // wide left, avatar right
      alignItems: "start",
      gap: 24,
    }}
  >
    {/* Left column: top row = nav, bottom = title+tagline */}
    <div
      style={{
        display: "grid",
        gridTemplateRows: "auto 1fr",
        rowGap: 8,
        minWidth: 0, // prevents text overflow pushing the avatar
      }}
    >
      <nav
        aria-label="Primary"
        className="nav-links"
        style={{
          display: "flex",
          gap: 16,
          flexWrap: "wrap",      // stays tidy on small screens
          alignItems: "center",
          fontSize: 14,
          opacity: 0.9,
          lineHeight: 1.2,
        }}
      >
        <a href="https://aulendil.net/hallucinations/about-me/" style={{ textDecoration: "none", color: "inherit" }}>About Me</a>
        <a href="https://aulendil.net/hallucinations/" style={{ textDecoration: "none", color: "inherit" }}>AI Notes</a>
        <a href="https://www.aulendil.net/cv" target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none", color: "inherit" }}>CV</a>
        <a href="https://www.linkedin.com/in/adas-lesniak/" target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none", color: "inherit" }}>Contact</a>
      </nav>

      <div className="header-text">
        <h1 className="title" style={{ margin: "4px 0 0 0" }}>{siteInfo.name ?? "—"}</h1>
        <p className="tagline" style={{ margin: "4px 0 0 0" }}>{siteInfo.tagline ?? ""}</p>
      </div>
    </div>

    {/* Right column: avatar */}
    {siteInfo.avatar ? (
      <img
        src={siteInfo.avatar}
        alt="avatar"
        className="avatar"
        style={{
          width: 72,
          height: 72,
          objectFit: "cover",
          borderRadius: "50%",
          alignSelf: "start",
        }}
      />
    ) : null}
  </header>
}