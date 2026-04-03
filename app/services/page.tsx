import { supabase } from '@/lib/supabase';
import { headers } from 'next/headers';
import Link from 'next/link';
import { notFound, redirect } from 'next/navigation';
import { getSubdomain } from '@/lib/getSubdomain';

export default async function Home() {
  const headersList = await headers();
  const host = headersList.get('host') || '';
  const subdomain = getSubdomain(host);

  // ✅ THIS LINE IS THE MOST IMPORTANT FIX
  if (!subdomain || subdomain === 'www') {
    redirect('/preview');
  }

  const { data: site, error: siteError } = await supabase
    .from('sites')
    .select('*')
    .eq('subdomain', subdomain)
    .single();

  if (siteError || !site) {
    notFound();
  }

  const { data: services, error } = await supabase
    .from('services')
    .select('*')
    .eq('site_id', site.id);

  if (error) {
    notFound();
  }

  return (
    <div>
      <h1>{site.name} Services</h1>

      {services.map((service) => (
        <div key={service.id}>
          <Link href={`/site/${service.slug}`}>
            <h2>{service.name}</h2>
          </Link>
        </div>
      ))}
    </div>
  );
}
