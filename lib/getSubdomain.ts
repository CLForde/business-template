const ROOT_DOMAINS = ['vercel.app'];
const BASE_HOSTNAME = 'business-template-qekt.vercel.app';

export function getSubdomain(host: string | null): string | null {
  if (!host) return null;

  const hostname = host.split(':')[0];

  // Exact match on base domain = no subdomain
  if (hostname === BASE_HOSTNAME) return null;
  if (hostname === 'localhost') return null;

  const parts = hostname.split('.');

  for (const root of ROOT_DOMAINS) {
    if (hostname.endsWith(root)) {
      const subParts = parts.slice(0, parts.length - root.split('.').length);
      // Only a real user subdomain if there's exactly 1 part
      // AND it's not the base project name
      if (subParts.length === 1 && subParts[0] !== 'business-template-qekt') {
        return subParts[0];
      }
      return null;
    }
  }

  return null;
}
