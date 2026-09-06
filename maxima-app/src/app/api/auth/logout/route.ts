import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const url = new URL(request.url);
  url.pathname = '/';
  
  // Hardcode port to 3000 if it's localhost (assuming dev environment proxy issue)
  if (url.hostname === 'localhost' && url.port !== '3000') {
    url.port = '3000';
  }
  
  const response = NextResponse.redirect(url);
  response.cookies.delete('maxima_token');
  
  return response;
}
