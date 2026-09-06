import { getSession } from '@/lib/auth';
import { prisma } from '@/lib/db';
import { redirect } from 'next/navigation';

export default async function SiswaSertifikatBahasaPage() {
  const session = await getSession();
  if (!session) redirect('/');

  const siswa = await prisma.siswa.findFirst({
    include: {
      sertifikatBahasas: {
        orderBy: { createdAt: 'desc' }
      }
    }
  });

  if (!siswa) {
    return <div>Data siswa tidak ditemukan.</div>;
  }

  const formatDate = (date: Date | null) => date ? new Intl.DateTimeFormat('id-ID', { dateStyle: 'medium' }).format(date) : '-';

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Sertifikat Bahasa</h1>
        <p className="text-gray-500 mt-1">Kelola data dan dokumen sertifikat bahasa Jerman Anda.</p>
      </div>

      {/* Form Upload Sertifikat */}
      <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 border-b pb-2">Upload Sertifikat Baru</h3>
        <form className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Jenis Sertifikat</label>
              <select className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500">
                <option value="Goethe">Goethe</option>
                <option value="ÖSD">ÖSD</option>
                <option value="ECL">ECL</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Tingkat / Level</label>
              <select className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500">
                <option value="A1">A1</option>
                <option value="A2">A2</option>
                <option value="B1">B1</option>
                <option value="B2">B2</option>
              </select>
            </div>
            
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">File Dokumen (PDF, max 5MB)</label>
              <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md hover:border-blue-500 hover:bg-blue-50 transition-colors cursor-pointer">
                <div className="space-y-1 text-center">
                  <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                    <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <div className="flex text-sm text-gray-600 justify-center">
                    <span className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500">
                      Upload file
                    </span>
                    <p className="pl-1">atau drag and drop</p>
                  </div>
                  <p className="text-xs text-gray-500">Jika terpisah, mohon merge (gabungkan) dalam bentuk PDF.</p>
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-end">
            <button type="button" className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 font-medium transition-colors">
              Simpan & Upload
            </button>
          </div>
        </form>
      </div>

      {/* Daftar Sertifikat */}
      <div className="space-y-4">
        {siswa.sertifikatBahasas?.map((sertifikat) => (
          <div key={sertifikat.id} className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200 bg-gray-50 flex justify-between items-center">
              <div>
                <h3 className="font-bold text-gray-900">{sertifikat.jenisSertifikat} - {sertifikat.level}</h3>
              </div>
              <div>
                <button className="text-sm bg-blue-50 text-blue-600 hover:bg-blue-100 px-3 py-1.5 rounded-md font-medium transition-colors border border-blue-200">
                  Lihat Dokumen
                </button>
              </div>
            </div>
            
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="p-4 bg-gray-50 rounded-lg border border-gray-100">
                  <p className="text-sm font-medium text-gray-500 mb-2">Lesen (Membaca)</p>
                  <p className="text-2xl font-bold text-gray-900">{sertifikat.nilaiLesen ?? '-'}</p>
                  <p className="text-xs text-gray-500 mt-2">Berlaku s/d: {formatDate(sertifikat.masaBerlakuLesen)}</p>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg border border-gray-100">
                  <p className="text-sm font-medium text-gray-500 mb-2">Hören (Mendengar)</p>
                  <p className="text-2xl font-bold text-gray-900">{sertifikat.nilaiHoren ?? '-'}</p>
                  <p className="text-xs text-gray-500 mt-2">Berlaku s/d: {formatDate(sertifikat.masaBerlakuHoren)}</p>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg border border-gray-100">
                  <p className="text-sm font-medium text-gray-500 mb-2">Schreiben (Menulis)</p>
                  <p className="text-2xl font-bold text-gray-900">{sertifikat.nilaiSchreiben ?? '-'}</p>
                  <p className="text-xs text-gray-500 mt-2">Berlaku s/d: {formatDate(sertifikat.masaBerlakuSchreiben)}</p>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg border border-gray-100">
                  <p className="text-sm font-medium text-gray-500 mb-2">Sprechen (Berbicara)</p>
                  <p className="text-2xl font-bold text-gray-900">{sertifikat.nilaiSprechen ?? '-'}</p>
                  <p className="text-xs text-gray-500 mt-2">Berlaku s/d: {formatDate(sertifikat.masaBerlakuSprechen)}</p>
                </div>
              </div>
            </div>
          </div>
        ))}

        {(!siswa.sertifikatBahasas || siswa.sertifikatBahasas.length === 0) && (
          <div className="bg-white p-8 rounded-xl border border-gray-200 text-center text-gray-500 shadow-sm">
            Anda belum memiliki data sertifikat bahasa yang tersimpan.
          </div>
        )}
      </div>

    </div>
  );
}
