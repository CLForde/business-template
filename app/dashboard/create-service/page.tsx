'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';

export default function CreateServicePage() {
  const [userId, setUserId] = useState<string>('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');

  useEffect(() => {
    const getUser = async () => {
      const {
        data: { user },
        error,
      } = await supabase.auth.getUser();

      if (error) {
        console.error('Error getting user:', error);
        return;
      }

      setUserId(user?.id || '');
      console.log('Current user ID:', user?.id);
    };

    getUser();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch('/api/create-service', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title, description, price }),
    });

    const text = await res.text();

    if (res.ok) {
      alert('Service created!');
      setTitle('');
      setDescription('');
      setPrice('');
    } else {
      console.error('Create service failed:', text);
      alert(`Error creating service: ${text}`);
    }
  };

  return (
    <div style={{ padding: '4rem' }}>
      <h1>Create Service</h1>

      <p>
        <strong>Debug User ID:</strong> {userId || 'No user found'}
      </p>

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

        <button type='submit'>Create</button>
      </form>
    </div>
  );
}
