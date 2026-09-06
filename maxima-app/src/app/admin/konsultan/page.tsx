import { prisma } from '@/lib/db';
import { getSession } from '@/lib/auth';
import { redirect } from 'next/navigation';
import Link from 'next/link';

export default async function KonsultanDashboardPage(props: { searchParams: Promise<{ pic?: string }> }) {
  const searchParams = await props.searchParams;
  const session = await getSession();
  if (!session) redirect('/admin/login');

  const allKonsultan = await prisma.konsultan.findMany({
    orderBy: { nama: 'asc' }
  });

  const selectedPicId = searchParams?.pic || (allKonsultan.length > 0 ? allKonsultan[0].id : null);
  
  if (!selectedPicId) {
    return <div className="p-6">Belum ada data Konsultan di sistem.</div>;
  }

  const selectedPic = allKonsultan.find(k => k.id === selectedPicId);

  // Fetch siswas for this PIC
  const siswas = await prisma.siswa.findMany({
    where: { konsultanId: selectedPicId },
    include: {
      paket: true,
      kelas: true,
      dokumenSiswa: true,
    },
    orderBy: { namaLengkap: 'asc' }
  });

  const totalSiswaAktif = siswas.filter(s => s.status === 'AKTIF').length;
  const totalCuti = siswas.filter(s => s.status === 'CUTI').length;
  const totalMundur = siswas.filter(s => s.status === 'MUNDUR').length;

  // Source Lead
  const sourceLeadCount = siswas.reduce((acc: Record<string, number>, s) => {
    const sumber = s.sumberLead || 'Tidak Diketahui';
    acc[sumber] = (acc[sumber] || 0) + 1;
    return acc;
  }, {});

  // Program
  const programCount = siswas.reduce((acc: Record<string, number>, s) => {
    const prog = s.program || 'Umum';
    acc[prog] = (acc[prog] || 0) + 1;
    return acc;
  }, {});

  // Domisili
  const domisiliCount = siswas.reduce((acc: Record<string, number>, s) => {
    const dom = s.domisili || 'Lainnya';
    acc[dom] = (acc[dom] || 0) + 1;
    return acc;
  }, {});

  // Pendidikan
  const pendidikanCount = siswas.reduce((acc: Record<string, number>, s) => {
    const p = s.pendidikanTerakhir || 'Lainnya';
    acc[p] = (acc[p] || 0) + 1;
    return acc;
  }, {});

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard Konsultan</h1>
          <p className="text-gray-500 mt-1">Pantau KPI dan progres siswa asuhan Anda.</p>
        </div>

        <div className="bg-white px-4 py-2 rounded-lg border border-gray-200 flex items-center">
          <span className="text-sm text-gray-500 mr-3">Pilih PIC:</span>
          <select 
            className="border-none text-sm font-semibold bg-transparent focus:ring-0 p-0 pr-8"
            defaultValue={selectedPicId}
          >
            {allKonsultan.map(k => (
              <option key={k.id} value={k.id}>{k.nama}</option>
            ))}
          </select>
          {/* Quick links to replace client-side JS for the dropdown */}
          <div className="ml-2 flex gap-1">
            {allKonsultan.map((k, i) => (
              <Link 
                key={k.id} 
                href={`/admin/konsultan?pic=${k.id}`}
                className={`text-xs px-2 py-1 rounded ${selectedPicId === k.id ? 'bg-blue-600 text-white' : 'bg-gray-100 hover:bg-gray-200'}`}
                title={k.nama}
              >
                {i + 1}
              </Link>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
          <p className="text-sm text-gray-500 font-medium">Siswa Aktif</p>
          <p className="text-3xl font-bold text-blue-600 mt-2">{totalSiswaAktif}</p>
        </div>
        <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
          <p className="text-sm text-gray-500 font-medium">Siswa Cuti</p>
          <p className="text-3xl font-bold text-yellow-600 mt-2">{totalCuti}</p>
        </div>
        <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
          <p className="text-sm text-gray-500 font-medium">Mengundurkan Diri</p>
          <p className="text-3xl font-bold text-red-600 mt-2">{totalMundur}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Source Lead */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5">
          <h3 className="font-semibold text-gray-900 mb-4">Sumber Lead</h3>
          <div className="space-y-3 text-sm">
            {Object.entries(sourceLeadCount).map(([k, v]) => (
              <div key={k} className="flex justify-between items-center">
                <span className="text-gray-600">{k}</span>
                <span className="font-medium">{v as number}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Program */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5">
          <h3 className="font-semibold text-gray-900 mb-4">Program Diminati</h3>
          <div className="space-y-3 text-sm">
            {Object.entries(programCount).map(([k, v]) => (
              <div key={k} className="flex justify-between items-center">
                <span className="text-gray-600">{k}</span>
                <span className="font-medium">{v as number}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Domisili */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5">
          <h3 className="font-semibold text-gray-900 mb-4">Demografi: Domisili</h3>
          <div className="space-y-3 text-sm">
            {Object.entries(domisiliCount).map(([k, v]) => (
              <div key={k} className="flex justify-between items-center">
                <span className="text-gray-600">{k}</span>
                <span className="font-medium">{v as number}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Pendidikan */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5">
          <h3 className="font-semibold text-gray-900 mb-4">Pendidikan Terakhir</h3>
          <div className="space-y-3 text-sm">
            {Object.entries(pendidikanCount).map(([k, v]) => (
              <div key={k} className="flex justify-between items-center">
                <span className="text-gray-600">{k}</span>
                <span className="font-medium">{v as number}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200 bg-gray-50 flex justify-between items-center">
          <h3 className="font-semibold text-gray-900">Progres Siswa (Pembelajaran & Pemberkasan)</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-white text-gray-500 border-b">
              <tr>
                <th className="px-6 py-3 font-medium">Nama Siswa</th>
                <th className="px-6 py-3 font-medium">Program</th>
                <th className="px-6 py-3 font-medium">Kelas / Level</th>
                <th className="px-6 py-3 font-medium">Tahapan Admission</th>
                <th className="px-6 py-3 font-medium text-center">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {siswas.map((s) => (
                <tr key={s.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 font-medium text-blue-600 hover:underline">
                    <Link href={`/admin/admission/database-siswa/${s.id}`}>{s.namaLengkap}</Link>
                  </td>
                  <td className="px-6 py-4 text-gray-600">{s.program}</td>
                  <td className="px-6 py-4 text-gray-600">{s.kelas?.nama || '-'} ({s.kelas?.level || '-'})</td>
                  <td className="px-6 py-4 text-gray-600">{s.tahapanAdmission}</td>
                  <td className="px-6 py-4 text-center">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      s.status === 'AKTIF' ? 'bg-green-100 text-green-800' :
                      s.status === 'CUTI' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {s.status}
                    </span>
                  </td>
                </tr>
              ))}
              {siswas.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-6 py-8 text-center text-gray-500">
                    Tidak ada data siswa untuk PIC ini.
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
