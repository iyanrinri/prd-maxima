import { getSession } from '@/lib/auth';
import { prisma } from '@/lib/db';
import { redirect } from 'next/navigation';

export default async function SiswaSayaPage() {
  const session = await getSession();
  if (!session || session.role !== 'pengajar') redirect('/');

  const pengajar = await prisma.pengajar.findFirst({
    include: {
      kelas: {
        include: {
          siswa: true,
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
        <h1 className="text-2xl font-bold text-slate-900">Siswa Saya</h1>
        <p className="text-slate-500 mt-1">Daftar semua siswa di kelas yang Anda ajar.</p>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 text-slate-500 border-b">
              <tr>
                <th className="px-6 py-3 font-medium">Nama Siswa</th>
                <th className="px-6 py-3 font-medium">Asal Sekolah</th>
                <th className="px-6 py-3 font-medium">Kelas</th>
                <th className="px-6 py-3 font-medium">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {pengajar.kelas.flatMap(k => k.siswa.map(s => (
                <tr key={s.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4 font-medium text-slate-900">{s.namaLengkap}</td>
                  <td className="px-6 py-4 text-slate-500">{s.asalSekolah || '-'}</td>
                  <td className="px-6 py-4 text-slate-500">{k.nama}</td>
                  <td className="px-6 py-4">
                    <span className="text-xs bg-emerald-100 text-emerald-700 px-2 py-1 rounded-md">Aktif</span>
                  </td>
                </tr>
              )))}
              {pengajar.kelas.every(k => k.siswa.length === 0) && (
                <tr>
                  <td colSpan={4} className="px-6 py-8 text-center text-slate-500">
                    Belum ada siswa di kelas Anda.
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
