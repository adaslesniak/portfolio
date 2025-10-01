import React from "react";
import ProjectCard from "./ProjectCard";
import { Header } from "./Header";

export default function ProjectsList({ siteInfo, projects, onOpenProject, onOpenView }) {
  return (
    <>
      <Header siteInfo={siteInfo} onOpenView={onOpenView} />
      <main className="main">
        {projects.map((p) => (
          <ProjectCard key={p} src={p} onOpen={onOpenProject} />
        ))}
      </main>
    </>
  );
}
