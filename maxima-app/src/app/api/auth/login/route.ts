import { NextResponse } from 'next/server';
import { SignJWT } from 'jose';

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || 'rahasia-banget-mvp-maxima'
);

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    // Validasi dummy untuk MVP
    let role = '';
    let name = '';

    if (email === 'admin@maxima.com' && password === 'password123') {
      role = 'admin';
      name = 'Super Admin';
    } else if (email === 'akademik@maxima.com' && password === 'password123') {
      role = 'kepala_akademik';
      name = 'Kepala Akademik';
    } else if (email === 'pengajar@maxima.com' && password === 'password123') {
      role = 'pengajar';
      name = 'Pengajar';
    } else if (email === 'siswa@maxima.com' && password === 'password123') {
      role = 'siswa';
      name = 'Riska Mustikawati';
    } else {
      return NextResponse.json({ error: 'Kredensial tidak valid' }, { status: 401 });
    }

    // Buat JWT Token
    const token = await new SignJWT({ email, role, name })
      .setProtectedHeader({ alg: 'HS256' })
      .setIssuedAt()
      .setExpirationTime('1d') // Berlaku 1 hari
      .sign(JWT_SECRET);

    const response = NextResponse.json({ success: true, role });
    
    // Set cookie
    response.cookies.set({
      name: 'maxima_token',
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24, // 1 hari
    });

    return response;
  } catch (error) {
    return NextResponse.json({ error: 'Terjadi kesalahan sistem' }, { status: 500 });
  }
}
