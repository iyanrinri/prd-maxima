import { getSession } from '@/lib/auth';
import { prisma } from '@/lib/db';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { Search, Filter, Eye } from 'lucide-react';

export const metadata = {
  title: 'Database Siswa - Maxima',
};

export default async function DatabaseSiswaPage() {
  const session = await getSession();
  if (!session || (session.role !== 'admin' && session.role !== 'admin_admission')) redirect('/');

  const siswaList = await prisma.siswa.findMany({
    include: {
      dokumenSiswa: true,
      kelas: true,
    },
    orderBy: {
      createdAt: 'desc'
    }
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Database Siswa (Admission)</h1>
          <p className="text-gray-500 mt-1">Kelola data diri, dokumen pribadi, bahasa & nilai, jadwal ujian, dan layanan siswa.</p>
        </div>
        
        <div className="flex items-center space-x-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input 
              type="text" 
              placeholder="Cari siswa..." 
              className="pl-9 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-64"
            />
          </div>
          <button className="flex items-center px-3 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </button>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-50 text-gray-500 border-b">
              <tr>
                <th className="px-6 py-4 font-medium">No. Kontrak</th>
                <th className="px-6 py-4 font-medium">Nama Siswa</th>
                <th className="px-6 py-4 font-medium">Program / Cabang</th>
                <th className="px-6 py-4 font-medium">Tahapan Admission</th>
                <th className="px-6 py-4 font-medium text-center">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {siswaList.map((siswa) => (
                <tr key={siswa.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-6 py-4 font-medium text-gray-900">{siswa.noKontrak}</td>
                  <td className="px-6 py-4">
                    <div className="font-semibold text-gray-900">{siswa.namaLengkap}</div>
                    <div className="text-xs text-gray-500">{siswa.kelas?.nama || 'Belum masuk kelas'}</div>
                  </td>
                  <td className="px-6 py-4 text-gray-600">
                    {siswa.program} <br />
                    <span className="text-xs text-gray-400">{siswa.cabang}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-1 text-xs font-medium rounded-full ${
                      siswa.tahapanAdmission === 'Belum Diproses' ? 'bg-gray-100 text-gray-800' :
                      siswa.tahapanAdmission === 'Sedang Diproses' ? 'bg-yellow-100 text-yellow-800' :
                      siswa.tahapanAdmission === 'Sudah Interview' ? 'bg-indigo-100 text-indigo-800' :
                      siswa.tahapanAdmission === 'Sudah Dapat Vertrag' ? 'bg-green-100 text-green-800' :
                      siswa.tahapanAdmission === 'Sedang Proses Visa' ? 'bg-orange-100 text-orange-800' :
                      siswa.tahapanAdmission === 'Visa Granted' ? 'bg-emerald-100 text-emerald-800' :
                      siswa.tahapanAdmission === 'Sudah Berangkat' ? 'bg-teal-100 text-teal-800' :
                      'bg-blue-100 text-blue-800'
                    }`}>
                      {siswa.tahapanAdmission || 'Belum Diproses'}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <Link 
                      href={`/admin/admission/database-siswa/${siswa.id}`}
                      className="inline-flex items-center px-3 py-1.5 bg-white border border-gray-300 text-blue-600 rounded-md hover:bg-blue-50 transition font-medium text-xs"
                    >
                      <Eye className="h-3.5 w-3.5 mr-1.5" />
                      Detail Lengkap
                    </Link>
                  </td>
                </tr>
              ))}
              {siswaList.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-gray-500">
                    Belum ada data siswa pendaftar.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <div className="px-6 py-4 border-t border-gray-100 bg-gray-50 flex justify-between items-center text-sm text-gray-500">
          <span>Menampilkan {siswaList.length} siswa</span>
          <div className="space-x-2">
            <button className="px-3 py-1 bg-white border border-gray-300 rounded hover:bg-gray-50" disabled>Sebelumnya</button>
            <button className="px-3 py-1 bg-white border border-gray-300 rounded hover:bg-gray-50" disabled>Selanjutnya</button>
          </div>
        </div>
      </div>
    </div>
  );
}
