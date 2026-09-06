import { getSession } from '@/lib/auth';
import { prisma } from '@/lib/db';
import { redirect } from 'next/navigation';

export default async function SiswaJadwalPage() {
  const session = await getSession();
  if (!session) redirect('/');

  const siswa = await prisma.siswa.findFirst({
    include: {
      kelas: {
        include: {
          jadwal: {
            orderBy: { tanggal: 'asc' }
          }
        }
      },
      jadwalUjianBahasas: {
        orderBy: { tanggalUjian: 'asc' }
      }
    }
  });

  if (!siswa) {
    return <div>Data siswa tidak ditemukan.</div>;
  }

  const formatDate = (date: Date | null) => date ? new Intl.DateTimeFormat('id-ID', { dateStyle: 'full' }).format(date) : 'Belum ditentukan';

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Jadwal Saya</h1>
        <p className="text-gray-500 mt-1">Daftar jadwal kelas, ujian, persiapan (Vorbereitung), dan evaluasi.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Jadwal Kelas */}
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
          <div className="flex items-center mb-4 border-b pb-2">
            <svg className="w-5 h-5 text-blue-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path></svg>
            <h3 className="text-lg font-semibold text-gray-900">Jadwal Kelas ({siswa.kelas?.nama || 'Belum ada kelas'})</h3>
          </div>
          <ul className="space-y-4">
            {siswa.kelas?.jadwal?.map((jadwal: any) => (
              <li key={jadwal.id} className="flex justify-between items-start bg-gray-50 p-3 rounded-lg border border-gray-100">
                <div>
                  <p className="font-medium text-gray-900">{formatDate(jadwal.tanggal)}</p>
                  <p className="text-sm text-gray-500">{jadwal.materi || 'Materi Belum Diisi'}</p>
                </div>
                <div className="text-right">
                  <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded font-medium">
                    {jadwal.jamMulai} - {jadwal.jamSelesai}
                  </span>
                </div>
              </li>
            ))}
            {(!siswa.kelas?.jadwal || siswa.kelas.jadwal.length === 0) && (
              <li className="text-gray-500 text-sm py-4 text-center">Belum ada jadwal kelas yang tersedia.</li>
            )}
          </ul>
        </div>

        {/* Jadwal Ujian */}
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
          <div className="flex items-center mb-4 border-b pb-2">
            <svg className="w-5 h-5 text-red-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"></path></svg>
            <h3 className="text-lg font-semibold text-gray-900">Jadwal Ujian Sertifikasi</h3>
          </div>
          <ul className="space-y-4">
            {siswa.jadwalUjianBahasas?.map((ujian: any) => (
              <li key={ujian.id} className="flex justify-between items-start bg-red-50 p-3 rounded-lg border border-red-100">
                <div>
                  <p className="font-medium text-red-900">{ujian.jenisUjian} - {ujian.level}</p>
                  <p className="text-sm text-red-700">{formatDate(ujian.tanggalUjian)}</p>
                </div>
                <div className="text-right">
                  <span className="inline-block bg-red-200 text-red-800 text-xs px-2 py-1 rounded font-medium">
                    {ujian.status}
                  </span>
                </div>
              </li>
            ))}
            {(!siswa.jadwalUjianBahasas || siswa.jadwalUjianBahasas.length === 0) && (
              <li className="text-gray-500 text-sm py-4 text-center">Belum ada jadwal ujian sertifikasi.</li>
            )}
          </ul>
        </div>

        {/* Jadwal Vorbereitung (Persiapan Ujian) */}
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
          <div className="flex items-center mb-4 border-b pb-2">
            <svg className="w-5 h-5 text-yellow-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
            <h3 className="text-lg font-semibold text-gray-900">Jadwal Vorbereitung</h3>
          </div>
          <ul className="space-y-4">
             {/* Simulasi Data Vorbereitung */}
             <li className="flex justify-between items-start bg-yellow-50 p-3 rounded-lg border border-yellow-100">
                <div>
                  <p className="font-medium text-yellow-900">Persiapan Ujian B1</p>
                  <p className="text-sm text-yellow-700">Setiap Jumat, Mulai 01 Januari 2027</p>
                </div>
                <div className="text-right">
                  <span className="inline-block bg-yellow-200 text-yellow-800 text-xs px-2 py-1 rounded font-medium">
                    Mendatang
                  </span>
                </div>
              </li>
          </ul>
        </div>

        {/* Jadwal Evaluasi */}
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
          <div className="flex items-center mb-4 border-b pb-2">
            <svg className="w-5 h-5 text-green-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path></svg>
            <h3 className="text-lg font-semibold text-gray-900">Jadwal Evaluasi</h3>
          </div>
          <ul className="space-y-4">
             {/* Simulasi Data Evaluasi */}
             <li className="flex justify-between items-start bg-green-50 p-3 rounded-lg border border-green-100">
                <div>
                  <p className="font-medium text-green-900">Evaluasi Level A2</p>
                  <p className="text-sm text-green-700">Kamis, 15 November 2026</p>
                </div>
                <div className="text-right">
                  <span className="inline-block bg-green-200 text-green-800 text-xs px-2 py-1 rounded font-medium">
                    Oleh Pengajar
                  </span>
                </div>
              </li>
          </ul>
        </div>

      </div>
    </div>
  );
}
