import { getSession } from '@/lib/auth';
import { prisma } from '@/lib/db';
import { redirect } from 'next/navigation';
import { FileText, Calendar, Filter } from 'lucide-react';

export default async function LaporanKeuanganPage() {
  const session = await getSession();
  if (!session || session.role !== 'admin') redirect('/');

  // Simple aggregations for MVP Reports
  const tagihans = await prisma.tagihan.findMany({ include: { pembayarans: true, siswa: { include: { paket: true } } } });
  
  // Bulanan: Calculate Pemasukan this month vs last month (dummy logic for MVP: just sum all)
  const totalTagihan = tagihans.reduce((sum, t) => sum + t.nominalRupiah, 0);
  const totalDibayar = tagihans.reduce((sum, t) => sum + t.pembayarans.reduce((s, p) => s + p.nominalRupiah, 0), 0);
  
  // Program Breakdown
  const programStats: Record<string, { target: number, realisasi: number }> = {};
  tagihans.forEach(t => {
    const progName = t.siswa.paket.nama;
    if (!programStats[progName]) programStats[progName] = { target: 0, realisasi: 0 };
    programStats[progName].target += t.nominalRupiah;
    programStats[progName].realisasi += t.pembayarans.reduce((s, p) => s + p.nominalRupiah, 0);
  });

  const formatRp = (angka: number) => new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(angka);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Laporan Keuangan</h1>
          <p className="text-gray-500 mt-1">Rekapitulasi dan analitik data keuangan.</p>
        </div>
        <button className="flex items-center px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 text-sm font-medium transition-colors">
          <Filter className="w-4 h-4 mr-2" />
          Filter Bulan
        </button>
      </div>

      {/* Laporan Umum */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
          <h3 className="font-bold text-gray-900 mb-4 flex items-center">
            <Calendar className="w-5 h-5 mr-2 text-blue-600" />
            Laporan Kinerja Piutang
          </h3>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-500">Total Proyeksi Pendapatan (Tagihan)</span>
                <span className="font-medium">{formatRp(totalTagihan)}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-blue-600 h-2 rounded-full" style={{ width: '100%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-500">Realisasi Pemasukan (Terbayar)</span>
                <span className="font-medium text-green-600">{formatRp(totalDibayar)}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-green-500 h-2 rounded-full" style={{ width: `${Math.min((totalDibayar/totalTagihan)*100, 100)}%` }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-500">Total Piutang Berjalan</span>
                <span className="font-medium text-amber-600">{formatRp(totalTagihan - totalDibayar)}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
          <h3 className="font-bold text-gray-900 mb-4 flex items-center">
            <FileText className="w-5 h-5 mr-2 text-blue-600" />
            Laporan Per Program
          </h3>
          <div className="space-y-4">
            {Object.entries(programStats).map(([prog, stats]) => (
              <div key={prog} className="border-b border-gray-50 pb-3 last:border-0 last:pb-0">
                <div className="flex justify-between text-sm mb-1">
                  <span className="font-medium text-gray-900">{prog}</span>
                </div>
                <div className="flex justify-between text-xs text-gray-500">
                  <span>Target: {formatRp(stats.target)}</span>
                  <span className="text-green-600">Realisasi: {formatRp(stats.realisasi)}</span>
                </div>
              </div>
            ))}
            {Object.keys(programStats).length === 0 && (
              <p className="text-sm text-gray-500 text-center py-4">Belum ada data program.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
