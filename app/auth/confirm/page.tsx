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
        // First check if we already have a session
        const {
          data: { session },
        } = await supabase.auth.getSession();
        if (session) {
          setStatus('Redirecting to dashboard...');
          router.push('/dashboard');
          return;
        }

        // Check URL hash for tokens (implicit flow)
        const hash = window.location.hash;
        if (hash && hash.includes('access_token')) {
          const params = new URLSearchParams(hash.substring(1));
          const access_token = params.get('access_token');
          const refresh_token = params.get('refresh_token');
          if (access_token && refresh_token) {
            setStatus('Setting up your session...');
            const { error } = await supabase.auth.setSession({
              access_token,
              refresh_token,
            });
            if (!error) {
              setStatus('Redirecting to dashboard...');
              router.push('/dashboard');
              return;
            }
            setStatus('Session error: ' + error.message);
          }
        }

        // Check URL params for code (PKCE flow)
        const params = new URLSearchParams(window.location.search);
        const code = params.get('code');
        if (code) {
          setStatus('Exchanging code...');
          const { error } = await supabase.auth.exchangeCodeForSession(code);
          if (!error) {
            setStatus('Redirecting to dashboard...');
            router.push('/dashboard');
            return;
          }
          setStatus('Code exchange error: ' + error.message);
        }

        // Listen for auth state change
        setStatus('Waiting for auth...');
        const {
          data: { subscription },
        } = supabase.auth.onAuthStateChange(async (event, session) => {
          if (event === 'SIGNED_IN' && session) {
            setStatus('Redirecting to dashboard...');
            subscription.unsubscribe();
            router.push('/dashboard');
          }
        });

        // Timeout fallback
        setTimeout(() => {
          router.push('/login');
        }, 8000);
      } catch (err) {
        setStatus('Error: ' + String(err));
        setTimeout(() => router.push('/login'), 3000);
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
