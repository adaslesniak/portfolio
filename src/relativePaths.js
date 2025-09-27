export function resolveAsset(jsonPath, asset) {
  if (!asset) return null;

  // leave absolute URLs or root-absolute paths untouched
  if (/^(https?:|data:|blob:|\/)/i.test(asset)) return asset;

  // allow "cover.jpg" or "images/cover.jpg" (auto-add "./")
  const rel = asset.startsWith(".") ? asset : `./${asset}`;

  // base dir of the JSON path (drop filename)
  const base = jsonPath.slice(0, jsonPath.lastIndexOf("/") + 1);

  // join + normalize "./" and accidental double slashes (but not schemes)
  const joined = base + rel;
  return joined
    .replace(/\/\.\//g, "/")
    .replace(/(^|[^:])\/{2,}/g, "$1/");
}
