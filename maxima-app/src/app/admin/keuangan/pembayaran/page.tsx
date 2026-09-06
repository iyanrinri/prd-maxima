import { getSession } from '@/lib/auth';
import { prisma } from '@/lib/db';
import { redirect } from 'next/navigation';
import { CreditCard, Search, FileText } from 'lucide-react';
import Link from 'next/link';
import PembayaranHeader from '@/components/finance/PembayaranHeader';

export default async function PembayaranKeuanganPage() {
  const session = await getSession();
  if (!session || session.role !== 'admin') redirect('/');

  const pembayarans = await prisma.pembayaran.findMany({
    include: {
      siswa: true,
      tagihan: true,
    },
    orderBy: { tanggal: 'desc' }
  });

  const siswas = await prisma.siswa.findMany({ select: { id: true, namaLengkap: true, noKontrak: true } });
  const tagihans = await prisma.tagihan.findMany({ select: { id: true, siswaId: true, termin: true, nominalRupiah: true, status: true } });

  const formatRp = (angka: number) => new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(angka);

  return (
    <div className="space-y-6">
      <PembayaranHeader siswas={siswas} tagihans={tagihans} />

      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-gray-200 bg-gray-50 flex justify-between items-center">
          <div className="relative w-64">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-4 w-4 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Cari nama atau referensi..."
              className="block w-full pl-10 pr-3 py-2 border border-gray-200 rounded-lg text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-white text-gray-500 border-b">
              <tr>
                <th className="px-6 py-3 font-medium">Tanggal</th>
                <th className="px-6 py-3 font-medium">Siswa</th>
                <th className="px-6 py-3 font-medium">Keterangan</th>
                <th className="px-6 py-3 font-medium">Metode</th>
                <th className="px-6 py-3 font-medium text-right">Nominal (Rp)</th>
                <th className="px-6 py-3 font-medium text-center">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {pembayarans.map((pembayaran) => (
                <tr key={pembayaran.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-gray-500">
                    {new Date(pembayaran.tanggal).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}
                  </td>
                  <td className="px-6 py-4">
                    <div className="font-medium text-gray-900">{pembayaran.siswa.namaLengkap}</div>
                    {pembayaran.tagihan && (
                      <div className="text-blue-600 text-xs font-medium">Tagihan: {pembayaran.tagihan.termin}</div>
                    )}
                  </td>
                  <td className="px-6 py-4 text-gray-700">{pembayaran.keterangan}</td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                      {pembayaran.metode}
                    </span>
                  </td>
                  <td className="px-6 py-4 font-bold text-green-600 text-right">
                    {formatRp(pembayaran.nominalRupiah)}
                  </td>
                  <td className="px-6 py-4 text-center">
                    <Link
                      href={`/admin/keuangan/pembayaran/${pembayaran.id}/kwitansi`}
                      className="inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-800 transition-colors"
                    >
                      <FileText className="w-4 h-4 mr-1" />
                      Cetak
                    </Link>
                  </td>
                </tr>
              ))}
              {pembayarans.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-6 py-8 text-center text-gray-500">
                    <CreditCard className="w-8 h-8 text-gray-300 mx-auto mb-2" />
                    Belum ada data pembayaran masuk.
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
