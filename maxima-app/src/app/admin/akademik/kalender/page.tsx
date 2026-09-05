import { getSession } from '@/lib/auth';
import { prisma } from '@/lib/db';
import { redirect } from 'next/navigation';

export default async function KalenderAkademikPage() {
  const session = await getSession();
  if (!session || (session.role !== 'admin' && session.role !== 'kepala_akademik')) redirect('/');

  const jadwal = await prisma.jadwalAkademik.findMany({
    include: {
      kelas: {
        include: { pengajar: true }
      }
    },
    orderBy: { tanggal: 'asc' }
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Kalender Akademik</h1>
          <p className="text-gray-500 mt-1">Kelola jadwal ujian, kelas, libur, dan event akademik lainnya.</p>
        </div>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition">
          + Tambah Jadwal Baru
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        {['Ujian', 'Placement Test', 'Libur', 'Remedial'].map(filter => (
          <div key={filter} className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm flex items-center justify-between">
            <span className="font-medium text-gray-700">{filter}</span>
            <span className="text-xs font-bold px-2 py-1 bg-gray-100 text-gray-600 rounded-full">
              {jadwal.filter(j => j.jenis === filter).length}
            </span>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-gray-200 bg-gray-50 flex justify-between items-center">
          <h3 className="font-semibold text-gray-900">Jadwal Mendatang (Bulan Ini)</h3>
          <div className="flex space-x-2">
            <select className="border border-gray-300 rounded-lg px-3 py-1.5 text-sm bg-white">
              <option>Semua Kategori</option>
              <option>Kelas</option>
              <option>Ujian</option>
              <option>Libur</option>
            </select>
          </div>
        </div>
        
        <div className="divide-y divide-gray-100">
          {jadwal.map(j => {
            let colorTheme = { bg: 'bg-gray-50', border: 'border-gray-200', textLight: 'text-gray-600', textDark: 'text-gray-700', badgeBg: 'bg-gray-100', badgeText: 'text-gray-800' };
            
            if (j.jenis === 'Ujian' || j.jenis === 'Placement Test') {
              colorTheme = { bg: 'bg-red-50', border: 'border-red-200', textLight: 'text-red-600', textDark: 'text-red-700', badgeBg: 'bg-red-100', badgeText: 'text-red-800' };
            } else if (j.jenis === 'Libur') {
              colorTheme = { bg: 'bg-amber-50', border: 'border-amber-200', textLight: 'text-amber-600', textDark: 'text-amber-700', badgeBg: 'bg-amber-100', badgeText: 'text-amber-800' };
            } else if (j.jenis === 'Remedial') {
              colorTheme = { bg: 'bg-purple-50', border: 'border-purple-200', textLight: 'text-purple-600', textDark: 'text-purple-700', badgeBg: 'bg-purple-100', badgeText: 'text-purple-800' };
            } else if (j.jenis === 'Kelas') {
              colorTheme = { bg: 'bg-blue-50', border: 'border-blue-200', textLight: 'text-blue-600', textDark: 'text-blue-700', badgeBg: 'bg-blue-100', badgeText: 'text-blue-800' };
            }

            return (
              <div key={j.id} className="p-6 flex flex-col md:flex-row gap-6 items-start hover:bg-gray-50 transition-colors">
                <div className={`flex-shrink-0 w-24 h-24 rounded-2xl border flex flex-col items-center justify-center ${colorTheme.bg} ${colorTheme.border}`}>
                  <span className={`text-sm font-bold uppercase ${colorTheme.textLight}`}>
                    {j.tanggal.toLocaleDateString('id-ID', { month: 'short' })}
                  </span>
                  <span className={`text-3xl font-black ${colorTheme.textDark}`}>
                    {j.tanggal.getDate()}
                  </span>
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h4 className="text-lg font-bold text-gray-900">{j.jenis}</h4>
                    <span className={`px-2.5 py-1 text-xs font-bold rounded-full ${colorTheme.badgeBg} ${colorTheme.badgeText}`}>
                      {j.status}
                    </span>
                  </div>
                  <p className="text-gray-600 mb-2">{j.keterangan}</p>
                  
                  <div className="flex flex-wrap gap-4 text-sm text-gray-500 mt-3">
                    <div className="flex items-center">
                      <span className="font-medium mr-1">🕒 Waktu:</span> {j.jamMulai} - {j.jamSelesai}
                    </div>
                    {j.kelas && (
                      <div className="flex items-center">
                        <span className="font-medium mr-1">🏫 Kelas:</span> {j.kelas.nama} (Level {j.kelas.level})
                      </div>
                    )}
                    {j.kelas?.pengajar && (
                      <div className="flex items-center">
                        <span className="font-medium mr-1">👨‍🏫 PIC:</span> {j.kelas.pengajar.nama}
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="flex-shrink-0 flex md:flex-col gap-2">
                  <button className="px-4 py-2 text-sm font-medium bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50">
                    Edit
                  </button>
                  <button className="px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50 rounded-lg transition">
                    Hapus
                  </button>
                </div>
              </div>
            );
          })}
          
          {jadwal.length === 0 && (
            <div className="p-12 text-center text-gray-500">
              Belum ada jadwal yang terdaftar.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
