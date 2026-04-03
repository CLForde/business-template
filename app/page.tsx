export const dynamic = 'force-dynamic';
import { headers } from 'next/headers';
import { getSubdomain } from '@/lib/getSubdomain';

export default async function HomePage() {
  const headersList = await headers();
  const host = headersList.get('host');
  const subdomain = getSubdomain(host);

  return (
    <main style={{ fontFamily: 'sans-serif', padding: '4rem' }}>
      <h1>Debug Info</h1>
      <p>
        <strong>Host:</strong> {host}
      </p>
      <p>
        <strong>Subdomain detected:</strong> {subdomain ?? 'null (good!)'}
      </p>
    </main>
  );
}
