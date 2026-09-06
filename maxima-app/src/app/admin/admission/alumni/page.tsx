import { getSession } from '@/lib/auth';
import { prisma } from '@/lib/db';
import { redirect } from 'next/navigation';
import AlumniTable from './AlumniTable';

export default async function AlumniPage() {
  const session = await getSession();
  if (!session || (session.role !== 'admin' && session.role !== 'admin_admission')) redirect('/');

  const alumniList = await prisma.siswa.findMany({
    where: { tahapanAdmission: 'Alumni' },
    include: {
      dataAlumni: true
    },
    orderBy: { updatedAt: 'desc' }
  });

  return (
    <div className="space-y-8 max-w-6xl mx-auto pb-12">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Data Alumni</h1>
        <p className="text-gray-500 mt-1">Kelola data siswa yang sudah menjadi alumni, posisi, dokumen kontrak, dan visa.</p>
      </div>

      <AlumniTable data={alumniList as any} />
    </div>
  );
}
