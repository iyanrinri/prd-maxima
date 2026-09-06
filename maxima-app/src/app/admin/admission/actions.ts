'use server';

import { prisma } from '@/lib/db';
import { revalidatePath } from 'next/cache';
import { getSession } from '@/lib/auth';

// Helper for auth check in actions
async function checkAuth() {
  const session = await getSession();
  if (!session || (session.role !== 'admin' && session.role !== 'admin_admission')) {
    throw new Error('Unauthorized');
  }
}

export async function updateTahapanAdmission(siswaId: string, tahapan: string) {
  await checkAuth();
  
  await prisma.siswa.update({
    where: { id: siswaId },
    data: { tahapanAdmission: tahapan },
  });

  revalidatePath(`/admin/admission/database-siswa/${siswaId}`);
  revalidatePath(`/admin/admission/database-siswa`);
  revalidatePath(`/admin/admission/dashboard`);
}

export async function saveDokumenSiswa(siswaId: string, data: {
  pasFoto?: string;
  aktaKelahiran?: string;
  kartuKeluarga?: string;
  ijazahTerakhir?: string;
  transkripTerakhir?: string;
  paspor?: string;
  lebenslauf?: string;
  motivationsschreiben?: string;
  videoPerkenalan?: string;
}) {
  await checkAuth();

  await prisma.dokumenSiswa.upsert({
    where: { siswaId },
    update: data,
    create: {
      siswaId,
      ...data
    }
  });

  revalidatePath(`/admin/admission/database-siswa/${siswaId}`);
}

export async function addJadwalUjian(siswaId: string, data: any) {
  await checkAuth();
  
  await prisma.jadwalUjianBahasa.create({
    data: {
      siswaId,
      ...data
    }
  });
  revalidatePath(`/admin/admission/database-siswa/${siswaId}`);
}

export async function deleteJadwalUjian(id: string, siswaId: string) {
  await checkAuth();
  await prisma.jadwalUjianBahasa.delete({ where: { id } });
  revalidatePath(`/admin/admission/database-siswa/${siswaId}`);
}

export async function addSertifikatBahasa(siswaId: string, data: any) {
  await checkAuth();
  
  await prisma.sertifikatBahasaDetail.create({
    data: {
      siswaId,
      ...data
    }
  });
  revalidatePath(`/admin/admission/database-siswa/${siswaId}`);
}

export async function deleteSertifikatBahasa(id: string, siswaId: string) {
  await checkAuth();
  await prisma.sertifikatBahasaDetail.delete({ where: { id } });
  revalidatePath(`/admin/admission/database-siswa/${siswaId}`);
}
export async function toggleLayananSiswa(siswaId: string, jenisLayanan: string, status: string) {
  await checkAuth();

  const existing = await prisma.layananSiswa.findFirst({
    where: { siswaId, jenisLayanan }
  });

  if (existing) {
    await prisma.layananSiswa.update({
      where: { id: existing.id },
      data: { status }
    });
  } else {
    await prisma.layananSiswa.create({
      data: { siswaId, jenisLayanan, status }
    });
  }

  revalidatePath(`/admin/admission/database-siswa/${siswaId}`);
}
export async function addProgresPartner(data: any) {
  await checkAuth();
  
  await prisma.progresPartner.create({
    data
  });
  revalidatePath(`/admin/admission/progres-partner`);
}

export async function updateProgresPartnerStatus(id: string, status: string, catatanAdmission?: string) {
  await checkAuth();
  await prisma.progresPartner.update({
    where: { id },
    data: { 
      status,
      ...(catatanAdmission && { catatanAdmission })
    }
  });
  revalidatePath(`/admin/admission/progres-partner`);
}

export async function deleteProgresPartner(id: string) {
  await checkAuth();
  await prisma.progresPartner.delete({ where: { id } });
  revalidatePath(`/admin/admission/progres-partner`);
}
export async function addProgresBahasa(data: any) {
  await checkAuth();
  await prisma.progresBahasa.create({ data });
  revalidatePath(`/admin/admission/database-siswa/${data.siswaId}`);
}

export async function deleteProgresBahasa(id: string, siswaId: string) {
  await checkAuth();
  await prisma.progresBahasa.delete({ where: { id } });
  revalidatePath(`/admin/admission/database-siswa/${siswaId}`);
}

export async function addRekomendasiUjian(data: any) {
  await checkAuth();
  await prisma.rekomendasiUjian.create({ data });
  revalidatePath(`/admin/admission/database-siswa/${data.siswaId}`);
}

export async function updateRekomendasiUjianStatus(id: string, status: string, siswaId: string) {
  await checkAuth();
  await prisma.rekomendasiUjian.update({ where: { id }, data: { status } });
  revalidatePath(`/admin/admission/database-siswa/${siswaId}`);
}

export async function deleteRekomendasiUjian(id: string, siswaId: string) {
  await checkAuth();
  await prisma.rekomendasiUjian.delete({ where: { id } });
  revalidatePath(`/admin/admission/database-siswa/${siswaId}`);
}

export async function addLatihanWawancara(data: any) {
  await checkAuth();
  await prisma.latihanWawancara.create({ data });
  revalidatePath(`/admin/admission/database-siswa/${data.siswaId}`);
}

export async function updateLatihanWawancaraStatus(id: string, status: string, siswaId: string) {
  await checkAuth();
  await prisma.latihanWawancara.update({ where: { id }, data: { status } });
  revalidatePath(`/admin/admission/database-siswa/${siswaId}`);
}

export async function deleteLatihanWawancara(id: string, siswaId: string) {
  await checkAuth();
  await prisma.latihanWawancara.delete({ where: { id } });
  revalidatePath(`/admin/admission/database-siswa/${siswaId}`);
}

export async function addTimelineSiswa(siswaId: string, aktivitas: string, deskripsi?: string) {
  await prisma.timelineAdmission.create({
    data: { 
      siswaId, 
      aktivitas,
      deskripsi 
    }
  });
  revalidatePath(`/admin/admission/database-siswa/${siswaId}`);
}

export async function updateDataAlumni(siswaId: string, data: any) {
  await checkAuth();
  await prisma.dataAlumni.upsert({
    where: { siswaId },
    update: data,
    create: {
      siswaId,
      ...data
    }
  });
  revalidatePath('/admin/admission/alumni');
}
