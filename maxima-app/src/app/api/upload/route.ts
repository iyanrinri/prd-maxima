import { NextRequest, NextResponse } from 'next/server';
import { writeFile, mkdir } from 'fs/promises';
import path from 'path';
import { randomUUID } from 'crypto';
import { getSession } from '@/lib/auth';

export async function POST(request: NextRequest) {
  try {
    const session = await getSession();
    if (!session || (session.role !== 'admin' && session.role !== 'admin_admission')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const formData = await request.formData();
    const file = formData.get('file') as File | null;
    const category = formData.get('category') as string || 'lainnya'; // misal: pas-foto, ijazah, visa

    if (!file) {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
    }

    // Validasi tipe file
    const allowedTypes = ['application/pdf', 'image/jpeg', 'image/png', 'video/mp4'];
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json({ error: 'Format file tidak diizinkan' }, { status: 400 });
    }

    // Validasi ukuran (Max 5MB)
    const MAX_SIZE = 5 * 1024 * 1024;
    if (file.size > MAX_SIZE) {
      return NextResponse.json({ error: 'Ukuran file maksimal 5MB' }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Dapatkan ekstensi dari nama asli
    const extension = path.extname(file.name);
    // Buat nama file unik
    const uniqueFilename = `${category}-${randomUUID()}${extension}`;

    const uploadDir = path.join(process.cwd(), 'public', 'uploads', category);
    
    // Pastikan direktori ada (menggunakan recursive mkdir)
    try {
      await mkdir(uploadDir, { recursive: true });
    } catch (_) {
      // ignore
    }

    const filePath = path.join(uploadDir, uniqueFilename);
    await writeFile(filePath, buffer);

    // Kembalikan URL relatif yang bisa diakses via browser
    const fileUrl = `/uploads/${category}/${uniqueFilename}`;

    return NextResponse.json({ success: true, url: fileUrl });
  } catch (error) {
    console.error('Upload Error:', error);
    return NextResponse.json({ error: 'Failed to upload file' }, { status: 500 });
  }
}
