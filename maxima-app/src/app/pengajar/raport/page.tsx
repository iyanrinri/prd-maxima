import { getSession } from '@/lib/auth';
import { prisma } from '@/lib/db';
import { redirect } from 'next/navigation';

export default async function InputNilaiRaportPage() {
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
        <h1 className="text-2xl font-bold text-slate-900">Input Nilai (Raport)</h1>
        <p className="text-slate-500 mt-1">Pilih kelas dan siswa untuk memasukkan nilai raport.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {pengajar.kelas.map(k => (
          <div key={k.id} className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 hover:shadow-md transition-shadow">
            <h3 className="text-lg font-bold text-emerald-700">{k.nama}</h3>
            <p className="text-sm text-slate-500 mt-1">Level: {k.level}</p>
            <div className="mt-4 flex justify-between items-center">
              <span className="text-sm font-medium bg-slate-100 text-slate-700 px-3 py-1 rounded-full">{k.siswa.length} Siswa</span>
              <button className="text-sm font-medium text-white bg-emerald-600 hover:bg-emerald-700 px-4 py-2 rounded-lg transition-colors">
                Kelola Nilai
              </button>
            </div>
          </div>
        ))}
        {pengajar.kelas.length === 0 && (
          <div className="col-span-full text-center py-12 text-slate-500 bg-white rounded-xl border border-slate-200">
            Anda belum ditugaskan ke kelas manapun.
          </div>
        )}
      </div>
    </div>
  );
}
