import { createClient } from '@/lib/supabase-server';

export async function GET(req: Request) {
  const supabase = await createClient();

  const { searchParams } = new URL(req.url);
  const id = searchParams.get('id');

  const { data, error } = await supabase
    .from('services')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    return new Response('Service not found', { status: 404 });
  }

  return Response.json(data);
}
