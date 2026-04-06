'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';

export default function AddServiceForm() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleAddService = async () => {
    setLoading(true);

    const cleanPrice = price.replace(/[^0-9.]/g, '');

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      alert('Not logged in');
      setLoading(false);
      return;
    }

    const { data: sites, error: siteError } = await supabase
      .from('sites')
      .select('*')
      .eq('user_id', user.id)
      .limit(1);

    if (siteError) {
      console.log(siteError);
      alert('Error fetching site');
      setLoading(false);
      return;
    }

    const site = sites?.[0];

    if (!site) {
      alert('No site found');
      setLoading(false);
      return;
    }

    const { error } = await supabase.from('services').insert([
      {
        site_id: site.id,
        title,
        description,
        price: Number(cleanPrice),
      },
    ]);

    if (error) {
      console.log(error);
      alert('Error adding service');
    } else {
      alert('Service added');
      setTitle('');
      setDescription('');
      setPrice('');
      router.refresh();
      window.location.reload(); // Force reload to update the list of services
    }

    setLoading(false);
  };

  return (
    <div style={{ marginTop: '20px' }}>
      <h3>Add Service</h3>

      <input
        placeholder='Title'
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <br />

      <textarea
        placeholder='Description'
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <br />

      <input
        placeholder='Price'
        value={price}
        onChange={(e) => setPrice(e.target.value)}
      />

      <br />

      <button onClick={handleAddService} disabled={loading}>
        {loading ? 'Adding...' : 'Add Service'}
      </button>
    </div>
  );
}
