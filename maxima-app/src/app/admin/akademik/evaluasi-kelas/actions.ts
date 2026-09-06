'use server';

import { prisma } from '@/lib/db';
import { revalidatePath } from 'next/cache';

export async function createEvaluasi(data: FormData) {
  const kelasId = data.get('kelasId') as string;
  const evaluasiPengajar = data.get('evaluasiPengajar') as string;
  const kendalaKelas = data.get('kendalaKelas') as string;

  if (!kelasId || !evaluasiPengajar || !kendalaKelas) return { error: 'Semua field harus diisi.' };

  try {
    await prisma.evaluasiKelas.create({
      data: {
        kelasId,
        evaluasiPengajar,
        kendalaKelas
      }
    });

    revalidatePath('/admin/akademik/evaluasi-kelas');
    revalidatePath('/admin/akademik/monitoring-pengajar');
    return { success: true };
  } catch (error) {
    return { error: 'Terjadi kesalahan saat menyimpan evaluasi.' };
  }
}
