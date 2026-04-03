export const dynamic = 'force-dynamic';
import { supabase } from '@/lib/supabase';
import { headers } from 'next/headers';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getSubdomain } from '@/lib/getSubdomain';

export default async function HomePage() {
  const headersList = await headers();
  const host = headersList.get('host');
  const subdomain = getSubdomain(host);

  if (!subdomain) {
    return (
      <main
        style={{
          fontFamily: 'sans-serif',
          padding: '4rem',
          textAlign: 'center',
        }}
      >
        <h1>Welcome to BarimaVenture</h1>
        <p>Create your own beautiful business website in minutes.</p>
        <Link href='/create' style={{ marginRight: '1rem' }}>
          Get Started
        </Link>
        <Link href='/preview'>Preview</Link>
      </main>
    );
  }

  const { data: site, error: siteError } = await supabase
    .from('sites')
    .select('*')
    .eq('subdomain', subdomain)
    .single();

  if (siteError || !site) {
    notFound();
  }

  return (
    <div>
      <h1>{site.name}</h1>
      <p>Welcome to {site.name}</p>
      <Link href='/services'>View Services</Link>
    </div>
  );
}
