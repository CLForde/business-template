import { createClient } from '@/lib/supabase-server';
import { notFound } from 'next/navigation';
type Props = {
  params: Promise<{
    subdomain: string;
    slug: string;
  }>;
};

export default async function ServicePage({ params }: Props) {
  const { subdomain, slug } = await params; // ✅ REQUIRED

  const supabase = await createClient();

  const { data: site } = await supabase
    .from('sites')
    .select('*')
    .eq('subdomain', subdomain)
    .single();

  if (!site) return notFound();

  const { data: service } = await supabase
    .from('services')
    .select('*')
    .eq('slug', slug)
    .eq('site_id', site.id)
    .single();

  if (!service) return notFound();

  return (
    <div style={{ padding: '4rem' }}>
      <h1>{service.title}</h1>
      <p>{service.description}</p>
      <strong>${service.price}</strong>
    </div>
  );
}
