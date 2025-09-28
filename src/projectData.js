import { basePath, assetUrl } from "./relativePaths";


export function projectData(jsonPath, jsonData) {
  const folder = basePath(jsonPath);                       // "./content/foo/"
  const slug = (jsonData.slug || jsonPath.split("/").slice(-2, -1)[0]).toLowerCase();

  return {
    slug,
    path: jsonPath,
    content: folder,

    title: jsonData.title ?? "Untitled",
    summary: jsonData.summary ?? "",
    date: jsonData.date ?? "",
    tags: jsonData.main_tags ?? jsonData.aux_tags ?? [],
    aux_tags: jsonData.aux_tags ?? [],

    thumbnail: assetUrl(folder, jsonData.thumbnail),
    details:   assetUrl(folder, jsonData.details),
  };
}