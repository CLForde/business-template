'use client';
import { createClient } from '@/lib/supabase-browser';
import Image from 'next/image';

export default function LoginPage() {
  const supabase = createClient();
  const handleGoogleLogin = async () => {
    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${location.origin}/auth/confirm`,
        skipBrowserRedirect: false,
      },
    });
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        background: '#FAFCF7',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: "'DM Sans', sans-serif",
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@700;900&family=DM+Sans:wght@400;500&display=swap');
        .login-card { background: white; border: 1.5px solid #E4EDD8; border-radius: 20px; padding: 48px 40px; text-align: center; width: 100%; max-width: 420px; box-shadow: 0 8px 40px rgba(0,0,0,0.06); }
        .login-logo { display: flex; align-items: center; justify-content: center; gap: 10px; margin-bottom: 32px; }
        .login-wordmark { font-family: 'Montserrat', sans-serif; font-weight: 800; font-size: 22px; color: #111A0A; }
        .login-wordmark span { color: #5BA614; }
        .login-title { font-family: 'Montserrat', sans-serif; font-weight: 900; font-size: 24px; color: #111A0A; margin-bottom: 8px; }
        .login-sub { font-size: 14px; color: #6B7A60; margin-bottom: 32px; line-height: 1.6; }
        .google-btn { display: flex; align-items: center; justify-content: center; gap: 12px; width: 100%; padding: 14px 24px; background: white; border: 1.5px solid #E4EDD8; border-radius: 10px; font-family: 'DM Sans', sans-serif; font-weight: 500; font-size: 15px; color: #1E2A14; cursor: pointer; transition: all 0.2s; }
        .google-btn:hover { border-color: #F7941D; box-shadow: 0 4px 16px rgba(247,148,29,0.15); transform: translateY(-1px); }
        .login-footer { margin-top: 24px; font-size: 12px; color: #6B7A60; }
      `}</style>
      <div className='login-card'>
        <div className='login-logo'>
          <Image
            src='/logos/logo.jpeg'
            alt='BarimaVenture'
            width={42}
            height={42}
            style={{ borderRadius: '8px', objectFit: 'contain' }}
          />
          <div className='login-wordmark'>
            Barima<span>Venture</span>
          </div>
        </div>
        <div className='login-title'>Welcome Back</div>
        <div className='login-sub'>
          Sign in to manage your business website and connect with customers.
        </div>
        <button className='google-btn' onClick={handleGoogleLogin}>
          <svg width='20' height='20' viewBox='0 0 24 24'>
            <path
              fill='#4285F4'
              d='M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z'
            />
            <path
              fill='#34A853'
              d='M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z'
            />
            <path
              fill='#FBBC05'
              d='M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z'
            />
            <path
              fill='#EA4335'
              d='M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z'
            />
          </svg>
          Continue with Google
        </button>
        <div className='login-footer'>
          By signing in you agree to our terms of service
        </div>
      </div>
    </div>
  );
}
