const ROOT_DOMAINS = ['vercel.app'];

export function getSubdomain(host: string | null): string | null {
  if (!host) return null;

  const hostname = host.split(':')[0];
  const parts = hostname.split('.');

  if (hostname === 'localhost') return null;

  for (const root of ROOT_DOMAINS) {
    if (hostname.endsWith(root)) {
      const subParts = parts.slice(0, parts.length - root.split('.').length);
      // e.g. myshop.business-template-qekt.vercel.app → subParts = ['myshop', 'business-template-qekt']
      // We only want a real user subdomain, not the base project name
      if (subParts.length === 1) {
        return subParts[0];
      }
      return null; // root project domain, no subdomain
    }
  }

  return null;
}
