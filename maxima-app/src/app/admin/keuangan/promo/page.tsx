import { getSession } from '@/lib/auth';
import { prisma } from '@/lib/db';
import { redirect } from 'next/navigation';
import { Tag, Search } from 'lucide-react';
import PromoHeader from '@/components/finance/PromoHeader';

export default async function PromoKeuanganPage() {
  const session = await getSession();
  if (!session || session.role !== 'admin') redirect('/');

  const promos = await prisma.promoCode.findMany({
    orderBy: { createdAt: 'desc' }
  });

  const formatRp = (angka: number) => new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(angka);
  const formatEu = (angka: number) => new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(angka);

  return (
    <div className="space-y-6">
      <PromoHeader />

      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-gray-200 bg-gray-50 flex justify-between items-center">
          <div className="relative w-64">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-4 w-4 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Cari kode promo..."
              className="block w-full pl-10 pr-3 py-2 border border-gray-200 rounded-lg text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-white text-gray-500 border-b">
              <tr>
                <th className="px-6 py-3 font-medium">Kode Promo</th>
                <th className="px-6 py-3 font-medium">Jenis</th>
                <th className="px-6 py-3 font-medium">Nilai Potongan</th>
                <th className="px-6 py-3 font-medium">Sisa Kuota</th>
                <th className="px-6 py-3 font-medium">Berlaku Hingga</th>
                <th className="px-6 py-3 font-medium text-center">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {promos.map((promo) => {
                const isExpired = promo.berlakuHingga && new Date(promo.berlakuHingga) < new Date();
                const isHabis = promo.kuota !== null && promo.kuota <= 0;
                const status = (isExpired || isHabis) ? 'TIDAK_AKTIF' : 'AKTIF';
                
                return (
                  <tr key={promo.id} className={`hover:bg-gray-50 ${status === 'TIDAK_AKTIF' ? 'opacity-50' : ''}`}>
                    <td className="px-6 py-4">
                      <div className="font-mono font-bold text-gray-900 px-2 py-1 bg-gray-100 rounded inline-block">
                        {promo.kode}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-gray-700 capitalize">
                      {promo.jenis.toLowerCase()}
                    </td>
                    <td className="px-6 py-4 font-medium text-gray-900">
                      {promo.jenis === 'PERSENTASE' ? `${promo.nilaiPersentase}%` : 
                        `${formatRp(promo.nilaiRupiah)}${promo.nilaiEuro > 0 ? ` / ${formatEu(promo.nilaiEuro)}` : ''}`
                      }
                    </td>
                    <td className="px-6 py-4 text-gray-700">
                      {promo.kuota === null ? 'Tidak Terbatas' : promo.kuota}
                    </td>
                    <td className="px-6 py-4 text-gray-700">
                      {promo.berlakuHingga ? new Date(promo.berlakuHingga).toLocaleDateString('id-ID') : 'Selamanya'}
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium 
                        ${status === 'AKTIF' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}
                      `}>
                        {status.replace('_', ' ')}
                      </span>
                    </td>
                  </tr>
                );
              })}
              {promos.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-6 py-8 text-center text-gray-500">
                    <Tag className="w-8 h-8 text-gray-300 mx-auto mb-2" />
                    Belum ada kode promo yang dibuat.
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
