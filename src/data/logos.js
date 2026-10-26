// Vite gives these small display assets content hashes and long-lived caching.
const assets = import.meta.glob("../assets/logos/*.webp", {
  eager: true,
  query: "?url",
  import: "default",
});

export function carLogo(id, size = "small") {
  return assets[`../assets/logos/${id}-${size}.webp`];
}
