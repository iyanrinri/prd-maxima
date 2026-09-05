import { getSession } from '@/lib/auth';
import { prisma } from '@/lib/db';
import { redirect } from 'next/navigation';

export default async function AdminKeuanganPage() {
  const session = await getSession();
  if (!session || session.role !== 'admin') redirect('/');

  // Ambil semua siswa beserta paket dan histori pembayaran mereka
  const siswas = await prisma.siswa.findMany({
    include: {
      paket: true,
      pembayarans: true,
    },
    orderBy: { createdAt: 'desc' }
  });

  const formatRp = (angka: number) => new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(angka);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Manajemen Keuangan</h1>
        <p className="text-gray-500 mt-1">Pantau status pembayaran siswa dan tagihan aktif.</p>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200 bg-gray-50 flex justify-between items-center">
          <h3 className="font-semibold text-gray-900">Daftar Piutang Siswa</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-white text-gray-500 border-b">
              <tr>
                <th className="px-6 py-3 font-medium">Siswa</th>
                <th className="px-6 py-3 font-medium">Paket</th>
                <th className="px-6 py-3 font-medium text-right">Harga Paket (Rp)</th>
                <th className="px-6 py-3 font-medium text-right">Telah Dibayar (Rp)</th>
                <th className="px-6 py-3 font-medium text-right">Kekurangan (Rp)</th>
                <th className="px-6 py-3 font-medium text-center">Status Lunas</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {siswas.map((siswa) => {
                const totalDibayar = siswa.pembayarans.reduce((sum, p) => sum + p.nominalRupiah, 0);
                const kekurangan = siswa.paket.hargaRupiah - totalDibayar;
                const isLunas = kekurangan <= 0;

                return (
                  <tr key={siswa.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="font-medium text-gray-900">{siswa.namaLengkap}</div>
                      <div className="text-gray-500 text-xs">{siswa.noKontrak}</div>
                    </td>
                    <td className="px-6 py-4 text-gray-600">{siswa.paket.nama}</td>
                    <td className="px-6 py-4 text-gray-900 text-right">{formatRp(siswa.paket.hargaRupiah)}</td>
                    <td className="px-6 py-4 text-green-600 font-medium text-right">{formatRp(totalDibayar)}</td>
                    <td className={`px-6 py-4 font-medium text-right ${kekurangan > 0 ? 'text-red-600' : 'text-gray-400'}`}>
                      {formatRp(kekurangan > 0 ? kekurangan : 0)}
                    </td>
                    <td className="px-6 py-4 text-center">
                      {isLunas ? (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          Lunas
                        </span>
                      ) : (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-100 text-amber-800">
                          Belum Lunas
                        </span>
                      )}
                    </td>
                  </tr>
                );
              })}
              {siswas.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-6 py-8 text-center text-gray-500">Tidak ada data siswa.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
