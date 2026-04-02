import { supabase } from '@/lib/supabase';
import { headers } from 'next/headers';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getSubdomain } from '@/lib/getSubdomain';

export default async function ServicesPage() {
  const headersList = await headers();
  const host = headersList.get('host');
  const subdomain = getSubdomain(host);
  // ✅ 1. Get site
  const { data: site, error: siteError } = await supabase
    .from('sites')
    .select('*')
    .eq('subdomain', subdomain)
    .single();

  if (siteError || !site) {
    notFound();
  }

  // ✅ 2. Get services
  const { data: services, error } = await supabase
    .from('services')
    .select('*')
    .eq('site_id', site.id);

  if (error) {
    notFound(); // or you could show a nicer fallback later
  }

  // ✅ Optional: empty state
  if (!services || services.length === 0) {
    return <div>No services available</div>;
  }

  // ✅ 3. Render
  return (
    <div>
      <h1>{site.name} Services</h1>

      {services.map((service) => (
        <div key={service.id} style={{ marginBottom: '20px' }}>
          <Link href={`/${service.slug}`}>
            <h2 style={{ color: 'blue', cursor: 'pointer' }}>{service.name}</h2>
          </Link>

          <p>{service.description}</p>
        </div>
      ))}
    </div>
  );
}
