export function getSubdomain(host: string | null) {
  if (!host) return null;

  const parts = host.split('.');

  // localhost case
  if (host.includes('localhost')) {
    return parts[0] === 'localhost' ? null : parts[0];
  }

  // vercel domain case
  if (parts.length > 2) {
    return parts[0];
  }

  return null;
}
