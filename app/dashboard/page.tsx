import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';

export default async function Dashboard() {
  const cookieStore = await cookies();
  const allCookies = cookieStore.getAll();
  const hasSession = allCookies.some(
    (c) => c.name.includes('sb-') && c.name.includes('-auth-token'),
  );

  if (!hasSession) {
    redirect('/login');
  }

  return (
    <div style={{ padding: '4rem', fontFamily: 'sans-serif' }}>
      <h1>Dashboard</h1>
      <p>You are logged in!</p>
    </div>
  );
}
