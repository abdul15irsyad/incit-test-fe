import axios from 'axios';
import { NextRequest, NextResponse } from 'next/server';

export const GET = async (request: NextRequest) => {
  const { pathname, search } = request.nextUrl;
  const { data } = await axios.get<{
    accessToken: string;
    refreshToken: string;
  }>(
    `${process.env.NEXT_PUBLIC_API_URL}${pathname.replaceAll('/api/', '/')}${search}`,
  );

  const response = NextResponse.redirect(new URL('/dashboard', request.url));

  response.cookies.set('accessToken', data.accessToken);
  response.cookies.set('refreshToken', data.refreshToken);

  return response;
};
