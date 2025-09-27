import React from "react";
import { useProject } from "./useProject";

export default function ProjectCard({ src }) {
  const { data, loading, error } = useProject(src);

  if (loading) {
    return (
      <article className="card">
        <div className="card-title">Loading…</div>
        <p className="card-summary">Fetching {src}</p>
      </article>
    );
  }
  if (error) {
    return (
      <article className="card">
        <div className="card-title">Failed to load</div>
        <p className="card-summary" style={{ color: "#f88" }}>{error}</p>
      </article>
    );
  }

  const monthYear = (s = "") => {
    const p = s.split(/[-/]/);
    let y, m;
    if (p[2]?.length === 4) { y = p[2]; m = p[1]; } // DD-MM-YYYY
    else return s;
    const names = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
    const mi = parseInt(m, 10);
    return names[mi - 1] ? `${names[mi - 1]} ${y}` : s;
  };

  return (
    <article className="card">
      <img src={data.thumbnail} alt={data.title} />
      <div className="card-date">{monthYear(data.date)}</div>

      <div className="card-main">
        <h2 className="card-title">{data.title}</h2>
        <p className="card-summary">{data.summary}</p>
        <div className="card-tags">
          {data.tags.map((t, i) => <span className="badge" key={i}>{t}</span>)}
        </div>
      </div>
    </article>
  );

}
