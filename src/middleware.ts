import { NextRequest, NextResponse } from 'next/server';

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // 👇 重要：内部パスは無条件で通す
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/_vercel') ||
    pathname === '/favicon.ico'
  ) {
    return NextResponse.next();
  }

  const isLocalDevelopment = process.env.NODE_ENV === 'development';

  if (isLocalDevelopment || !process.env.BASIC_ID || !process.env.BASIC_PWD) {
    return NextResponse.next();
  }

  const basicAuth = req.headers.get('authorization');

  if (!basicAuth) {
    return new Response('Authentication required', {
      status: 401,
      headers: {
        'WWW-Authenticate': 'Basic realm="Secure Area"',
      },
    });
  }

  try {
    const authValue = basicAuth.split(' ')[1];
    const [user, pwd] = atob(authValue).split(':');

    if (user === process.env.BASIC_ID && pwd === process.env.BASIC_PWD) {
      return NextResponse.next();
    }
  } catch (e) {
    console.error(e);    return new Response('Invalid Authentication', { status: 400 });
  }

  return new Response('Unauthorized', {
    status: 401,
    headers: {
      'WWW-Authenticate': 'Basic realm="Secure Area"', // ← これも入れておくと安定
    },
  });
}