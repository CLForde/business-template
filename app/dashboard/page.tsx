import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase-server';
import LogoutButton from '@/components/LogoutButton';
import AddServiceForm from '@/components/AddServiceForm';
import Link from 'next/link';

async function deleteService(formData: FormData) {
  'use server';

  const supabase = await createClient();

  const id = formData.get('id');

  await supabase.from('services').delete().eq('id', id);

  // This forces refresh automatically
  redirect('/dashboard');
}

export default async function Dashboard() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect('/login');

  const { data: sites } = await supabase
    .from('sites')
    .select('*')
    .eq('user_id', user.id);

  const { data: services } = await supabase
    .from('services')
    .select('*')
    .eq('site_id', sites?.[0]?.id);

  return (
    <div style={{ padding: '4rem' }}>
      <h1>Dashboard</h1>
      <LogoutButton />
      <br />
      <br />
      <a href='/dashboard/create-site'>Create New Site</a>
      <AddServiceForm />
      <br />
      <h3>Your Services</h3>
      {services?.map((service) => (
        <div key={service.id} style={{ marginBottom: '10px' }}>
          <strong>{service.title}</strong> - ${service.price}
          <p>{service.description}</p>
          <form action={deleteService}>
            <input type='hidden' name='id' value={service.id} />
            <button type='submit'>Delete</button>
          </form>
          <Link href={`/dashboard/edit-service/${service.id}`}>Edit</Link>{' '}
          <button>Edit</button>{' '}
        </div>
      ))}

      <ul>
        {sites?.map((site) => (
          <li key={site.id}>
            {site.name} ({site.subdomain})
          </li>
        ))}
      </ul>
    </div>
  );
}
