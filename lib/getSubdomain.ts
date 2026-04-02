export function getSubdomain(host: string | null) {
  if (!host) return null;

  const hostname = host.split(':')[0]; // remove port

  // 🧪 LOCAL DEV
  if (hostname.includes('localhost')) {
    const parts = hostname.split('.');

    if (parts.length === 1) {
      return 'barima'; // default site
    }

    return parts[0]; // test.localhost → "test"
  }

  // 🌍 PRODUCTION DOMAIN
  const domain = 'barimaventure.com';

  // ROOT DOMAIN → main site
  if (hostname === domain || hostname === `www.${domain}`) {
    return 'barima'; // your main site
  }

  // SUBDOMAIN → tenant
  if (hostname.endsWith(`.${domain}`)) {
    return hostname.split('.')[0];
  }

  return null;
}
