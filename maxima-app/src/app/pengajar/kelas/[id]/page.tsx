import { getSession } from '@/lib/auth';
import { prisma } from '@/lib/db';
import { redirect } from 'next/navigation';
import { KelasDetailClient } from './KelasDetailClient';

export default async function DetailKelasPengajarPage({ params }: { params: Promise<{ id: string }> }) {
  const session = await getSession();
  if (!session || session.role !== 'pengajar') redirect('/');

  const resolvedParams = await params;
  const kelas = await prisma.kelas.findUnique({
    where: { id: resolvedParams.id },
    include: {
      siswa: {
        include: {
          kehadirans: { orderBy: { createdAt: 'asc' } },
          nilais: { orderBy: { createdAt: 'asc' } }
        }
      }
    }
  });

  if (!kelas) {
    return <div className="p-8 text-center text-red-500">Kelas tidak ditemukan.</div>;
  }

  return <KelasDetailClient kelas={kelas} siswaList={kelas.siswa} />;
}
