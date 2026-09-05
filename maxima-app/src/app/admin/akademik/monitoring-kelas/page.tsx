import { getSession } from '@/lib/auth';
import { prisma } from '@/lib/db';
import { redirect } from 'next/navigation';

export default async function MonitoringKelasPage() {
  const session = await getSession();
  if (!session || (session.role !== 'admin' && session.role !== 'kepala_akademik')) redirect('/');

  const daftarKelas = await prisma.kelas.findMany({
    include: {
      pengajar: true,
      siswa: {
        include: {
          kehadirans: true,
          nilais: true
        }
      }
    }
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Monitoring Kelas</h1>
        <p className="text-gray-500 mt-1">Status dan evaluasi semua kelas yang sedang berjalan.</p>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-50 text-gray-500 border-b">
              <tr>
                <th className="px-6 py-3 font-medium">Kelas & Level</th>
                <th className="px-6 py-3 font-medium">Pengajar</th>
                <th className="px-6 py-3 font-medium">Siswa</th>
                <th className="px-6 py-3 font-medium">Progres Materi</th>
                <th className="px-6 py-3 font-medium">Rata-rata Kehadiran</th>
                <th className="px-6 py-3 font-medium">Status</th>
                <th className="px-6 py-3 font-medium text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {daftarKelas.map(k => {
                let totalKehadiranSiswa = 0;
                let totalRecordKehadiran = 0;

                k.siswa.forEach(s => {
                  totalKehadiranSiswa += s.kehadirans.filter(keh => keh.status === 'Hadir').length;
                  totalRecordKehadiran += s.kehadirans.length;
                });

                const rataKehadiran = totalRecordKehadiran > 0 ? Math.round((totalKehadiranSiswa / totalRecordKehadiran) * 100) : 0;

                return (
                  <tr key={k.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="font-semibold text-gray-900">{k.nama}</div>
                      <div className="text-gray-500 text-xs">Level {k.level}</div>
                    </td>
                    <td className="px-6 py-4 font-medium text-gray-700">{k.pengajar.nama}</td>
                    <td className="px-6 py-4">{k.siswa.length} Siswa</td>
                    <td className="px-6 py-4">Bab {k.bab}</td>
                    <td className="px-6 py-4">
                      <span className={`font-semibold ${rataKehadiran < 70 ? 'text-red-600' : 'text-green-600'}`}>
                        {rataKehadiran}%
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2.5 py-1 text-xs font-medium rounded-full ${k.status === 'Berjalan' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                        {k.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">Evaluasi</button>
                    </td>
                  </tr>
                );
              })}
              {daftarKelas.length === 0 && (
                <tr>
                  <td colSpan={7} className="px-6 py-8 text-center text-gray-500">
                    Tidak ada kelas yang terdaftar.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
