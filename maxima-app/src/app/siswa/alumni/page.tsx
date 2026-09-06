import { getSession } from '@/lib/auth';
import { prisma } from '@/lib/db';
import { redirect } from 'next/navigation';

export default async function SiswaAlumniPage() {
  const session = await getSession();
  if (!session) redirect('/');

  const siswa = await prisma.siswa.findFirst({
    include: {
      dataAlumni: true
    }
  });

  if (!siswa) return <div>Data siswa tidak ditemukan.</div>;

  const alumni = siswa.dataAlumni;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Form Alumni</h1>
        <p className="text-gray-500 mt-1">Isi data alumni setelah Anda berhasil berangkat dan menetap di Jerman.</p>
      </div>

      <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
        {alumni ? (
          <div>
            <div className="bg-green-50 border border-green-200 text-green-800 p-4 rounded-lg mb-6 flex items-start">
              <svg className="w-5 h-5 mr-3 mt-0.5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
              <div>
                <p className="font-medium">Data alumni Anda sudah tersimpan.</p>
                <p className="text-sm mt-1 text-green-700">Terima kasih telah mengisi form alumni. Semoga sukses selalu di Jerman!</p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-8 text-sm">
              <div>
                <p className="text-gray-500 mb-1">Perusahaan / Instansi</p>
                <p className="font-medium text-gray-900">{alumni.perusahaan || '-'}</p>
              </div>
              <div>
                <p className="text-gray-500 mb-1">Posisi / Jurusan</p>
                <p className="font-medium text-gray-900">{alumni.posisiJurusan || '-'}</p>
              </div>
              <div>
                <p className="text-gray-500 mb-1">Kota & Bundesland</p>
                <p className="font-medium text-gray-900">
                  {alumni.kota ? `${alumni.kota}, ` : ''}{alumni.bundesland || '-'}
                </p>
              </div>
              <div>
                <p className="text-gray-500 mb-1">Tanggal Keberangkatan</p>
                <p className="font-medium text-gray-900">
                  {alumni.tanggalKeberangkatan ? new Intl.DateTimeFormat('id-ID', { dateStyle: 'long' }).format(alumni.tanggalKeberangkatan) : '-'}
                </p>
              </div>
            </div>
          </div>
        ) : (
          <form className="space-y-6 max-w-2xl">
            <div className="bg-blue-50 border border-blue-200 text-blue-800 p-4 rounded-lg flex items-start text-sm">
              <svg className="w-5 h-5 mr-3 mt-0.5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
              <p>Form ini hanya diisi apabila Anda sudah mendapatkan kontrak dan siap berangkat, atau sudah berada di Jerman.</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Perusahaan / Instansi</label>
              <input type="text" className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500" placeholder="Contoh: Universitätsklinikum Heidelberg" />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Posisi / Jurusan</label>
              <input type="text" className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500" placeholder="Contoh: Pflegefachkraft" />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Kota</label>
                <input type="text" className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500" placeholder="Contoh: Heidelberg" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Bundesland</label>
                <input type="text" className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500" placeholder="Contoh: Baden-Württemberg" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Tanggal Keberangkatan</label>
              <input type="date" className="w-full md:w-1/2 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500" />
            </div>

            <div className="pt-4 border-t border-gray-100 flex justify-end">
              <button type="button" className="px-6 py-2.5 bg-blue-600 text-white rounded-md hover:bg-blue-700 font-medium transition-colors shadow-sm">
                Simpan Data Alumni
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
