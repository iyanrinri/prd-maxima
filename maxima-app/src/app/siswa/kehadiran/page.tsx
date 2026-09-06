import { getSession } from '@/lib/auth';
import { prisma } from '@/lib/db';
import { redirect } from 'next/navigation';

export default async function SiswaKehadiranPage() {
  const session = await getSession();
  if (!session) redirect('/');

  const siswa = await prisma.siswa.findFirst({
    include: {
      kehadirans: {
        orderBy: { createdAt: 'desc' }
      }
    }
  });

  if (!siswa) {
    return <div>Data siswa tidak ditemukan.</div>;
  }

  const formatDate = (date: Date) => new Intl.DateTimeFormat('id-ID', { dateStyle: 'long' }).format(date);

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'Hadir': return 'bg-green-100 text-green-800';
      case 'Sakit': return 'bg-yellow-100 text-yellow-800';
      case 'Izin': return 'bg-blue-100 text-blue-800';
      case 'Alpa': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Kehadiran</h1>
        <p className="text-gray-500 mt-1">Rekapitulasi riwayat kehadiran Anda di kelas.</p>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
          <h3 className="font-semibold text-gray-900">Riwayat Presensi</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-white text-gray-500 border-b">
              <tr>
                <th className="px-6 py-3 font-medium">Tanggal</th>
                <th className="px-6 py-3 font-medium text-center">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {siswa.kehadirans?.map((kehadiran: any) => (
                <tr key={kehadiran.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 text-gray-900 font-medium">
                    {kehadiran.tanggal ? formatDate(kehadiran.tanggal) : '-'}
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(kehadiran.status)}`}>
                      {kehadiran.status}
                    </span>
                  </td>
                </tr>
              ))}
              {(!siswa.kehadirans || siswa.kehadirans.length === 0) && (
                <tr>
                  <td colSpan={4} className="px-6 py-8 text-center text-gray-500">Belum ada data kehadiran.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
