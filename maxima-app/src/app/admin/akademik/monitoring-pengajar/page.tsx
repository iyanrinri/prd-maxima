import { getSession } from '@/lib/auth';
import { prisma } from '@/lib/db';
import { redirect } from 'next/navigation';

export default async function MonitoringPengajarPage() {
  const session = await getSession();
  if (!session || (session.role !== 'admin' && session.role !== 'kepala_akademik')) redirect('/');

  const pengajars = await prisma.pengajar.findMany({
    include: {
      kelas: {
        include: {
          siswa: {
            include: { kehadirans: true, nilais: true }
          },
          evaluasis: true
        }
      }
    }
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Monitoring Pengajar</h1>
        <p className="text-gray-500 mt-1">Evaluasi kinerja dan kelengkapan administrasi pengajar.</p>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-50 text-gray-500 border-b">
              <tr>
                <th className="px-6 py-3 font-medium">Nama Pengajar</th>
                <th className="px-6 py-3 font-medium">Kelas Ditangani</th>
                <th className="px-6 py-3 font-medium text-center">Jumlah Siswa</th>
                <th className="px-6 py-3 font-medium text-center">Progress Materi</th>
                <th className="px-6 py-3 font-medium">Kelengkapan Absensi</th>
                <th className="px-6 py-3 font-medium">Kelengkapan Nilai</th>
                <th className="px-6 py-3 font-medium">Evaluasi Kelas</th>
                <th className="px-6 py-3 font-medium">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {pengajars.map(p => {
                const totalKelas = p.kelas.length;
                const totalSiswa = p.kelas.reduce((acc, k) => acc + k.siswa.length, 0);
                
                let adaAbsen = true;
                let adaNilai = true;
                
                if (p.kelas.length === 0) {
                  adaAbsen = false;
                  adaNilai = false;
                }
                
                p.kelas.forEach(k => {
                  k.siswa.forEach(s => {
                    if (s.kehadirans.length === 0) adaAbsen = false;
                    if (s.nilais.length === 0) adaNilai = false;
                  });
                });

                const sudahDievaluasi = p.kelas.some(k => k.evaluasis && k.evaluasis.length > 0);

                return (
                  <tr key={p.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 font-semibold text-gray-900">{p.nama}</td>
                    <td className="px-6 py-4">
                      {p.kelas.map(k => <div key={k.id}>{k.nama} ({k.level})</div>)}
                    </td>
                    <td className="px-6 py-4 text-center font-bold">{totalSiswa}</td>
                    <td className="px-6 py-4 text-center">
                      {p.kelas.map(k => <div key={k.id}>Bab {k.bab}</div>)}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2.5 py-1 text-xs font-medium rounded-full ${adaAbsen ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                        {adaAbsen ? 'Lengkap' : 'Belum Lengkap'}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2.5 py-1 text-xs font-medium rounded-full ${adaNilai ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                        {adaNilai ? 'Lengkap' : 'Belum Lengkap'}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      {sudahDievaluasi ? (
                        <span className="px-2.5 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-800">Telah Dievaluasi</span>
                      ) : (
                        <span className="px-2.5 py-1 text-xs font-medium rounded-full bg-amber-100 text-amber-800">Menunggu Evaluasi</span>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">Lihat Detail</button>
                    </td>
                  </tr>
                );
              })}
              {pengajars.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-6 py-8 text-center text-gray-500">
                    Tidak ada pengajar terdaftar.
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
