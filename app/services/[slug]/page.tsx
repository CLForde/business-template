import { supabase } from '@/lib/supabase';
import { headers } from 'next/headers';
import { notFound } from 'next/navigation';
import { getSubdomain } from '@/lib/getSubdomain';

type Props = {
  params: { slug: string };
};

export default async function Page({ params }: Props) {
  const headersList = await headers();
  const host = headersList.get('host') || '';

  const subdomain = getSubdomain(host);

  const { slug } = params;

  const { data: site, error: siteError } = await supabase
    .from('sites')
    .select('*')
    .eq('subdomain', subdomain)
    .single();

  if (siteError || !site) {
    notFound();
  }

  const { data: service, error: serviceError } = await supabase
    .from('services')
    .select('*')
    .eq('slug', slug)
    .eq('site_id', site.id)
    .single();

  if (serviceError || !service) {
    notFound();
  }

  return (
    <div>
      <h1>{service.name}</h1>
      <p>{service.description}</p>
    </div>
  );
}
