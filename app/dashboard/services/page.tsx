'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function ServicesPage() {
  const [services, setServices] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // 🔥 FETCH SERVICES
  useEffect(() => {
    const fetchServices = async () => {
      const res = await fetch('/api/get-services');
      const data = await res.json();

      setServices(data);
      setLoading(false);
    };

    fetchServices();
  }, []);

  // 🔥 DELETE SERVICE
  const handleDelete = async (id: string) => {
    const res = await fetch('/api/delete-service', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id }),
    });

    if (res.ok) {
      // remove from UI instantly
      setServices((prev) => prev.filter((s) => s.id !== id));
    } else {
      alert('Error deleting service');
    }
  };

  return (
    <div style={{ padding: '4rem' }}>
      <h1>Your Services</h1>

      <br />

      <Link href='/dashboard/create-service'>+ Add New Service</Link>

      <br />
      <br />

      {loading && <p>Loading...</p>}

      {!loading && services.length === 0 && <p>No services yet</p>}

      <ul>
        {services.map((service) => (
          <li key={service.id} style={{ marginBottom: '1rem' }}>
            <strong>{service.title}</strong> — ${service.price}
            <br />
            <Link href={`/dashboard/edit-service?id=${service.id}`}>
              Edit
            </Link>{' '}
            | <button onClick={() => handleDelete(service.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
