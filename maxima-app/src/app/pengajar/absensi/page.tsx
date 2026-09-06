import { getSession } from '@/lib/auth';
import { prisma } from '@/lib/db';
import { redirect } from 'next/navigation';

export default async function AbsensiPage() {
  const session = await getSession();
  if (!session || session.role !== 'pengajar') redirect('/');

  const pengajar = await prisma.pengajar.findFirst({
    include: {
      kelas: true
    }
  });

  if (!pengajar) {
    return <div>Data pengajar tidak ditemukan di database.</div>;
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Absensi Siswa</h1>
        <p className="text-slate-500 mt-1">Kelola daftar kehadiran siswa di kelas Anda.</p>
      </div>

      <div className="bg-white p-8 rounded-xl border border-slate-200 shadow-sm flex flex-col items-center justify-center min-h-[300px]">
        <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mb-4">
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
          </svg>
        </div>
        <h3 className="text-lg font-medium text-slate-900 mb-2">Pilih Jadwal Kelas</h3>
        <p className="text-slate-500 text-center max-w-md mb-6">
          Untuk mengisi absensi, silakan pilih jadwal kelas yang sedang atau telah berlangsung hari ini melalui dashboard.
        </p>
        <a href="/pengajar/dashboard" className="px-6 py-2.5 bg-emerald-600 text-white font-medium rounded-lg hover:bg-emerald-700 transition-colors">
          Kembali ke Dashboard
        </a>
      </div>
    </div>
  );
}
