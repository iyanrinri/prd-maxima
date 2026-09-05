'use server';

import { prisma } from '@/lib/db';
import { revalidatePath } from 'next/cache';

export async function createProgram(data: FormData) {
  await prisma.paket.create({
    data: {
      nama: data.get('nama') as string,
      targetLevel: data.get('targetLevel') as string,
      deskripsi: data.get('deskripsi') as string,
      hargaRupiah: parseInt(data.get('hargaRupiah') as string) || 0,
      hargaEuro: parseInt(data.get('hargaEuro') as string) || 0,
      ambangPaspor: parseInt(data.get('ambangPaspor') as string) || null,
      ambangUjian: parseInt(data.get('ambangUjian') as string) || null,
      ambangPemberkasan: parseInt(data.get('ambangPemberkasan') as string) || null,
      ambangKontrak: parseInt(data.get('ambangKontrak') as string) || null,
      ambangVisa: parseInt(data.get('ambangVisa') as string) || null,
    }
  });
  revalidatePath('/admin/akademik/program');
}

export async function updateProgram(id: string, data: FormData) {
  await prisma.paket.update({
    where: { id },
    data: {
      nama: data.get('nama') as string,
      targetLevel: data.get('targetLevel') as string,
      deskripsi: data.get('deskripsi') as string,
      hargaRupiah: parseInt(data.get('hargaRupiah') as string) || 0,
      hargaEuro: parseInt(data.get('hargaEuro') as string) || 0,
      ambangPaspor: parseInt(data.get('ambangPaspor') as string) || null,
      ambangUjian: parseInt(data.get('ambangUjian') as string) || null,
      ambangPemberkasan: parseInt(data.get('ambangPemberkasan') as string) || null,
      ambangKontrak: parseInt(data.get('ambangKontrak') as string) || null,
      ambangVisa: parseInt(data.get('ambangVisa') as string) || null,
    }
  });
  revalidatePath('/admin/akademik/program');
}

export async function deleteProgram(id: string) {
  await prisma.paket.delete({ where: { id } });
  revalidatePath('/admin/akademik/program');
}
