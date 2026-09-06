import { getSession } from '@/lib/auth';
import { prisma } from '@/lib/db';
import { redirect } from 'next/navigation';
import { ArrowDownRight, ArrowUpRight, Wallet } from 'lucide-react';
import ArusKasHeader from '@/components/finance/ArusKasHeader';

export default async function ArusKasPage() {
  const session = await getSession();
  if (!session || session.role !== 'admin') redirect('/');

  const arusKas = await prisma.arusKas.findMany({
    orderBy: { tanggal: 'desc' }
  });

  const formatRp = (angka: number) => new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(angka);

  const totalIn = arusKas.filter(a => a.tipe === 'CASH_IN').reduce((sum, a) => sum + a.nominal, 0);
  const totalOut = arusKas.filter(a => a.tipe === 'CASH_OUT').reduce((sum, a) => sum + a.nominal, 0);
  const balance = totalIn - totalOut;

  return (
    <div className="space-y-6">
      <ArusKasHeader />

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex items-center">
          <div className="p-4 bg-green-100 rounded-lg text-green-600 mr-4">
            <ArrowUpRight className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Total Pemasukan</p>
            <h3 className="text-2xl font-bold text-gray-900">{formatRp(totalIn)}</h3>
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex items-center">
          <div className="p-4 bg-red-100 rounded-lg text-red-600 mr-4">
            <ArrowDownRight className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Total Pengeluaran</p>
            <h3 className="text-2xl font-bold text-gray-900">{formatRp(totalOut)}</h3>
          </div>
        </div>
        <div className="bg-slate-900 p-6 rounded-xl shadow-sm flex items-center">
          <div className="p-4 bg-slate-800 rounded-lg text-blue-400 mr-4">
            <Wallet className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-400">Saldo Akhir</p>
            <h3 className="text-2xl font-bold text-white">{formatRp(balance)}</h3>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-white text-gray-500 border-b">
              <tr>
                <th className="px-6 py-3 font-medium">Tanggal</th>
                <th className="px-6 py-3 font-medium">Tipe</th>
                <th className="px-6 py-3 font-medium">Kategori</th>
                <th className="px-6 py-3 font-medium">Keterangan</th>
                <th className="px-6 py-3 font-medium text-right">Nominal</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {arusKas.map((trx) => (
                <tr key={trx.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-gray-500">
                    {new Date(trx.tanggal).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}
                  </td>
                  <td className="px-6 py-4">
                    {trx.tipe === 'CASH_IN' ? (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        Masuk
                      </span>
                    ) : (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                        Keluar
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-gray-700 capitalize">{trx.kategori.replace('_', ' ').toLowerCase()}</td>
                  <td className="px-6 py-4 text-gray-900">{trx.keterangan}</td>
                  <td className={`px-6 py-4 font-bold text-right ${trx.tipe === 'CASH_IN' ? 'text-green-600' : 'text-red-600'}`}>
                    {trx.tipe === 'CASH_IN' ? '+' : '-'}{formatRp(trx.nominal)}
                  </td>
                </tr>
              ))}
              {arusKas.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-6 py-8 text-center text-gray-500">
                    Belum ada data transaksi.
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
