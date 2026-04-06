import { createClient } from '@/lib/supabase-server';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { headers } from 'next/headers';
import { getSubdomain } from '@/lib/getSubdomain';

type Props = {
  params: Promise<{
    subdomain: string;
  }>;
};

export default async function SitePage({ params }: Props) {
  const supabase = await createClient();

  // ✅ FIX: unwrap params
  const { subdomain } = await params;

  // ✅ FIX: await headers()
  const headersList = await headers();
  const host = headersList.get('host');

  const detectedSubdomain = getSubdomain(host) || subdomain;

  const { data: site, error: siteError } = await supabase
    .from('sites')
    .select('*')
    .eq('subdomain', detectedSubdomain)
    .single();

  if (siteError || !site) return notFound();

  const { data: services } = await supabase
    .from('services')
    .select('*')
    .eq('site_id', site.id);

  return (
    <div style={{ padding: '4rem' }}>
      <h1>{site.name}</h1>

      <ul>
        {services?.map((service) => (
          <li key={service.id}>
            <Link href={`/site/${site.subdomain}/${service.slug}`}>
              {service.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
