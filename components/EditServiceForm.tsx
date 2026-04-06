'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';

type Service = {
  id: string;
  title: string;
  description: string;
  price: number | string;
};

type EditServiceFormProps = {
  service: Service;
};

export default function EditServiceForm({ service }: EditServiceFormProps) {
  const router = useRouter();

  const [title, setTitle] = useState(service.title || '');
  const [description, setDescription] = useState(service.description || '');
  const [price, setPrice] = useState(String(service.price ?? ''));
  const [loading, setLoading] = useState(false);

  const handleUpdateService = async () => {
    setLoading(true);
    const cleanPrice = price.replace(/[^0-9.]/g, '');
    const { error } = await supabase
      .from('services')
      .update({
        title,
        description,
        price: Number(cleanPrice),
      })
      .eq('id', service.id);

    setLoading(false);

    if (error) {
      console.error(error);
      alert('Error updating service');
      return;
    }

    alert('Service updated');
    router.push('/dashboard');
    router.refresh();
  };

  return (
    <div style={{ marginTop: '20px' }}>
      <input
        placeholder='Title'
        value={title}
        onChange={(e) => setTitle(e.target.value)}
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

      <input
        placeholder='Price'
        value={price}
        onChange={(e) => setPrice(e.target.value)}
      />

      <br />
      <br />

      <button onClick={handleUpdateService} disabled={loading}>
        {loading ? 'Updating...' : 'Update Service'}
      </button>
    </div>
  );
}
