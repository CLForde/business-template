'use client';
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';

export default function AuthConfirm() {
  const router = useRouter();
  const [status, setStatus] = useState('Signing you in...');

  useEffect(() => {
    const handleAuth = async () => {
      try {
        const hash = window.location.hash;
        const urlParams = new URLSearchParams(window.location.search);

        // Try hash tokens first (implicit flow)
        if (hash && hash.includes('access_token')) {
          const params = new URLSearchParams(hash.substring(1));
          const access_token = params.get('access_token');
          const refresh_token = params.get('refresh_token');

          if (access_token) {
            setStatus('Setting session...');
            const { data, error } = await supabase.auth.setSession({
              access_token,
              refresh_token: refresh_token || '',
            });
            if (data.session) {
              setStatus('Success! Redirecting...');
              window.location.href = '/dashboard';
              return;
            }
            if (error) setStatus('Error: ' + error.message);
          }
        }

        // Try PKCE code
        const code = urlParams.get('code');
        if (code) {
          setStatus('Exchanging code...');
          const { data, error } =
            await supabase.auth.exchangeCodeForSession(code);
          if (data.session) {
            setStatus('Success! Redirecting...');
            window.location.href = '/dashboard';
            return;
          }
          if (error) setStatus('Code error: ' + error.message);
        }

        // Check existing session
        const {
          data: { session },
        } = await supabase.auth.getSession();
        if (session) {
          setStatus('Session found! Redirecting...');
          window.location.href = '/dashboard';
          return;
        }

        setStatus('No session found. Redirecting to login...');
        setTimeout(() => {
          window.location.href = '/login';
        }, 2000);
      } catch (err) {
        setStatus('Unexpected error: ' + String(err));
        setTimeout(() => {
          window.location.href = '/login';
        }, 3000);
      }
    };

    handleAuth();
  }, [router]);

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: 'sans-serif',
        background: '#FAFCF7',
      }}
    >
      <div style={{ textAlign: 'center' }}>
        <div style={{ fontSize: '32px', marginBottom: '16px' }}>⏳</div>
        <p style={{ color: '#6B7A60', fontSize: '15px' }}>{status}</p>
      </div>
    </div>
  );
}
