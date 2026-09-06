import { getSession } from '@/lib/auth';
import { prisma } from '@/lib/db';
import { redirect } from 'next/navigation';
import { Package } from 'lucide-react';
import Link from 'next/link';

export default async function PaketKeuanganPage() {
  const session = await getSession();
  if (!session || session.role !== 'admin') redirect('/');

  const pakets = await prisma.paket.findMany({
    orderBy: { nama: 'asc' }
  });

  const formatRp = (angka: number) => new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(angka);
  const formatEu = (angka: number) => new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(angka);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Paket & Termin Pembayaran</h1>
          <p className="text-gray-500 mt-1">Atur minimal pembayaran untuk setiap tahapan program.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {pakets.map((paket) => (
          <div key={paket.id} className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden flex flex-col">
            <div className="px-6 py-4 border-b border-gray-200 bg-gray-50 flex items-center space-x-3">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <Package className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">{paket.nama}</h3>
                <p className="text-xs text-gray-500">Target Level: {paket.targetLevel}</p>
              </div>
            </div>
            
            <div className="p-6 flex-grow">
              <div className="flex justify-between items-end mb-6">
                <div>
                  <p className="text-sm font-medium text-gray-500 mb-1">Total Harga Paket</p>
                  <p className="text-xl font-bold text-gray-900">{formatRp(paket.hargaRupiah)}</p>
                  {paket.hargaEuro > 0 && <p className="text-sm text-gray-500">{formatEu(paket.hargaEuro)}</p>}
                </div>
              </div>

              <div className="space-y-3">
                <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Minimal Pembayaran Tahapan</h4>
                
                <div className="flex justify-between text-sm py-1 border-b border-gray-50">
                  <span className="text-gray-600">A2</span>
                  <span className="font-medium text-gray-900">{formatRp(paket.terminA2)}</span>
                </div>
                <div className="flex justify-between text-sm py-1 border-b border-gray-50">
                  <span className="text-gray-600">B1</span>
                  <span className="font-medium text-gray-900">{formatRp(paket.terminB1)}</span>
                </div>
                <div className="flex justify-between text-sm py-1 border-b border-gray-50">
                  <span className="text-gray-600">B2</span>
                  <span className="font-medium text-gray-900">{formatRp(paket.terminB2)}</span>
                </div>
                <div className="flex justify-between text-sm py-1 border-b border-gray-50">
                  <span className="text-gray-600">Paspor</span>
                  <span className="font-medium text-gray-900">{formatRp(paket.terminPaspor)}</span>
                </div>
                <div className="flex justify-between text-sm py-1 border-b border-gray-50">
                  <span className="text-gray-600">Ujian Bahasa</span>
                  <span className="font-medium text-gray-900">{formatRp(paket.terminUjian)}</span>
                </div>
                <div className="flex justify-between text-sm py-1 border-b border-gray-50">
                  <span className="text-gray-600">Workshop</span>
                  <span className="font-medium text-gray-900">{formatRp(paket.terminWorkshop)}</span>
                </div>
                <div className="flex justify-between text-sm py-1 border-b border-gray-50">
                  <span className="text-gray-600">Cari Perusahaan</span>
                  <span className="font-medium text-gray-900">{formatRp(paket.terminPerusahaan)}</span>
                </div>
                <div className="flex justify-between text-sm py-1">
                  <span className="text-gray-600">Pengajuan Visa</span>
                  <span className="font-medium text-gray-900">{formatRp(paket.terminVisa)}</span>
                </div>
              </div>
            </div>
            
            <div className="p-4 border-t border-gray-100 bg-gray-50">
              <Link 
                href={`/admin/akademik/program`} 
                className="w-full flex justify-center py-2 px-4 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
              >
                Edit Paket
              </Link>
            </div>
          </div>
        ))}

        {pakets.length === 0 && (
          <div className="col-span-full p-12 text-center bg-white rounded-xl border border-gray-200">
            <Package className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900">Belum ada paket program</h3>
            <p className="text-gray-500 mt-1">Silakan tambahkan paket program terlebih dahulu melalui menu Akademik.</p>
          </div>
        )}
      </div>
    </div>
  );
}
