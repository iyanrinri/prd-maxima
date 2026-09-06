import { getSession } from '@/lib/auth';
import { prisma } from '@/lib/db';
import { redirect } from 'next/navigation';

export default async function SiswaProfilPage() {
  const session = await getSession();
  if (!session) redirect('/');

  const siswa = await prisma.siswa.findFirst({
    include: {
      paket: true,
      dokumenSiswa: true,
    }
  });

  if (!siswa) {
    return <div>Data siswa tidak ditemukan.</div>;
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Profil Saya</h1>
        <p className="text-gray-500 mt-1">Kelola data diri dan dokumen pribadi Anda.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Data Diri */}
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 border-b pb-2">Data Diri Lengkap</h3>
          <div className="space-y-3">
            <div>
              <p className="text-sm text-gray-500">Nama Lengkap</p>
              <p className="font-medium text-gray-900">{siswa.namaLengkap}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">No Kontrak</p>
              <p className="font-medium text-gray-900">{siswa.noKontrak}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Program</p>
              <p className="font-medium text-gray-900">{siswa.program}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Cabang</p>
              <p className="font-medium text-gray-900">{siswa.cabang}</p>
            </div>
          </div>
        </div>

        {/* Tim Support */}
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 border-b pb-2">Tim Support Anda</h3>
          <div className="space-y-4">
            <div className="flex items-center p-3 bg-blue-50 rounded-lg border border-blue-100">
              <div className="bg-blue-100 p-2 rounded-full text-blue-600 mr-4">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
              </div>
              <div>
                <p className="text-sm text-gray-500">PIC Konsultan</p>
                <p className="font-semibold text-gray-900">Admin Maxima</p>
              </div>
            </div>
            <div className="flex items-center p-3 bg-green-50 rounded-lg border border-green-100">
              <div className="bg-green-100 p-2 rounded-full text-green-600 mr-4">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
              </div>
              <div>
                <p className="text-sm text-gray-500">Admission PIC</p>
                <p className="font-semibold text-gray-900">Tim Admission Maxima</p>
              </div>
            </div>
          </div>
        </div>

        {/* Dokumen Pribadi */}
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm md:col-span-2">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 border-b pb-2">Dokumen Pribadi Lengkap</h3>
          {siswa.dokumenSiswa ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                { label: 'CV', key: 'cvUrl' },
                { label: 'Paspor', key: 'pasporUrl' },
                { label: 'KTP', key: 'ktpUrl' },
                { label: 'Ijazah', key: 'ijazahUrl' },
                { label: 'Transkrip', key: 'transkripUrl' },
                { label: 'Motivation Letter', key: 'motivationLetterUrl' },
              ].map((doc) => (
                <div key={doc.key} className="flex items-center justify-between p-3 border border-gray-100 rounded-lg bg-gray-50">
                  <div className="flex items-center">
                    <svg className="w-5 h-5 text-gray-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
                    <span className="text-sm font-medium text-gray-700">{doc.label}</span>
                  </div>
                  {siswa.dokumenSiswa[doc.key as keyof typeof siswa.dokumenSiswa] ? (
                    <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800">Tersedia</span>
                  ) : (
                    <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-red-100 text-red-800">Kosong</span>
                  )}
                </div>
              ))}
            </div>
          ) : (
             <div className="text-center py-6 text-gray-500">Belum ada data dokumen yang diunggah.</div>
          )}
        </div>

      </div>
    </div>
  );
}
