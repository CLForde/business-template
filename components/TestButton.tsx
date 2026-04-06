'use client';

import { supabase } from '@/lib/supabase';

export default function TestButton() {
  const addTestService = async () => {
    console.log('BUTTON CLICKED');

    const {
      data: { user },
    } = await supabase.auth.getUser();

    console.log('USER:', user);

    if (!user) return alert('Not logged in');

    const { data: sites, error: siteError } = await supabase
      .from('sites')
      .select('*')
      .eq('user_id', user.id)
      .limit(1);

    console.log('SITES:', sites);
    console.log('SITE ERROR:', siteError);

    const site = sites?.[0];

    console.log('SITE:', site);

    if (!site) return alert('No site found');

    const payload = {
      site_id: site.id,
      title: 'Test Service',
      description: 'This is a test',
      price: '500',
    };

    console.log('INSERTING:', payload);

    const { data, error } = await supabase.from('services').insert([payload]);

    console.log('INSERT RESPONSE:', data);
    console.log('INSERT ERROR:', error);

    if (error) {
      alert('Error creating service');
    } else {
      alert('Service created');
    }
  };

  return (
    <button
      onClick={addTestService}
      style={{
        padding: '10px 20px',
        background: 'black',
        color: 'white',
        borderRadius: '6px',
        cursor: 'pointer',
        marginTop: '10px',
      }}
    >
      Add Test Service
    </button>
  );
}
