'use client';

import { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';

export default function EditServicePage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const id = searchParams.get('id');

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [loading, setLoading] = useState(true);

  // 🔥 Fetch existing service
  useEffect(() => {
    if (!id) return;

    const fetchService = async () => {
      const res = await fetch(`/api/get-service?id=${id}`);

      if (!res.ok) {
        alert('Failed to load service');
        return;
      }

      const data = await res.json();

      setTitle(data.title || '');
      setDescription(data.description || '');
      setPrice(data.price || '');
      setLoading(false);
    };

    fetchService();
  }, [id]);

  // 🔥 Update service
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch('/api/update-service', {
      method: 'POST',
      body: JSON.stringify({
        id,
        title,
        description,
        price,
      }),
    });

    if (res.ok) {
      alert('Service updated!');
      router.push('/dashboard/services'); // ✅ redirect back
    } else {
      const text = await res.text();
      alert('Error updating service: ' + text);
    }
  };

  if (loading) {
    return <div style={{ padding: '4rem' }}>Loading...</div>;
  }

  return (
    <div style={{ padding: '4rem' }}>
      <h1>Edit Service</h1>

      <form onSubmit={handleSubmit}>
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

        <button type='submit'>Update</button>
      </form>
    </div>
  );
}
