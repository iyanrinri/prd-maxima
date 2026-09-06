import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtVerify } from 'jose';

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || 'rahasia-banget-mvp-maxima'
);

export async function proxy(request: NextRequest) {
  // Hanya lindungi rute di bawah /admin dan /siswa
  const isAdminRoute = request.nextUrl.pathname.startsWith('/admin');
  const isSiswaRoute = request.nextUrl.pathname.startsWith('/siswa');

  if (!isAdminRoute && !isSiswaRoute) {
    return NextResponse.next();
  }

  const token = request.cookies.get('maxima_token')?.value;

  if (!token) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  try {
    const { payload } = await jwtVerify(token, JWT_SECRET);
    
    // Proteksi role
    const path = request.nextUrl.pathname;
    const role = payload.role;

    if (path.startsWith('/admin') && role !== 'admin' && role !== 'kepala_akademik') {
      return NextResponse.redirect(new URL('/', request.url));
    }

    if (path.startsWith('/siswa') && role !== 'siswa') {
      return NextResponse.redirect(new URL('/', request.url));
    }

    if (path.startsWith('/pengajar') && role !== 'pengajar') {
      return NextResponse.redirect(new URL('/', request.url));
    }

    return NextResponse.next();
  } catch (error) {
    // Token tidak valid
    const response = NextResponse.redirect(new URL('/', request.url));
    response.cookies.delete('maxima_token');
    return response;
  }
}

export const config = {
  matcher: ['/admin/:path*', '/siswa/:path*'],
};
