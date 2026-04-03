export function getSubdomain(host: string | null): string | null {
  if (!host) return null;

  const hostname = host.split(':')[0].toLowerCase();

  // Never treat these as subdomains
  const rootHostnames = ['localhost', 'business-template-qekt.vercel.app'];

  if (rootHostnames.includes(hostname)) return null;

  // Must be something like: mysite.business-template-qekt.vercel.app
  const suffix = '.business-template-qekt.vercel.app';
  if (hostname.endsWith(suffix)) {
    const sub = hostname.replace(suffix, '');
    if (sub && !sub.includes('.')) return sub;
  }

  return null;
}
