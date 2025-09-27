import React from "react";

export default function ProjectCard({ title, summary }) {
  return (
    <article className="card">
      <h2 className="card-title">{title}</h2>
      <p className="card-summary">{summary}</p>
    </article>
  );
}
