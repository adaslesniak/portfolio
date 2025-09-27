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

  return (
    <article className="card">
      {data.thumbnail && (
        <img
          src={data.thumbnail}
          alt={data.title}
          style={{ width:"100%", height:180, objectFit:"cover", borderRadius:12, marginBottom:12 }}
        />
      )}
      <h2 className="card-title">{data.title}</h2>
      <p className="card-summary">{data.summary}</p>
      {data.tags?.length ? (
        <div className="tags">
          {data.tags.map((t, i) => <span className="badge" key={i}>{t}</span>)}
        </div>
      ) : null}
    </article>
  );
}
