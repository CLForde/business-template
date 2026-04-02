'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabase';

export default function CreateSite() {
  const [name, setName] = useState('');
  const [subdomain, setSubdomain] = useState('');
  const [loading, setLoading] = useState(false);

  const handleCreate = async () => {
    setLoading(true);

    const { error } = await supabase.from('sites').insert([
      {
        name,
        subdomain,
      },
    ]);

    setLoading(false);

    if (error) {
      alert(error.message);
      console.log(error);
    } else {
      window.location.href = `http://${subdomain}.localhost:3000`;
    }
  };

  return (
    <div>
      <h1>Create Your Site</h1>

      <input
        placeholder='Site Name'
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <input
        placeholder='Subdomain (e.g. john)'
        value={subdomain}
        onChange={(e) => setSubdomain(e.target.value)}
      />

      <button onClick={handleCreate} disabled={loading}>
        {loading ? 'Creating...' : 'Create Site'}
      </button>
    </div>
  );
}
