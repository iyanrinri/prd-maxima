import { getSession } from '@/lib/auth';
import { prisma } from '@/lib/db';
import { redirect } from 'next/navigation';

export default async function SiswaLatihanWawancaraPage() {
  const session = await getSession();
  if (!session) redirect('/');

  const siswa = await prisma.siswa.findFirst({
    include: {
      latihanWawancaras: {
        orderBy: { tanggal: 'desc' }
      }
    }
  });

  if (!siswa) return <div>Data siswa tidak ditemukan.</div>;

  const formatDateTime = (date: Date) => {
    return new Intl.DateTimeFormat('id-ID', {
      dateStyle: 'long',
      timeStyle: 'short'
    }).format(date);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Latihan Wawancara</h1>
        <p className="text-gray-500 mt-1">Daftar jadwal dan status latihan wawancara Anda.</p>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
          <h3 className="font-semibold text-gray-900">Riwayat & Jadwal Mendatang</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-white text-gray-500 border-b">
              <tr>
                <th className="px-6 py-3 font-medium">Tanggal dan Jam</th>
                <th className="px-6 py-3 font-medium">Posisi / Jurusan</th>
                <th className="px-6 py-3 font-medium">Pewawancara</th>
                <th className="px-6 py-3 font-medium text-center">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {siswa.latihanWawancaras?.map((latihan: any) => (
                <tr key={latihan.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 text-gray-900 font-medium">
                    {formatDateTime(latihan.tanggal)}
                  </td>
                  <td className="px-6 py-4 text-gray-600">
                    {latihan.posisi}
                  </td>
                  <td className="px-6 py-4 text-gray-600">
                    {latihan.pic || '-'}
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      latihan.status === 'Selesai' ? 'bg-green-100 text-green-800' :
                      latihan.status === 'Dijadwalkan' ? 'bg-blue-100 text-blue-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {latihan.status}
                    </span>
                  </td>
                </tr>
              ))}
              {(!siswa.latihanWawancaras || siswa.latihanWawancaras.length === 0) && (
                <tr>
                  <td colSpan={4} className="px-6 py-8 text-center text-gray-500">Belum ada jadwal latihan wawancara.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
