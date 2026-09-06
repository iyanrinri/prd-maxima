import { getSession } from '@/lib/auth';
import { prisma } from '@/lib/db';
import { redirect } from 'next/navigation';
import { ArrowDownRight, ArrowUpRight, CheckCircle2, CircleDollarSign, AlertCircle } from 'lucide-react';

export default async function AdminKeuanganDashboard() {
  const session = await getSession();
  if (!session || session.role !== 'admin') redirect('/');

  // KPI Calculations
  const tagihans = await prisma.tagihan.findMany({
    include: { pembayarans: true }
  });

  const totalTagihanRp = tagihans.reduce((sum, t) => sum + t.nominalRupiah, 0);
  const totalTagihanEu = tagihans.reduce((sum, t) => sum + t.nominalEuro, 0);
  
  const pembayarans = await prisma.pembayaran.findMany();
  const totalPembayaranRp = pembayarans.reduce((sum, p) => sum + p.nominalRupiah, 0);
  const totalPembayaranEu = pembayarans.reduce((sum, p) => sum + p.nominalEuro, 0);

  const totalKekuranganRp = totalTagihanRp - totalPembayaranRp;

  // Siswa counts
  const siswas = await prisma.siswa.findMany({
    include: {
      tagihans: { include: { pembayarans: true } }
    }
  });

  let siswaLunasCount = 0;
  let siswaBelumLunasCount = 0;

  siswas.forEach(siswa => {
    // Check if all tagihan for this siswa are LUNAS
    const hasTagihan = siswa.tagihans.length > 0;
    const allLunas = hasTagihan && siswa.tagihans.every(t => t.status === 'LUNAS');
    
    if (allLunas) siswaLunasCount++;
    else if (hasTagihan) siswaBelumLunasCount++;
  });

  // Overdue tagihan
  const now = new Date();
  const overdueTagihans = tagihans.filter(t => new Date(t.jatuhTempo) < now && t.status !== 'LUNAS');

  const formatRp = (angka: number) => new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(angka);
  const formatEu = (angka: number) => new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(angka);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Dashboard Keuangan</h1>
        <p className="text-gray-500 mt-1">Ringkasan transaksi, tagihan, dan pembayaran (IDR & EUR).</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* KPI Cards */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium text-gray-500">Total Pembayaran Masuk</h3>
            <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
              <ArrowDownRight className="w-5 h-5 text-green-600" />
            </div>
          </div>
          <div className="space-y-1">
            <p className="text-2xl font-bold text-gray-900">{formatRp(totalPembayaranRp)}</p>
            {totalPembayaranEu > 0 && <p className="text-sm font-medium text-gray-500">{formatEu(totalPembayaranEu)}</p>}
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium text-gray-500">Total Tagihan (Invoice)</h3>
            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
              <CircleDollarSign className="w-5 h-5 text-blue-600" />
            </div>
          </div>
          <div className="space-y-1">
            <p className="text-2xl font-bold text-gray-900">{formatRp(totalTagihanRp)}</p>
            {totalTagihanEu > 0 && <p className="text-sm font-medium text-gray-500">{formatEu(totalTagihanEu)}</p>}
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium text-gray-500">Total Kekurangan (Piutang)</h3>
            <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
              <ArrowUpRight className="w-5 h-5 text-red-600" />
            </div>
          </div>
          <div className="space-y-1">
            <p className="text-2xl font-bold text-gray-900">{formatRp(Math.max(0, totalKekuranganRp))}</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Lunas vs Belum Lunas */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200 bg-gray-50 flex justify-between items-center">
            <h3 className="font-semibold text-gray-900">Status Siswa</h3>
          </div>
          <div className="p-6">
            <div className="flex items-center justify-around">
              <div className="text-center">
                <div className="w-16 h-16 mx-auto bg-green-100 rounded-full flex items-center justify-center mb-3">
                  <CheckCircle2 className="w-8 h-8 text-green-600" />
                </div>
                <div className="text-3xl font-bold text-gray-900">{siswaLunasCount}</div>
                <div className="text-sm text-gray-500">Siswa Lunas</div>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 mx-auto bg-amber-100 rounded-full flex items-center justify-center mb-3">
                  <AlertCircle className="w-8 h-8 text-amber-600" />
                </div>
                <div className="text-3xl font-bold text-gray-900">{siswaBelumLunasCount}</div>
                <div className="text-sm text-gray-500">Belum Lunas</div>
              </div>
            </div>
          </div>
        </div>

        {/* Tagihan Jatuh Tempo */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200 bg-red-50 flex justify-between items-center">
            <h3 className="font-semibold text-red-900 flex items-center"><AlertCircle className="w-4 h-4 mr-2" /> Tagihan Overdue</h3>
            <span className="bg-red-100 text-red-800 text-xs font-medium px-2.5 py-0.5 rounded-full">{overdueTagihans.length} Tagihan</span>
          </div>
          <div className="divide-y divide-gray-100 max-h-[300px] overflow-y-auto">
            {overdueTagihans.length === 0 ? (
              <div className="p-6 text-center text-gray-500">Tidak ada tagihan yang jatuh tempo.</div>
            ) : (
              overdueTagihans.map(t => (
                <div key={t.id} className="p-4 flex items-center justify-between hover:bg-gray-50">
                  <div>
                    <div className="font-medium text-gray-900">Tagihan {t.termin}</div>
                    <div className="text-sm text-red-500">Jatuh tempo: {new Date(t.jatuhTempo).toLocaleDateString('id-ID')}</div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-gray-900">{formatRp(t.nominalRupiah)}</div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
