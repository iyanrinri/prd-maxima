import { getSession } from '@/lib/auth';
import { prisma } from '@/lib/db';
import { redirect } from 'next/navigation';

export default async function SiswaPembayaranPage() {
  const session = await getSession();
  if (!session) redirect('/');

  const siswa = await prisma.siswa.findFirst({
    include: {
      paket: true,
      tagihans: {
        orderBy: { jatuhTempo: 'asc' }
      },
      pembayarans: {
        orderBy: { tanggal: 'desc' }
      },
    }
  });

  if (!siswa) return <div>Data tidak ditemukan</div>;

  const totalDibayar = siswa.pembayarans.reduce((sum, p) => sum + p.nominalRupiah, 0);
  const diskon = 0; // TODO: Implement diskon from Promo
  const totalHarga = siswa.paket.hargaRupiah - diskon;
  const dp = siswa.tagihans.find(t => t.termin.toLowerCase() === 'dp')?.nominalRupiah || 0;
  const sisa = totalHarga - totalDibayar;
  
  const formatRp = (angka: number) => new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(angka);
  const formatDate = (date: Date) => new Intl.DateTimeFormat('id-ID', { dateStyle: 'long' }).format(date);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Pembayaran</h1>
        <p className="text-gray-500 mt-1">Ringkasan tagihan, jadwal, dan riwayat pembayaran Anda.</p>
      </div>

      {/* Ringkasan Pembayaran */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
        <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
          <h3 className="text-xs font-medium text-gray-500 uppercase tracking-wider">Harga Paket</h3>
          <p className="text-lg font-bold text-gray-900 mt-1">{formatRp(siswa.paket.hargaRupiah)}</p>
        </div>
        <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
          <h3 className="text-xs font-medium text-gray-500 uppercase tracking-wider">Diskon</h3>
          <p className="text-lg font-bold text-green-600 mt-1">-{formatRp(diskon)}</p>
        </div>
        <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
          <h3 className="text-xs font-medium text-gray-500 uppercase tracking-wider">Total Biaya</h3>
          <p className="text-lg font-bold text-gray-900 mt-1">{formatRp(totalHarga)}</p>
        </div>
        <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
          <h3 className="text-xs font-medium text-gray-500 uppercase tracking-wider">DP (Uang Muka)</h3>
          <p className="text-lg font-bold text-gray-900 mt-1">{formatRp(dp)}</p>
        </div>
        <div className="bg-white p-4 rounded-xl border border-blue-200 shadow-sm bg-blue-50">
          <h3 className="text-xs font-medium text-blue-800 uppercase tracking-wider">Sudah Dibayar</h3>
          <p className="text-lg font-bold text-blue-700 mt-1">{formatRp(totalDibayar)}</p>
        </div>
        <div className="bg-white p-4 rounded-xl border border-red-200 shadow-sm bg-red-50">
          <h3 className="text-xs font-medium text-red-800 uppercase tracking-wider">Sisa Pembayaran</h3>
          <p className="text-lg font-bold text-red-700 mt-1">{formatRp(sisa > 0 ? sisa : 0)}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Kolom Kiri: Jadwal Tagihan & Gateway */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* Jadwal Tagihan */}
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200 bg-gray-50 flex justify-between items-center">
              <h3 className="font-semibold text-gray-900">Jadwal Pembayaran (Tagihan)</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="bg-white text-gray-500 border-b">
                  <tr>
                    <th className="px-6 py-3 font-medium">Pembayaran</th>
                    <th className="px-6 py-3 font-medium">Jatuh Tempo</th>
                    <th className="px-6 py-3 font-medium">Nominal</th>
                    <th className="px-6 py-3 font-medium">Status</th>
                    <th className="px-6 py-3 font-medium">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {siswa.tagihans.map((tagihan) => (
                    <tr key={tagihan.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 text-gray-900 font-medium">{tagihan.termin}</td>
                      <td className="px-6 py-4 text-gray-600">{formatDate(tagihan.jatuhTempo)}</td>
                      <td className="px-6 py-4 text-gray-900">{formatRp(tagihan.nominalRupiah)}</td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${tagihan.status === 'LUNAS' ? 'bg-green-100 text-green-800' : tagihan.status === 'BELUM_BAYAR' ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'}`}>
                          {tagihan.status.replace('_', ' ')}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        {tagihan.status !== 'LUNAS' && (
                          <button className="text-xs bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded-md transition-colors">Bayar</button>
                        )}
                      </td>
                    </tr>
                  ))}
                  {siswa.tagihans.length === 0 && (
                    <tr>
                      <td colSpan={5} className="px-6 py-8 text-center text-gray-500">Belum ada jadwal tagihan.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Payment Gateway Info */}
          <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-xl shadow-lg p-6 text-white">
            <h3 className="font-bold text-lg mb-2">Simulasi Payment Gateway (Xendit / Midtrans)</h3>
            <p className="text-blue-100 text-sm mb-4">
              Pilih metode pembayaran (VA, Qris, Transfer), lakukan pembayaran, sistem Maxima otomatis memvalidasi, dan invoice akan terbit seketika.
            </p>
            <div className="flex flex-wrap gap-3">
              <span className="px-3 py-1.5 bg-white/20 rounded text-sm backdrop-blur-sm">Jenis: VA BCA</span>
              <span className="px-3 py-1.5 bg-white/20 rounded text-sm backdrop-blur-sm">Status: Menunggu</span>
            </div>
          </div>
          
        </div>

        {/* Kolom Kanan: Riwayat Pembayaran */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden h-full flex flex-col">
            <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
              <h3 className="font-semibold text-gray-900">Riwayat Pembayaran</h3>
            </div>
            <div className="p-0 flex-1 overflow-y-auto">
              <ul className="divide-y divide-gray-100">
                {siswa.pembayarans.map((pembayaran) => (
                  <li key={pembayaran.id} className="p-6 hover:bg-gray-50 transition-colors">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <p className="font-medium text-gray-900">{pembayaran.keterangan}</p>
                        <p className="text-xs text-gray-500 mt-0.5">{formatDate(pembayaran.tanggal)}</p>
                      </div>
                      <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800">
                        {pembayaran.status}
                      </span>
                    </div>
                    <div className="flex justify-between items-end mt-4">
                      <div>
                        <p className="text-xs text-gray-500">Metode: {pembayaran.metode}</p>
                        <p className="font-bold text-gray-900 mt-1">{formatRp(pembayaran.nominalRupiah)}</p>
                      </div>
                      <button className="text-xs text-blue-600 hover:text-blue-800 flex items-center font-medium">
                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path></svg>
                        Invoice
                      </button>
                    </div>
                  </li>
                ))}
                {siswa.pembayarans.length === 0 && (
                  <li className="p-6 text-center text-gray-500">Belum ada riwayat transaksi.</li>
                )}
              </ul>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
