import { getSession } from '@/lib/auth';
import { prisma } from '@/lib/db';
import { redirect } from 'next/navigation';

export default async function SiswaPembayaranPage() {
  const session = await getSession();
  if (!session) redirect('/');

  const siswa = await prisma.siswa.findFirst({
    include: {
      paket: true,
      pembayarans: {
        orderBy: { tanggal: 'desc' }
      },
    }
  });

  if (!siswa) return <div>Data tidak ditemukan</div>;

  const totalDibayar = siswa.pembayarans.reduce((sum, p) => sum + p.nominalRupiah, 0);
  const kekurangan = siswa.paket.hargaRupiah - totalDibayar;
  
  const formatRp = (angka: number) => new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(angka);
  const formatDate = (date: Date) => new Intl.DateTimeFormat('id-ID', { dateStyle: 'long' }).format(date);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Riwayat Pembayaran</h1>
        <p className="text-gray-500 mt-1">Daftar transaksi dan tagihan Anda.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm md:col-span-1">
          <h3 className="text-sm font-medium text-gray-500">Total Harga Paket</h3>
          <p className="text-2xl font-bold text-gray-900 mt-2">{formatRp(siswa.paket.hargaRupiah)}</p>
        </div>
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm md:col-span-1">
          <h3 className="text-sm font-medium text-gray-500">Sudah Dibayar</h3>
          <p className="text-2xl font-bold text-green-600 mt-2">{formatRp(totalDibayar)}</p>
        </div>
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm md:col-span-1">
          <h3 className="text-sm font-medium text-gray-500">Sisa Kekurangan</h3>
          <p className="text-2xl font-bold text-red-600 mt-2">{formatRp(kekurangan > 0 ? kekurangan : 0)}</p>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
          <h3 className="font-semibold text-gray-900">Daftar Transaksi</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-white text-gray-500 border-b">
              <tr>
                <th className="px-6 py-3 font-medium">Tanggal</th>
                <th className="px-6 py-3 font-medium">Keterangan</th>
                <th className="px-6 py-3 font-medium">Metode</th>
                <th className="px-6 py-3 font-medium text-right">Nominal (Rp)</th>
                <th className="px-6 py-3 font-medium text-center">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {siswa.pembayarans.map((pembayaran) => (
                <tr key={pembayaran.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 text-gray-900">{formatDate(pembayaran.tanggal)}</td>
                  <td className="px-6 py-4 text-gray-600">{pembayaran.keterangan}</td>
                  <td className="px-6 py-4 text-gray-600">{pembayaran.metode}</td>
                  <td className="px-6 py-4 text-gray-900 font-medium text-right">{formatRp(pembayaran.nominalRupiah)}</td>
                  <td className="px-6 py-4 text-center">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      {pembayaran.status}
                    </span>
                  </td>
                </tr>
              ))}
              {siswa.pembayarans.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-6 py-8 text-center text-gray-500">Belum ada transaksi</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
