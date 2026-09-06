import { getSession } from '@/lib/auth';
import { prisma } from '@/lib/db';
import { redirect, notFound } from 'next/navigation';
import Link from 'next/link';
import { ChevronLeft, User, FileText, Globe, Calendar, CreditCard, MessageSquare } from 'lucide-react';
import TahapanAdmissionSelector from './TahapanAdmissionSelector';
import DokumenForm from './DokumenForm';
import SertifikatForm from './SertifikatForm';
import JadwalUjianForm from './JadwalUjianForm';
import LayananFinanceForm from './LayananFinanceForm';
import BahasaDanRekomendasiForm from './BahasaDanRekomendasiForm';
import LatihanWawancaraForm from './LatihanWawancaraForm';
import TimelineView from './TimelineView';

export const metadata = {
  title: 'Detail Siswa - Maxima',
};

export default async function DetailSiswaAdmission({
  params,
  searchParams
}: {
  params: Promise<{ id: string }>,
  searchParams: Promise<{ tab?: string }>
}) {
  const session = await getSession();
  if (!session || (session.role !== 'admin' && session.role !== 'admin_admission')) redirect('/');

  const resolvedParams = await params;
  const resolvedSearch = await searchParams;
  const activeTab = resolvedSearch.tab || 'dokumen';

  const siswa = await prisma.siswa.findUnique({
    where: { id: resolvedParams.id },
    include: {
      dokumenSiswa: true,
      kelas: true,
      paket: true,
      rekomendasiUjians: true,
      jadwalUjianBahasas: true,
      sertifikatBahasas: true,
      layananSiswas: true,
      progresBahasas: true,
      latihanWawancaras: true,
      timelineAdmissions: { orderBy: { createdAt: 'desc' } }
    }
  });

  if (!siswa) notFound();

  // Duplicate definition removed
  return (
    <div className="space-y-6 max-w-6xl mx-auto pb-12">
      <div className="flex items-center space-x-3 mb-6">
        <Link href="/admin/admission/database-siswa" className="p-2 hover:bg-gray-100 rounded-full transition-colors">
          <ChevronLeft className="w-5 h-5 text-gray-600" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Detail Siswa: {siswa.namaLengkap}</h1>
          <p className="text-sm text-gray-500">No Kontrak: {siswa.noKontrak}</p>
        </div>
      </div>

      <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex flex-col space-y-1">
          <div className="text-sm text-gray-500">Program</div>
          <div className="font-semibold text-gray-900">{siswa.program} - {siswa.cabang}</div>
        </div>
        <div className="flex flex-col space-y-1">
          <div className="text-sm text-gray-500">Paket</div>
          <div className="font-semibold text-gray-900">{siswa.paket?.nama || '-'}</div>
        </div>
        <div className="flex flex-col space-y-1">
          <div className="text-sm text-gray-500">Status Akademik</div>
          <div className={`font-semibold ${siswa.status === 'AKTIF' ? 'text-green-600' : 'text-gray-600'}`}>{siswa.status}</div>
        </div>
        <div className="w-px h-12 bg-gray-200 hidden md:block"></div>
        <div className="flex flex-col space-y-1">
          <div className="text-sm text-gray-500 mb-1">Tahapan Admission</div>
          <TahapanAdmissionSelector siswaId={siswa.id} currentTahapan={siswa.tahapanAdmission} />
        </div>
      </div>

      <div className="flex space-x-2 border-b border-gray-200 overflow-x-auto hide-scrollbar">
        <Link href={`?tab=profil`} className={`px-4 py-3 text-sm font-medium border-b-2 flex items-center whitespace-nowrap transition-colors ${activeTab === 'profil' ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}>
          <User className="h-4 w-4 mr-2" /> Biodata & Dokumen
        </Link>
        <Link href={`?tab=sertifikat`} className={`px-4 py-3 text-sm font-medium border-b-2 flex items-center whitespace-nowrap transition-colors ${activeTab === 'sertifikat' ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}>
          <Globe className="h-4 w-4 mr-2" /> Bahasa & Sertifikat
        </Link>
        <Link href={`?tab=jadwal`} className={`px-4 py-3 text-sm font-medium border-b-2 flex items-center whitespace-nowrap transition-colors ${activeTab === 'jadwal' ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}>
          <Calendar className="h-4 w-4 mr-2" /> Jadwal Ujian
        </Link>
        <Link href={`?tab=layanan`} className={`px-4 py-3 border-b-2 font-medium text-sm flex items-center whitespace-nowrap transition-colors ${activeTab === 'layanan' ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}>
          <CreditCard className="w-4 h-4 mr-2" /> Layanan Finance
        </Link>
        <Link href={`?tab=wawancara`} className={`px-4 py-3 border-b-2 font-medium text-sm flex items-center whitespace-nowrap transition-colors ${activeTab === 'wawancara' ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}>
          <MessageSquare className="w-4 h-4 mr-2" /> Wawancara & Partner
        </Link>
        <Link href={`?tab=timeline`} className={`px-4 py-3 border-b-2 font-medium text-sm flex items-center whitespace-nowrap transition-colors ${activeTab === 'timeline' ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}>
          <FileText className="w-4 h-4 mr-2" /> Timeline
        </Link>
      </div>

      {activeTab === 'profil' && (
        <DokumenForm siswaId={siswa.id} initialData={siswa.dokumenSiswa} />
      )}

      {activeTab === 'sertifikat' && (
        <>
          <BahasaDanRekomendasiForm 
            siswaId={siswa.id} 
            progres={siswa.progresBahasas as any} 
            rekomendasi={siswa.rekomendasiUjians as any} 
          />
          <SertifikatForm siswaId={siswa.id} sertifikats={siswa.sertifikatBahasas as any} />
        </>
      )}

      {activeTab === 'jadwal' && (
        <JadwalUjianForm siswaId={siswa.id} jadwal={siswa.jadwalUjianBahasas as any} />
      )}

      {activeTab === 'layanan' && (
        <LayananFinanceForm siswaId={siswa.id} layanan={siswa.layananSiswas as any} />
      )}

      {activeTab === 'wawancara' && (
        <LatihanWawancaraForm siswaId={siswa.id} latihanList={siswa.latihanWawancaras as any} />
      )}

      {activeTab === 'timeline' && (
        <TimelineView siswaId={siswa.id} timelineList={siswa.timelineAdmissions as any} />
      )}
    </div>
  );
}
