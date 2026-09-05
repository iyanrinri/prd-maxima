import { getSession } from '@/lib/auth';
import { prisma } from '@/lib/db';
import { redirect } from 'next/navigation';
import Link from 'next/link';

export default async function EvaluasiKelasPage() {
  const session = await getSession();
  if (!session || (session.role !== 'admin' && session.role !== 'kepala_akademik')) redirect('/');

  const evaluasis = await prisma.evaluasiKelas.findMany({
    include: {
      kelas: {
        include: {
          pengajar: true,
          siswa: { include: { kehadirans: true, nilais: true } }
        }
      }
    },
    orderBy: { createdAt: 'desc' }
  });

  // Calculate averages per class if no evaluasi is found, we might want to still show classes.
  // But since it's an Evaluasi log, we just show the logs.
  
  const kelasAktif = await prisma.kelas.findMany({
    where: { status: 'Berjalan' },
    include: {
      pengajar: true,
      siswa: { include: { kehadirans: true, nilais: true } }
    }
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Evaluasi Kelas</h1>
          <p className="text-gray-500 mt-1">Rangkuman kinerja kelas, performa pengajar, dan pencatatan kendala operasional.</p>
        </div>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition">
          + Buat Form Evaluasi Baru
        </button>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-gray-200 bg-gray-50 flex justify-between items-center">
          <h3 className="font-semibold text-gray-900">Status Kinerja Kelas Aktif</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-white text-gray-500 border-b">
              <tr>
                <th className="px-6 py-4 font-medium">Nama Kelas</th>
                <th className="px-6 py-4 font-medium">Pengajar</th>
                <th className="px-6 py-4 font-medium text-center">Rata-rata Kehadiran</th>
                <th className="px-6 py-4 font-medium text-center">Rata-rata Nilai</th>
                <th className="px-6 py-4 font-medium">Status Evaluasi</th>
                <th className="px-6 py-4 font-medium">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {kelasAktif.map(k => {
                const hasEvaluasi = evaluasis.some(e => e.kelasId === k.id);
                
                // Calculate Averages
                let totalHadir = 0;
                let totalK = 0;
                let totalNilai = 0;
                let nilaiCount = 0;

                k.siswa.forEach(s => {
                  const hadir = s.kehadirans.filter(keh => keh.status === 'Hadir').length;
                  totalHadir += hadir;
                  totalK += s.kehadirans.length;

                  if (s.nilais.length > 0) {
                    const n = s.nilais[0];
                    totalNilai += (n.lesen + n.horen + n.schreiben + n.sprechen + n.grammatik + n.wortschatz) / 6;
                    nilaiCount++;
                  }
                });

                const avgHadir = totalK > 0 ? Math.round((totalHadir / totalK) * 100) : 0;
                const avgNilai = nilaiCount > 0 ? Math.round(totalNilai / nilaiCount) : 0;

                return (
                  <tr key={k.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="font-bold text-gray-900">{k.nama}</div>
                      <div className="text-xs text-gray-500">Level {k.level} • Bab {k.bab}</div>
                    </td>
                    <td className="px-6 py-4 font-medium text-gray-700">{k.pengajar.nama}</td>
                    <td className="px-6 py-4 text-center">
                      <span className={`font-bold ${avgHadir < 70 ? 'text-red-600' : 'text-green-600'}`}>{avgHadir}%</span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className={`font-bold ${avgNilai < 60 ? 'text-red-600' : 'text-blue-600'}`}>{avgNilai}</span>
                    </td>
                    <td className="px-6 py-4">
                      {hasEvaluasi ? (
                        <span className="px-2.5 py-1 text-xs font-bold rounded-full bg-green-100 text-green-800 border border-green-200">Sudah Dievaluasi</span>
                      ) : (
                        <span className="px-2.5 py-1 text-xs font-bold rounded-full bg-amber-100 text-amber-800 border border-amber-200">Belum Dievaluasi</span>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <button className="text-sm px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium transition">
                        Isi Evaluasi
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      <div className="mt-8">
        <h3 className="text-xl font-bold text-gray-900 mb-4">Riwayat Evaluasi Terakhir</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {evaluasis.map(ev => (
            <div key={ev.id} className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
              <div className="flex justify-between items-start mb-4 border-b border-gray-100 pb-4">
                <div>
                  <h4 className="font-bold text-gray-900">{ev.kelas.nama} (Level {ev.kelas.level})</h4>
                  <p className="text-sm text-gray-500">Pengajar: {ev.kelas.pengajar.nama}</p>
                </div>
                <span className="text-xs text-gray-400 font-medium">{ev.createdAt.toLocaleDateString('id-ID')}</span>
              </div>
              
              <div className="space-y-4">
                <div>
                  <h5 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Evaluasi Pengajar</h5>
                  <p className="text-sm text-gray-800 bg-gray-50 p-3 rounded-lg border border-gray-100">{ev.evaluasiPengajar}</p>
                </div>
                <div>
                  <h5 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Kendala Kelas</h5>
                  <p className="text-sm text-gray-800 bg-red-50 p-3 rounded-lg border border-red-100 text-red-900">{ev.kendalaKelas}</p>
                </div>
              </div>
            </div>
          ))}
          {evaluasis.length === 0 && (
            <div className="col-span-2 text-center p-8 bg-gray-50 rounded-xl border border-gray-200 border-dashed">
              <p className="text-gray-500">Belum ada catatan evaluasi kelas.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
