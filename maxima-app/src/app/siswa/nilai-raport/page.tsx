import { getSession } from '@/lib/auth';
import { prisma } from '@/lib/db';
import { redirect } from 'next/navigation';

export default async function SiswaNilaiRaportPage() {
  const session = await getSession();
  if (!session) redirect('/');

  const siswa = await prisma.siswa.findFirst({
    include: {
      nilais: {
        orderBy: { createdAt: 'desc' }
      },
      raports: {
        orderBy: { createdAt: 'desc' }
      }
    }
  });

  if (!siswa) {
    return <div>Data siswa tidak ditemukan.</div>;
  }

  const formatDate = (date: Date) => new Intl.DateTimeFormat('id-ID', { dateStyle: 'long' }).format(date);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Nilai & Raport</h1>
        <p className="text-gray-500 mt-1">Lihat pencapaian nilai bahasa dan raport per level Anda.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Raport Per Level */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
            <h3 className="font-semibold text-gray-900">Raport Per Level</h3>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {siswa.raports?.map((raport: any) => (
                <div key={raport.id} className="p-4 border border-blue-100 bg-blue-50 rounded-xl flex flex-col md:flex-row justify-between items-start md:items-center">
                  <div>
                    <h4 className="font-bold text-blue-900 text-lg">Raport</h4>
                    <p className="text-sm text-blue-700 mt-1">Diterbitkan: <span className="font-semibold">{formatDate(raport.createdAt)}</span></p>
                  </div>
                  <div className="mt-4 md:mt-0 flex gap-2">
                    <button className="px-4 py-2 bg-white text-blue-600 text-sm font-medium rounded-lg border border-blue-200 hover:bg-blue-50 transition-colors">
                      Lihat Detail
                    </button>
                    <button className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors">
                      Unduh Raport
                    </button>
                  </div>
                </div>
              ))}
              {(!siswa.raports || siswa.raports.length === 0) && (
                <div className="text-center text-gray-500 py-6">Belum ada raport yang diterbitkan.</div>
              )}
            </div>
          </div>
        </div>

        {/* Nilai Bahasa Keseluruhan */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200 bg-gray-50 flex justify-between items-center">
            <h3 className="font-semibold text-gray-900">Daftar Nilai Akademik (Progress)</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-white text-gray-500 border-b">
                <tr>
                  <th className="px-6 py-3 font-medium">Level / Bab</th>
                  <th className="px-6 py-3 font-medium">L</th>
                  <th className="px-6 py-3 font-medium">H</th>
                  <th className="px-6 py-3 font-medium">S</th>
                  <th className="px-6 py-3 font-medium">Spr</th>
                  <th className="px-6 py-3 font-medium">Gr/Wo</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {siswa.nilais?.map((nilai: any) => (
                  <tr key={nilai.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 text-gray-900 font-medium">
                      {nilai.jenis} {nilai.bab ? `(Bab ${nilai.bab})` : ''}
                    </td>
                    <td className="px-6 py-4 text-gray-600">{nilai.lesen}</td>
                    <td className="px-6 py-4 text-gray-600">{nilai.horen}</td>
                    <td className="px-6 py-4 text-gray-600">{nilai.schreiben}</td>
                    <td className="px-6 py-4 text-gray-600">{nilai.sprechen}</td>
                    <td className="px-6 py-4 text-gray-600">{nilai.grammatik} / {nilai.wortschatz}</td>
                  </tr>
                ))}
                {(!siswa.nilais || siswa.nilais.length === 0) && (
                  <tr>
                    <td colSpan={6} className="px-6 py-8 text-center text-gray-500">Belum ada nilai yang dimasukkan.</td>
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
