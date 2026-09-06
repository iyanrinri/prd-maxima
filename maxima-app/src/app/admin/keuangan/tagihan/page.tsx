import { getSession } from '@/lib/auth';
import { prisma } from '@/lib/db';
import { redirect } from 'next/navigation';
import { FileText, Search } from 'lucide-react';
import TagihanHeader from '@/components/finance/TagihanHeader';

export default async function TagihanKeuanganPage() {
  const session = await getSession();
  if (!session || session.role !== 'admin') redirect('/');

  const tagihans = await prisma.tagihan.findMany({
    include: {
      siswa: true,
      pembayarans: true
    },
    orderBy: { createdAt: 'desc' }
  });

  const siswas = await prisma.siswa.findMany({
    select: { id: true, namaLengkap: true, noKontrak: true }
  });

  const formatRp = (angka: number) => new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(angka);

  return (
    <div className="space-y-6">
      <TagihanHeader siswas={siswas} />

      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-gray-200 bg-gray-50 flex justify-between items-center">
          <div className="relative w-64">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-4 w-4 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Cari siswa atau invoice..."
              className="block w-full pl-10 pr-3 py-2 border border-gray-200 rounded-lg text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-white text-gray-500 border-b">
              <tr>
                <th className="px-6 py-3 font-medium">Siswa</th>
                <th className="px-6 py-3 font-medium">Termin</th>
                <th className="px-6 py-3 font-medium text-right">Total Tagihan</th>
                <th className="px-6 py-3 font-medium text-right">Sudah Dibayar</th>
                <th className="px-6 py-3 font-medium">Jatuh Tempo</th>
                <th className="px-6 py-3 font-medium text-center">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {tagihans.map((tagihan) => {
                const totalDibayar = tagihan.pembayarans.reduce((sum, p) => sum + p.nominalRupiah, 0);
                
                return (
                  <tr key={tagihan.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="font-medium text-gray-900">{tagihan.siswa.namaLengkap}</div>
                      <div className="text-gray-500 text-xs">{tagihan.siswa.noKontrak}</div>
                    </td>
                    <td className="px-6 py-4 text-gray-900">
                      <div className="flex items-center">
                        <FileText className="w-4 h-4 mr-2 text-gray-400" />
                        {tagihan.termin}
                      </div>
                    </td>
                    <td className="px-6 py-4 font-bold text-gray-900 text-right">{formatRp(tagihan.nominalRupiah)}</td>
                    <td className="px-6 py-4 text-green-600 font-medium text-right">{formatRp(totalDibayar)}</td>
                    <td className="px-6 py-4 text-gray-500">
                      {new Date(tagihan.jatuhTempo).toLocaleDateString('id-ID')}
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium 
                        ${tagihan.status === 'LUNAS' ? 'bg-green-100 text-green-800' : ''}
                        ${tagihan.status === 'BELUM_BAYAR' ? 'bg-gray-100 text-gray-800' : ''}
                        ${tagihan.status === 'SEBAGIAN' ? 'bg-amber-100 text-amber-800' : ''}
                        ${tagihan.status === 'OVERDUE' ? 'bg-red-100 text-red-800' : ''}
                      `}>
                        {tagihan.status.replace('_', ' ')}
                      </span>
                    </td>
                  </tr>
                );
              })}
              {tagihans.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-6 py-8 text-center text-gray-500">
                    Belum ada invoice/tagihan yang diterbitkan.
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
