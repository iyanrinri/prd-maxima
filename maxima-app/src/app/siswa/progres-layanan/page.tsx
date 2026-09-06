import { getSession } from '@/lib/auth';
import { prisma } from '@/lib/db';
import { redirect } from 'next/navigation';

export default async function SiswaProgresLayananPage() {
  const session = await getSession();
  if (!session) redirect('/');

  const siswa = await prisma.siswa.findFirst({
    include: {
      layananSiswas: {
        orderBy: { createdAt: 'desc' }
      }
    }
  });

  if (!siswa) {
    return <div>Data siswa tidak ditemukan.</div>;
  }

  // Define default layanans if not present in DB
  const defaultLayanans = [
    'Paspor', 
    'Terjemah dokumen', 
    'Apostille Dokumen', 
    'Ujian Bahasa',
    'Workshop',
    'Pencarian Perusahaan',
    'Pengajuan Visa',
    'Keberangkatan (Dana Talang Tiket Pesawat Opsional)'
  ];
  const existingLayanans = siswa.layananSiswas.map(l => l.jenisLayanan);
  
  // Combine DB and defaults for display
  const combinedLayanans = [
    ...siswa.layananSiswas,
    ...defaultLayanans.filter(l => !existingLayanans.includes(l)).map(l => ({
      id: `default-${l}`,
      jenisLayanan: l,
      status: 'Belum Bisa Diproses',
      progres: 'Belum Dimulai',
      dokumenUrl: null
    }))
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Progres Layanan</h1>
        <p className="text-gray-500 mt-1">Pantau status dan upload dokumen untuk layanan ekstra Anda.</p>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
          <h3 className="font-semibold text-gray-900">Daftar Layanan Dokumen</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-white text-gray-500 border-b">
              <tr>
                <th className="px-6 py-3 font-medium">Jenis Layanan</th>
                <th className="px-6 py-3 font-medium text-center">Status</th>
                <th className="px-6 py-3 font-medium text-center">Progres</th>
                <th className="px-6 py-3 font-medium">Aksi / Dokumen</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {combinedLayanans.map((layanan: any) => (
                <tr key={layanan.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 text-gray-900 font-medium">
                    {layanan.jenisLayanan}
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${layanan.status?.toLowerCase().includes('belum') ? 'bg-gray-100 text-gray-800' : 'bg-green-100 text-green-800'}`}>
                      {layanan.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${layanan.progres === 'Selesai' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'}`}>
                      {layanan.progres || 'Berjalan'}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    {layanan.dokumenUrl ? (
                      <button className="text-blue-600 hover:text-blue-800 font-medium flex items-center">
                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path></svg>
                        Lihat Dokumen
                      </button>
                    ) : (
                      <div className="flex items-center">
                        <label className="cursor-pointer inline-flex items-center px-3 py-1.5 border border-gray-300 shadow-sm text-xs font-medium rounded text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                          <svg className="w-4 h-4 mr-1 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"></path></svg>
                          Upload Dokumen
                          <input type="file" className="hidden" />
                        </label>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
