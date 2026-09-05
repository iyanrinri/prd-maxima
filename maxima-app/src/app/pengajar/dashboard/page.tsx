import { getSession } from '@/lib/auth';
import { prisma } from '@/lib/db';
import { redirect } from 'next/navigation';

export default async function PengajarDashboardPage() {
  const session = await getSession();
  if (!session || session.role !== 'pengajar') redirect('/');

  // Untuk MVP, cari pengajar pertama yang ada di database. 
  // Di aplikasi nyata, kita akan mencocokkan email login session dengan tabel Pengajar.
  const pengajar = await prisma.pengajar.findFirst({
    include: {
      kelas: {
        include: {
          siswa: true,
          jadwal: {
            where: {
              // Untuk dummy, anggap semua jadwal adalah hari ini
            }
          }
        }
      }
    }
  });

  if (!pengajar) {
    return <div>Data pengajar tidak ditemukan di database.</div>;
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Dashboard Pengajar</h1>
        <p className="text-slate-500 mt-1">Kelola kelas, jadwal, dan progres siswa Anda.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Jadwal Hari Ini */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-200 bg-slate-50">
            <h3 className="font-semibold text-slate-900">Jadwal Kelas Hari Ini</h3>
          </div>
          <div className="p-0">
            <ul className="divide-y divide-slate-100">
              {pengajar.kelas.map(k => (
                k.jadwal.map(j => (
                  <li key={j.id} className="p-6 hover:bg-slate-50 transition-colors">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="text-lg font-bold text-emerald-600">Kelas {k.nama} ({k.level})</h4>
                        <p className="text-sm text-slate-500 mt-1">{j.keterangan}</p>
                        <div className="flex items-center space-x-4 mt-3">
                          <span className="text-xs bg-slate-100 text-slate-600 px-2 py-1 rounded-md">{k.siswa.length} Siswa</span>
                          <span className="text-xs font-medium bg-slate-100 text-slate-800 px-2 py-1 rounded-md">{j.jamMulai} - {j.jamSelesai}</span>
                          <span className={`text-xs px-2 py-1 rounded-md font-medium ${j.status === 'Selesai' ? 'bg-gray-100 text-gray-600' : j.status === 'Berjalan' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}`}>
                            {j.status}
                          </span>
                        </div>
                      </div>
                      <a href={`/pengajar/kelas/${k.id}`} className="px-4 py-2 bg-emerald-600 text-white text-sm font-medium rounded-lg shadow-sm hover:bg-emerald-700 transition">
                        Masuk Kelas
                      </a>
                    </div>
                  </li>
                ))
              ))}
              {pengajar.kelas.length === 0 && (
                <li className="p-6 text-center text-slate-500">Tidak ada jadwal hari ini.</li>
              )}
            </ul>
          </div>
        </div>

        {/* Progres Siswa */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-200 bg-slate-50">
            <h3 className="font-semibold text-slate-900">Daftar Siswa Saya</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-white text-slate-500 border-b">
                <tr>
                  <th className="px-6 py-3 font-medium">Nama Siswa</th>
                  <th className="px-6 py-3 font-medium">Kelas</th>
                  <th className="px-6 py-3 font-medium text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {pengajar.kelas.flatMap(k => k.siswa.map(s => (
                  <tr key={s.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4 font-medium text-slate-900">{s.namaLengkap}</td>
                    <td className="px-6 py-4 text-slate-500">{k.nama}</td>
                    <td className="px-6 py-4 text-right">
                      <button className="text-emerald-600 hover:text-emerald-800 font-medium text-xs">
                        Input Nilai
                      </button>
                    </td>
                  </tr>
                )))}
                {pengajar.kelas.every(k => k.siswa.length === 0) && (
                  <tr>
                    <td colSpan={3} className="px-6 py-8 text-center text-slate-500">
                      Belum ada siswa di kelas Anda.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
}
