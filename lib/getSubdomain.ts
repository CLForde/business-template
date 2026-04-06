export function getSubdomain(host: string | null) {
  if (!host) return null;

  // localhost:3000 → site/barima-sands handled differently
  if (host.includes('localhost')) {
    return null;
  }

  const parts = host.split('.');
  return parts.length > 2 ? parts[0] : null;
}
