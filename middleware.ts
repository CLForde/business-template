import { NextResponse, type NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  if (request.nextUrl.pathname.startsWith('/auth')) {
    return NextResponse.next();
  }

  const allCookies = request.cookies.getAll();
  const hasSession = allCookies.some(
    (cookie) =>
      cookie.name.includes('sb-') && cookie.name.includes('-auth-token'),
  );

  if (
    !hasSession &&
    (request.nextUrl.pathname.startsWith('/dashboard') ||
      request.nextUrl.pathname.startsWith('/create'))
  ) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*', '/create/:path*'],
};
