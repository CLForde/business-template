import { createClient } from '@/lib/supabase-server';

export async function GET() {
  const supabase = await createClient();

  // 🔐 get user
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return new Response('Unauthorized', { status: 401 });
  }

  // 🔥 get site (same logic as before)
  const { data: site } = await supabase
    .from('sites')
    .select('id')
    .eq('subdomain', 'barima-sands') // keep consistent for now
    .single();

  if (!site) {
    return new Response('No site found', { status: 404 });
  }

  // 📦 get services
  const { data: services } = await supabase
    .from('services')
    .select('*')
    .eq('site_id', site.id);

  return Response.json(services);
}
