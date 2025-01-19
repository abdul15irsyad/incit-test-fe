import axios, { AxiosError } from 'axios';
import { NextRequest, NextResponse } from 'next/server';

export const GET = async (request: NextRequest) => {
  const { pathname, search } = request.nextUrl;
  let status: boolean, message: string;
  try {
    const response = await axios.get<{ message: string }>(
      `${process.env.NEXT_PUBLIC_API_URL}${pathname.replaceAll('/api/', '/')}${search}`,
    );
    message = response.data?.message;
    status = true;
  } catch (error) {
    if (error instanceof AxiosError) {
      message = error?.response?.data?.message;
    }
    status = false;
  }
  const searchParams = new URLSearchParams();
  searchParams.set('status', status ? 'success' : 'failed');
  if (message!) searchParams.set('message', message);

  return NextResponse.redirect(
    new URL(`/verify-email?${searchParams.toString()}`, request.url),
  );
};
