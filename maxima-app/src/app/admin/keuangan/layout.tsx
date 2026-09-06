import Link from 'next/link';
import { CreditCard, FileText, LayoutDashboard, Package, Tag } from 'lucide-react';

export default function KeuanganLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="space-y-6">
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8" aria-label="Tabs">
          <Link
            href="/admin/keuangan"
            className="border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 group inline-flex items-center py-4 px-1 border-b-2 font-medium text-sm"
          >
            <LayoutDashboard className="text-gray-400 group-hover:text-gray-500 mr-2 h-5 w-5" />
            Dashboard
          </Link>
          <Link
            href="/admin/keuangan/paket"
            className="border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 group inline-flex items-center py-4 px-1 border-b-2 font-medium text-sm"
          >
            <Package className="text-gray-400 group-hover:text-gray-500 mr-2 h-5 w-5" />
            Paket & Termin
          </Link>
          <Link
            href="/admin/keuangan/tagihan"
            className="border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 group inline-flex items-center py-4 px-1 border-b-2 font-medium text-sm"
          >
            <FileText className="text-gray-400 group-hover:text-gray-500 mr-2 h-5 w-5" />
            Tagihan Siswa
          </Link>
          <Link
            href="/admin/keuangan/pembayaran"
            className="border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 group inline-flex items-center py-4 px-1 border-b-2 font-medium text-sm"
          >
            <CreditCard className="text-gray-400 group-hover:text-gray-500 mr-2 h-5 w-5" />
            Pembayaran
          </Link>
          <Link
            href="/admin/keuangan/promo"
            className="border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 group inline-flex items-center py-4 px-1 border-b-2 font-medium text-sm"
          >
            <Tag className="text-gray-400 group-hover:text-gray-500 mr-2 h-5 w-5" />
            Promo Code
          </Link>
          <Link
            href="/admin/keuangan/arus-kas"
            className="border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 group inline-flex items-center py-4 px-1 border-b-2 font-medium text-sm"
          >
            <CreditCard className="text-gray-400 group-hover:text-gray-500 mr-2 h-5 w-5" />
            Arus Kas
          </Link>
          <Link
            href="/admin/keuangan/laporan"
            className="border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 group inline-flex items-center py-4 px-1 border-b-2 font-medium text-sm"
          >
            <FileText className="text-gray-400 group-hover:text-gray-500 mr-2 h-5 w-5" />
            Laporan
          </Link>
        </nav>
      </div>
      <div>{children}</div>
    </div>
  );
}
