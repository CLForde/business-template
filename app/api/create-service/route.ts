import { createClient } from '@/lib/supabase-server';

export async function POST(req: Request) {
  const supabase = await createClient();

  // 🔐 get user
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return new Response('Unauthorized', { status: 401 });
  }

  const body = await req.json();
  const { title, description, price } = body;

  // 🔥 get user's site (AUTO)
  const { data: site, error: siteError } = await supabase
    .from('sites')
    .select('id')
    .eq('user_id', user.id)
    .single();

  if (siteError || !site) {
    return new Response('No site found for user', { status: 404 });
  }

  // 🔗 generate slug
  const slug = title
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w-]+/g, '');

  // 🚀 insert
  const { error } = await supabase.from('services').insert({
    title,
    description,
    price,
    slug,
    site_id: site.id,
  });

  if (error) {
    return new Response(error.message, { status: 500 });
  }

  return new Response('OK');
}
