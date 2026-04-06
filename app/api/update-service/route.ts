import { createClient } from '@/lib/supabase-server';

export async function POST(req: Request) {
  const supabase = await createClient();

  const body = await req.json();
  const { id, title, description, price } = body;

  const { error } = await supabase
    .from('services')
    .update({
      title,
      description,
      price,
    })
    .eq('id', id);

  if (error) {
    return new Response('Error updating service', { status: 500 });
  }

  return new Response('Updated', { status: 200 });
}
