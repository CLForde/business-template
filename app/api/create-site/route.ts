import { supabase } from '@/lib/supabase';

export async function POST(req: Request) {
  const body = await req.json();
  const { name, subdomain } = body;

  // Insert into database
  const { error } = await supabase.from('sites').insert([
    {
      name,
      subdomain,
    },
  ]);

  if (error) {
    return Response.json({ message: 'Error creating site' });
  }

  return Response.json({ message: 'Site created successfully!' });
}
