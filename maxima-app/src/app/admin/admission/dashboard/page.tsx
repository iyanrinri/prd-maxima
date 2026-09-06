import { getSession } from '@/lib/auth';
import { prisma } from '@/lib/db';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { Users, UserCheck, Clock, CheckCircle2, AlertCircle, Plane } from 'lucide-react';

export const metadata = {
  title: 'Dashboard Admission - Maxima',
};

export default async function AdmissionDashboardPage() {
  const session = await getSession();
  if (!session || (session.role !== 'admin' && session.role !== 'admin_admission')) redirect('/');

  // Aggregate Data
  const semuaSiswa = await prisma.siswa.findMany();
  
  // Hitung jumlah berdasarkan tahapanAdmission
  const totalSiswa = semuaSiswa.length;
  const belumDiproses = semuaSiswa.filter(s => s.tahapanAdmission === 'Belum Diproses').length;
  const sedangDiproses = semuaSiswa.filter(s => s.tahapanAdmission === 'Sedang Diproses').length;
  const sudahInterview = semuaSiswa.filter(s => s.tahapanAdmission === 'Sudah Interview').length;
  const sudahDapatVertrag = semuaSiswa.filter(s => s.tahapanAdmission === 'Sudah Dapat Vertrag').length;
  const sedangProsesVisa = semuaSiswa.filter(s => s.tahapanAdmission === 'Sedang Proses Visa').length;
  const visaGranted = semuaSiswa.filter(s => s.tahapanAdmission === 'Visa Granted').length;
  const sudahBerangkat = semuaSiswa.filter(s => s.tahapanAdmission === 'Sudah Berangkat').length;
  const alumni = semuaSiswa.filter(s => s.tahapanAdmission === 'Alumni').length;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Dashboard Admission</h1>
        <p className="text-gray-500 mt-1">Ringkasan status proses admission dan keberangkatan siswa.</p>
      </div>

      {/* TOP KPI */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
        <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
          <h3 className="text-xs font-medium text-gray-500 leading-tight h-8">Total Siswa Aktif</h3>
          <p className="text-2xl font-bold text-blue-600 mt-1">{totalSiswa}</p>
        </div>
        <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
          <h3 className="text-xs font-medium text-gray-500 leading-tight h-8">Belum Diproses</h3>
          <p className="text-2xl font-bold text-gray-700 mt-1">{belumDiproses}</p>
        </div>
        <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
          <h3 className="text-xs font-medium text-gray-500 leading-tight h-8">Sedang Diproses</h3>
          <p className="text-2xl font-bold text-yellow-600 mt-1">{sedangDiproses}</p>
        </div>
        <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
          <h3 className="text-xs font-medium text-gray-500 leading-tight h-8">Sudah Interview</h3>
          <p className="text-2xl font-bold text-indigo-600 mt-1">{sudahInterview}</p>
        </div>
        <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
          <h3 className="text-xs font-medium text-gray-500 leading-tight h-8">Sudah Dapat Vertrag</h3>
          <p className="text-2xl font-bold text-green-600 mt-1">{sudahDapatVertrag}</p>
        </div>
        <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
          <h3 className="text-xs font-medium text-gray-500 leading-tight h-8">Sedang Proses Visa</h3>
          <p className="text-2xl font-bold text-orange-600 mt-1">{sedangProsesVisa}</p>
        </div>
        <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
          <h3 className="text-xs font-medium text-gray-500 leading-tight h-8">Visa Granted</h3>
          <p className="text-2xl font-bold text-emerald-600 mt-1">{visaGranted}</p>
        </div>
        <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
          <h3 className="text-xs font-medium text-gray-500 leading-tight h-8">Sudah Berangkat</h3>
          <p className="text-2xl font-bold text-teal-600 mt-1">{sudahBerangkat}</p>
        </div>
        <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
          <h3 className="text-xs font-medium text-gray-500 leading-tight h-8">Alumni</h3>
          <p className="text-2xl font-bold text-purple-600 mt-1">{alumni}</p>
        </div>
      </div>
      
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
          <h3 className="font-semibold text-gray-900">Database Siswa Terbaru</h3>
          <Link href="/admin/admission/database-siswa" className="text-sm text-blue-600 hover:underline">Lihat Semua</Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-50 text-gray-500 border-b">
              <tr>
                <th className="px-6 py-3 font-medium">Nama Siswa</th>
                <th className="px-6 py-3 font-medium">Program</th>
                <th className="px-6 py-3 font-medium">Tahapan Admission</th>
                <th className="px-6 py-3 font-medium text-center">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {semuaSiswa.slice(0, 5).map(siswa => (
                <tr key={siswa.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 font-medium text-gray-900">{siswa.namaLengkap}</td>
                  <td className="px-6 py-4 text-gray-500">{siswa.program}</td>
                  <td className="px-6 py-4">
                    <span className="px-2.5 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">
                      {siswa.tahapanAdmission || 'Belum Diproses'}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <button className="text-xs px-3 py-1.5 bg-white border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition">Detail</button>
                  </td>
                </tr>
              ))}
              {semuaSiswa.length === 0 && (
                <tr>
                  <td colSpan={4} className="px-6 py-8 text-center text-gray-500">
                    Belum ada data siswa.
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
