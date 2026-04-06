import { createClient } from '@/lib/supabase-server';

export async function POST(req: Request) {
  const supabase = await createClient();

  const body = await req.json();
  const { id } = body;

  const { error } = await supabase.from('services').delete().eq('id', id);

  if (error) {
    return new Response('Error deleting service', { status: 500 });
  }

  return new Response('Deleted', { status: 200 });
}
