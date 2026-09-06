import { getSession } from '@/lib/auth';
import { prisma } from '@/lib/db';
import { redirect } from 'next/navigation';

export default async function SiswaAdmissionProgressPage() {
  const session = await getSession();
  if (!session) redirect('/');

  const siswa = await prisma.siswa.findFirst({
    include: {
      dokumenSiswa: true,
      sertifikatBahasas: true,
      latihanWawancaras: true,
      progresPartners: true,
    }
  });

  if (!siswa) return <div>Data siswa tidak ditemukan.</div>;

  const isDokumenLengkap = siswa.dokumenSiswa ? true : false; // Simplification
  const isSertifikatLengkap = siswa.sertifikatBahasas && siswa.sertifikatBahasas.length > 0;
  
  const jumlahLatihanInterview = siswa.latihanWawancaras?.length || 0;
  const partnerAktif = siswa.progresPartners?.filter(p => p.statusProgres !== 'Ditolak').length || 0;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Admission Progress</h1>
        <p className="text-gray-500 mt-1">Pantau progres penempatan dan persiapan kerja Anda.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Readiness Cards */}
        <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-500">Status Dokumen</p>
            <p className={`font-bold mt-1 ${isDokumenLengkap ? 'text-green-600' : 'text-red-600'}`}>
              {isDokumenLengkap ? 'Lengkap' : 'Kurang'}
            </p>
          </div>
          <div className={`p-2 rounded-lg ${isDokumenLengkap ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
          </div>
        </div>
        
        <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-500">Sertifikat Bahasa</p>
            <p className={`font-bold mt-1 ${isSertifikatLengkap ? 'text-green-600' : 'text-red-600'}`}>
              {isSertifikatLengkap ? 'Lengkap' : 'Kurang'}
            </p>
          </div>
          <div className={`p-2 rounded-lg ${isSertifikatLengkap ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-500">Latihan Interview</p>
            <p className="font-bold text-gray-900 mt-1">{jumlahLatihanInterview} Kali</p>
          </div>
          <div className="p-2 rounded-lg bg-blue-100 text-blue-600">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z"></path></svg>
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-500">Partner Diproses</p>
            <p className="font-bold text-gray-900 mt-1">{partnerAktif} Partner</p>
          </div>
          <div className="p-2 rounded-lg bg-indigo-100 text-indigo-600">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
          </div>
        </div>
      </div>

      {/* Daftar Partner */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
          <h3 className="font-semibold text-gray-900">Status Wawancara Partner & Perusahaan</h3>
        </div>
        <div className="p-6 space-y-6">
          {siswa.progresPartners?.map((partner) => (
            <div key={partner.id} className="border border-gray-100 rounded-xl p-5 bg-gray-50 hover:bg-white transition-colors shadow-sm">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h4 className="text-lg font-bold text-gray-900">{partner.namaPartner}</h4>
                  <p className="text-sm text-gray-500">{partner.posisi} di {partner.namaPerusahaan}</p>
                </div>
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                  {partner.statusProgres}
                </span>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm mb-4">
                <div>
                  <p className="text-gray-500 mb-1">Status Wawancara Partner</p>
                  <p className="font-medium text-gray-900">{partner.statusWawancaraPartner || 'Belum Dijadwalkan'}</p>
                </div>
                <div>
                  <p className="text-gray-500 mb-1">Status Wawancara Perusahaan</p>
                  <p className="font-medium text-gray-900">{partner.statusWawancaraUser || 'Belum Dijadwalkan'}</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm bg-white p-4 rounded-lg border border-gray-100">
                <div>
                  <p className="font-medium text-gray-700 mb-1">Catatan Partner</p>
                  <p className="text-gray-600 italic">"{partner.catatanPartner || 'Tidak ada catatan'}"</p>
                </div>
                <div>
                  <p className="font-medium text-gray-700 mb-1">Catatan Admission</p>
                  <p className="text-gray-600 italic">"{partner.catatanInternal || 'Tidak ada catatan'}"</p>
                </div>
              </div>
            </div>
          ))}
          {(!siswa.progresPartners || siswa.progresPartners.length === 0) && (
            <div className="text-center text-gray-500 py-8">Belum ada partner yang sedang diproses.</div>
          )}
        </div>
      </div>
    </div>
  );
}
