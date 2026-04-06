'use client';

import { useState } from 'react';
import { createClient } from '@/lib/supabase-browser';
import { useRouter } from 'next/navigation';

export default function CreateSitePage() {
  const supabase = createClient();
  const router = useRouter();

  // ✅ DEFINE STATES (this fixes your errors)
  const [name, setName] = useState('');
  const [subdomain, setSubdomain] = useState('');
  const [description, setDescription] = useState('');

  const handleCreate = async () => {
    const { data, error: userError } = await supabase.auth.getUser();
    const user = data?.user;

    if (userError || !user) {
      alert('User not authenticated');
      return;
    }

    const { error } = await supabase.from('sites').insert([
      {
        user_id: user.id,
        name,
        subdomain,
        description,
      },
    ]);

    if (error) {
      console.log(error); // 👈 IMPORTANT
      alert(error.message);
    } else {
      router.push('/dashboard');
    }
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Create Your Site</h1>

      <input
        placeholder='Business Name'
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <br />
      <br />

      <input
        placeholder='Subdomain (e.g. barima)'
        value={subdomain}
        onChange={(e) => setSubdomain(e.target.value)}
      />

      <br />
      <br />

      <textarea
        placeholder='Description'
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <br />
      <br />

      <button onClick={handleCreate}>Create Site</button>
    </div>
  );
}
