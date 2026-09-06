import { prisma } from '@/lib/db';
import { getSession } from '@/lib/auth';
import { redirect } from 'next/navigation';

export default async function MarketingDashboardPage() {
  const session = await getSession();
  if (!session) redirect('/admin/login');

  // Fetch all Siswas
  const siswas = await prisma.siswa.findMany({
    include: {
      paket: true,
      konsultan: true,
      pembayarans: true
    }
  });

  const totalSiswaAktif = siswas.filter(s => s.status === 'AKTIF').length;
  const totalCuti = siswas.filter(s => s.status === 'CUTI').length;
  const totalMundur = siswas.filter(s => s.status === 'MUNDUR').length;
  const totalDP = siswas.reduce((acc, s) => acc + s.pembayarans.filter(p => p.jenis === 'DP' && p.status === 'Lunas').reduce((sum, p) => sum + p.nominal, 0), 0);

  // Group by Konsultan
  const konsultanMap = new Map();
  siswas.forEach(s => {
    const kName = s.konsultan?.nama || 'Belum Ada PIC';
    if (!konsultanMap.has(kName)) {
      konsultanMap.set(kName, { nama: kName, siswaAktif: 0, kontrakTotal: 0, totalDP: 0 });
    }
    const kData = konsultanMap.get(kName);
    kData.kontrakTotal += 1;
    if (s.status === 'AKTIF') kData.siswaAktif += 1;
    kData.totalDP += s.pembayarans.filter(p => p.jenis === 'DP' && p.status === 'Lunas').reduce((sum, p) => sum + p.nominal, 0);
  });
  const performanceTeam = Array.from(konsultanMap.values());

  // Source Lead
  const sourceLeadCount = siswas.reduce((acc: Record<string, number>, s) => {
    const sumber = s.sumberLead || 'Tidak Diketahui';
    acc[sumber] = (acc[sumber] || 0) + 1;
    return acc;
  }, {});

  // Program Breakdown
  const programCount = siswas.reduce((acc: Record<string, any>, s) => {
    const prog = s.program || 'Umum';
    if (!acc[prog]) acc[prog] = { aktif: 0, cuti: 0, mundur: 0 };
    if (s.status === 'AKTIF') acc[prog].aktif += 1;
    else if (s.status === 'CUTI') acc[prog].cuti += 1;
    else if (s.status === 'MUNDUR') acc[prog].mundur += 1;
    return acc;
  }, {});

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Dashboard Kepala Marketing</h1>
        <p className="text-gray-500 mt-1">Ringkasan performa tim konsultan dan analisis sumber lead siswa.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
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
        <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
          <p className="text-sm text-gray-500 font-medium">Total DP Diterima</p>
          <p className="text-xl font-bold text-green-600 mt-2">
            {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(totalDP)}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Source Lead */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden col-span-1">
          <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
            <h3 className="font-semibold text-gray-900">Analisis Sumber Lead</h3>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {Object.entries(sourceLeadCount).map(([sumber, count]) => {
                const percentage = Math.round(((count as number) / siswas.length) * 100);
                return (
                  <div key={sumber}>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="font-medium text-gray-700">{sumber}</span>
                      <span className="text-gray-500">{count} ({percentage}%)</span>
                    </div>
                    <div className="w-full bg-gray-100 rounded-full h-2">
                      <div className="bg-blue-500 h-2 rounded-full" style={{ width: `${percentage}%` }}></div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Program */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden col-span-2">
          <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
            <h3 className="font-semibold text-gray-900">Analisis Program</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-white text-gray-500 border-b">
                <tr>
                  <th className="px-6 py-3 font-medium">Program</th>
                  <th className="px-6 py-3 font-medium text-center">Aktif</th>
                  <th className="px-6 py-3 font-medium text-center">Cuti</th>
                  <th className="px-6 py-3 font-medium text-center">Mundur</th>
                  <th className="px-6 py-3 font-medium text-center">Total</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {Object.entries(programCount).map(([prog, data]) => {
                  const d = data as any;
                  return (
                    <tr key={prog} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 text-gray-900 font-medium">{prog}</td>
                      <td className="px-6 py-4 text-center text-blue-600 font-semibold">{d.aktif}</td>
                      <td className="px-6 py-4 text-center text-yellow-600">{d.cuti}</td>
                      <td className="px-6 py-4 text-center text-red-600">{d.mundur}</td>
                      <td className="px-6 py-4 text-center font-bold text-gray-900">{d.aktif + d.cuti + d.mundur}</td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
          <h3 className="font-semibold text-gray-900">Performance Team Konsultan</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-white text-gray-500 border-b">
              <tr>
                <th className="px-6 py-3 font-medium">PIC Konsultan</th>
                <th className="px-6 py-3 font-medium text-center">Total Kontrak</th>
                <th className="px-6 py-3 font-medium text-center">Siswa Aktif</th>
                <th className="px-6 py-3 font-medium text-right">Total DP Terkumpul</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {performanceTeam.sort((a, b) => b.siswaAktif - a.siswaAktif).map((p, idx) => (
                <tr key={idx} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 text-gray-900 font-medium flex items-center">
                    <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-bold mr-3">
                      {p.nama.charAt(0)}
                    </div>
                    {p.nama}
                  </td>
                  <td className="px-6 py-4 text-center">{p.kontrakTotal}</td>
                  <td className="px-6 py-4 text-center font-semibold text-blue-600">{p.siswaAktif}</td>
                  <td className="px-6 py-4 text-right font-medium text-green-700">
                    {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(p.totalDP)}
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
