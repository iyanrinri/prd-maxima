import { getSession } from '@/lib/auth';
import { prisma } from '@/lib/db';
import { redirect } from 'next/navigation';

export default async function SiswaPembelajaranPage() {
  const session = await getSession();
  if (!session) redirect('/');

  const siswa = await prisma.siswa.findFirst({
    include: {
      kelas: {
        include: {
          pengajar: true,
          jadwal: {
            orderBy: { tanggal: 'asc' },
            take: 5 // Next few schedules
          }
        }
      },
      kehadirans: true,
      nilais: true,
      progresBahasas: true,
    }
  });

  if (!siswa) {
    return <div>Data siswa tidak ditemukan.</div>;
  }

  // Calculate attendance stats
  const totalKehadiran = siswa.kehadirans.length;
  const hadir = siswa.kehadirans.filter(k => k.status === 'Hadir').length;
  const persentaseHadir = totalKehadiran > 0 ? Math.round((hadir / totalKehadiran) * 100) : 0;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Pembelajaran</h1>
        <p className="text-gray-500 mt-1">Pantau progres kegiatan belajar mengajar (KBM) Anda.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Info Kelas */}
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm md:col-span-2">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 border-b pb-2">Informasi Kelas Saat Ini</h3>
          {siswa.kelas ? (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <p className="text-sm text-gray-500">Kelas</p>
                <p className="font-semibold text-gray-900">{siswa.kelas.nama}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Level</p>
                <p className="font-semibold text-gray-900">{siswa.kelas.level}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Pengajar</p>
                <p className="font-semibold text-gray-900">{siswa.kelas.pengajar?.nama || 'Belum diassign'}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Kapitel / Bab Saat Ini</p>
                <p className="font-semibold text-gray-900">Kapitel 4</p>
              </div>
            </div>
          ) : (
            <div className="text-gray-500 text-sm">Anda belum dimasukkan ke dalam kelas aktif.</div>
          )}
        </div>

        {/* Ringkasan Kehadiran */}
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 border-b pb-2">Ringkasan Kehadiran</h3>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-500">Tingkat Kehadiran</span>
            <span className="font-bold text-gray-900">{persentaseHadir}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4">
            <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: `${persentaseHadir}%` }}></div>
          </div>
          <p className="text-xs text-gray-500 text-center">
            Hadir: {hadir} dari {totalKehadiran} Sesi
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Progres KBM */}
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 border-b pb-2">Progres KBM</h3>
          <div className="space-y-4">
            {['A1', 'A2', 'B1', 'B2'].map(level => {
              const progres = siswa.progresBahasas?.find(p => p.level === level);
              let statusText = 'Belum Dimulai';
              let statusColor = 'bg-gray-100 text-gray-800';
              if (progres?.statusLulus) {
                statusText = 'Lulus';
                statusColor = 'bg-green-100 text-green-800';
              } else if (progres?.sedangBelajar) {
                statusText = 'Sedang Berjalan';
                statusColor = 'bg-blue-100 text-blue-800';
              }

              return (
                <div key={level} className="flex justify-between items-center p-3 border border-gray-100 rounded-lg hover:bg-gray-50">
                  <span className="font-medium text-gray-700">Level {level}</span>
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusColor}`}>
                    {statusText}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Jadwal Terdekat */}
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 border-b pb-2">Jadwal Kelas Terdekat</h3>
          <ul className="space-y-3">
            {siswa.kelas?.jadwal?.map((jadwal: any) => (
              <li key={jadwal.id} className="flex justify-between items-center text-sm p-2 hover:bg-gray-50 rounded">
                <div>
                  <p className="font-medium text-gray-900">{new Intl.DateTimeFormat('id-ID', { dateStyle: 'long' }).format(jadwal.tanggal)}</p>
                  <p className="text-gray-500 text-xs">{jadwal.jamMulai} - {jadwal.jamSelesai}</p>
                </div>
                <span className="text-blue-600 font-medium">{jadwal.materi || 'Materi Belum Diisi'}</span>
              </li>
            ))}
            {(!siswa.kelas?.jadwal || siswa.kelas.jadwal.length === 0) && (
              <li className="text-gray-500 text-sm">Tidak ada jadwal terdekat.</li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}
