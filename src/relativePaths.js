export function basePath(fileUrl) {
  if (!fileUrl) return "";
  return fileUrl.substring(0, fileUrl.lastIndexOf("/") + 1);
}

export function assetUrl(base, asset) {
  if (!asset) return null;
  if (/^(https?:|data:|blob:|\/)/i.test(asset)) return asset; // leave absolute URLs or root-absolute paths untouched

  const rel = asset.startsWith(".") ? asset : `./${asset}`; // allow "cover.jpg" or "images/cover.jpg" (auto-add "./")

  // join + normalize "./" and accidental double slashes (but not schemes)
  const joined = base + rel;
  return joined
    .replace(/\/\.\//g, "/")
    .replace(/(^|[^:])\/{2,}/g, "$1/");
}
