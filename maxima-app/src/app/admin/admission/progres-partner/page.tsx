import { getSession } from '@/lib/auth';
import { prisma } from '@/lib/db';
import { redirect } from 'next/navigation';
import ProgresPartnerTable from './ProgresPartnerTable';

export const metadata = {
  title: 'Progres Partner - Maxima',
};

export default async function ProgresPartnerPage() {
  const session = await getSession();
  if (!session || (session.role !== 'admin' && session.role !== 'admin_admission')) redirect('/');

  // Get all progress partner records
  const progresList = await prisma.progresPartner.findMany({
    include: {
      siswa: true
    },
    orderBy: {
      tanggalProses: 'desc'
    }
  });

  // Get all active students for the dropdown
  const siswaList = await prisma.siswa.findMany({
    where: { status: 'AKTIF' },
    orderBy: { namaLengkap: 'asc' },
    select: { id: true, namaLengkap: true, noKontrak: true, program: true }
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Progres Partner</h1>
          <p className="text-gray-500 mt-1">Pantau proses interview dan penempatan siswa di partner Jerman.</p>
        </div>
      </div>

      <ProgresPartnerTable initialData={progresList} siswaList={siswaList} />
    </div>
  );
}
