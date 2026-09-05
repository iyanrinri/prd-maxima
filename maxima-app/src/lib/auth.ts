import { cookies } from 'next/headers';
import { jwtVerify } from 'jose';

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || 'rahasia-banget-mvp-maxima'
);

export async function getSession() {
  const cookieStore = await cookies();
  const token = cookieStore.get('maxima_token')?.value;
  
  if (!token) return null;

  try {
    const { payload } = await jwtVerify(token, JWT_SECRET);
    return payload as { email: string; role: string; name: string };
  } catch (error) {
    return null;
  }
}
