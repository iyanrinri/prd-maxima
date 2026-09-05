import { getSession } from '@/lib/auth';
import { prisma } from '@/lib/db';
import { redirect } from 'next/navigation';
import ProgramList from './ProgramList';

export default async function ProgramAkademikPage() {
  const session = await getSession();
  if (!session || (session.role !== 'admin' && session.role !== 'kepala_akademik')) redirect('/');

  const programList = await prisma.paket.findMany({
    include: {
      siswas: true
    },
    orderBy: { hargaRupiah: 'desc' }
  });

  return (
    <ProgramList initialPrograms={programList} />
  );
}
