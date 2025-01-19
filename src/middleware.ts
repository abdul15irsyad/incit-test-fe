import { NextRequest, NextResponse } from 'next/server';

export const middleware = async (request: NextRequest) => {
  const accessToken = request.cookies.get('accessToken')?.value;

  if (request.nextUrl.pathname.startsWith('/auth') && accessToken) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  } else if (
    request.nextUrl.pathname.startsWith('/dashboard') &&
    !accessToken
  ) {
    const queryString = new URLSearchParams();
    queryString.set('return-to', request.nextUrl.pathname);

    return NextResponse.redirect(
      new URL(`/auth/login?${queryString.toString()}`, request.url),
    );
  }
};

export const config = {
  matcher: ['/auth/:path*', '/dashboard/:path*'],
};
