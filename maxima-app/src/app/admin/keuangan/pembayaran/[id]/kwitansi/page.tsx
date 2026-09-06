import { getSession } from '@/lib/auth';
import { prisma } from '@/lib/db';
import { redirect } from 'next/navigation';
import { FileText, Printer, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default async function KwitansiPage({ params }: { params: Promise<{ id: string }> }) {
  const session = await getSession();
  if (!session || session.role !== 'admin') redirect('/');

  const resolvedParams = await params;
  const pembayaran = await prisma.pembayaran.findUnique({
    where: { id: resolvedParams.id },
    include: {
      siswa: {
        include: { paket: true }
      },
      tagihan: true,
    }
  });

  if (!pembayaran) {
    return (
      <div className="p-12 text-center text-gray-500">
        Kwitansi tidak ditemukan.
      </div>
    );
  }

  const formatRp = (angka: number) => new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(angka);

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="flex justify-between items-center print:hidden">
        <Link href="/admin/keuangan/pembayaran" className="flex items-center text-gray-500 hover:text-gray-900 transition-colors">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Kembali ke Pembayaran
        </Link>
        <button 
          onClick={() => window.print()}
          className="flex items-center px-4 py-2 bg-slate-900 text-white rounded-lg hover:bg-slate-800 text-sm font-medium transition-colors"
        >
          <Printer className="w-4 h-4 mr-2" />
          Cetak Kwitansi
        </button>
      </div>

      <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-12 print:border-none print:shadow-none print:p-0">
        
        {/* Header Kwitansi */}
        <div className="flex justify-between items-start border-b border-gray-200 pb-8 mb-8">
          <div>
            <h1 className="text-3xl font-extrabold text-blue-900 tracking-tight mb-2">KWITANSI</h1>
            <p className="text-gray-500 text-sm">NO: INV-{pembayaran.id.substring(0, 8).toUpperCase()}</p>
          </div>
          <div className="text-right">
            <h2 className="text-xl font-bold text-gray-900">Maxima Stiftung</h2>
            <p className="text-gray-500 text-sm mt-1 max-w-xs">
              Membangun Jembatan Karir ke Jerman.<br/>
              Jl. Contoh Alamat No 123, Jakarta, Indonesia
            </p>
          </div>
        </div>

        {/* Info Detail */}
        <div className="grid grid-cols-2 gap-12 mb-8">
          <div>
            <p className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-2">Telah Terima Dari:</p>
            <p className="text-lg font-semibold text-gray-900">{pembayaran.siswa.namaLengkap}</p>
            <p className="text-sm text-gray-500">{pembayaran.siswa.noKontrak}</p>
            <p className="text-sm text-gray-500 mt-1">Program: {pembayaran.siswa.paket.nama}</p>
          </div>
          <div className="text-right">
            <p className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-2">Tanggal Pembayaran:</p>
            <p className="text-lg font-medium text-gray-900">
              {new Date(pembayaran.tanggal).toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
          </div>
        </div>

        {/* Tabel Rincian */}
        <table className="w-full text-left mb-8">
          <thead className="bg-gray-50 border-y border-gray-200 text-sm font-medium text-gray-500">
            <tr>
              <th className="py-3 px-4 w-2/3">Keterangan / Untuk Pembayaran</th>
              <th className="py-3 px-4 text-center">Metode</th>
              <th className="py-3 px-4 text-right">Jumlah</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            <tr>
              <td className="py-4 px-4 text-gray-900">
                <div className="font-medium">{pembayaran.keterangan}</div>
                {pembayaran.tagihan && (
                  <div className="text-xs text-gray-500 mt-1">Tagihan Referensi: Termin {pembayaran.tagihan.termin}</div>
                )}
              </td>
              <td className="py-4 px-4 text-center text-gray-700 capitalize">{pembayaran.metode}</td>
              <td className="py-4 px-4 font-bold text-gray-900 text-right">{formatRp(pembayaran.nominalRupiah)}</td>
            </tr>
          </tbody>
        </table>

        {/* Total & Tanda Tangan */}
        <div className="flex justify-between items-end pt-4">
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
            <p className="text-xs text-gray-500 mb-1">Total Nominal</p>
            <p className="text-2xl font-bold text-blue-600">{formatRp(pembayaran.nominalRupiah)}</p>
          </div>
          <div className="text-center px-8">
            <p className="text-sm text-gray-500 mb-12">Penerima (Finance)</p>
            <div className="w-32 border-b border-gray-400 mx-auto mb-1"></div>
            <p className="text-xs text-gray-400">Maxima Stiftung</p>
          </div>
        </div>

      </div>

      <style dangerouslySetInnerHTML={{__html: `
        @media print {
          body * {
            visibility: hidden;
          }
          .max-w-4xl, .max-w-4xl * {
            visibility: visible;
          }
          .max-w-4xl {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
          }
        }
      `}} />
    </div>
  );
}
