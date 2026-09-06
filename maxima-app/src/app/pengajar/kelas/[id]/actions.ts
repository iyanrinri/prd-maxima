'use server';

import { prisma } from '@/lib/db';
import { revalidatePath } from 'next/cache';

export async function updateProgressBab(kelasId: string, bab: number) {
  await prisma.kelas.update({
    where: { id: kelasId },
    data: { bab }
  });
  revalidatePath('/pengajar/kelas/' + kelasId);
  revalidatePath('/admin/akademik/monitoring-kelas');
  revalidatePath('/admin/akademik/monitoring-pengajar');
}

export async function updateAbsensi(siswaId: string, kelasId: string, status: string) {
  // We'll just create a new Kehadiran record for today.
  // In a real app, you might want to check if one exists today and update it.
  // But for MVP, simple create is fine.
  await prisma.kehadiran.create({
    data: {
      siswaId,
      kelasId,
      status
    }
  });
  revalidatePath('/pengajar/kelas/' + kelasId);
}

export async function updateNilai(data: FormData) {
  const siswaId = data.get('siswaId') as string;
  const kelasLevel = data.get('kelasLevel') as string;
  const bab = parseInt(data.get('bab') as string) || 1;
  const lesen = parseInt(data.get('lesen') as string) || 0;
  const horen = parseInt(data.get('horen') as string) || 0;
  const schreiben = parseInt(data.get('schreiben') as string) || 0;
  const sprechen = parseInt(data.get('sprechen') as string) || 0;
  
  // For the MVP, we just set grammatik and wortschatz to 0 if not provided
  await prisma.nilai.create({
    data: {
      siswaId,
      level: kelasLevel,
      bab,
      lesen,
      horen,
      schreiben,
      sprechen,
      grammatik: 0,
      wortschatz: 0,
    }
  });

  // Note: revalidation should happen in the component or passing kelasId if needed
}
