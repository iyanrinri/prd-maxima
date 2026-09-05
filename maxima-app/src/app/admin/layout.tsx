import Link from 'next/link';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex bg-gray-50 text-gray-900">
      {/* Sidebar */}
      <aside className="w-64 bg-slate-900 text-white min-h-screen p-4 flex flex-col shadow-xl">
        <div className="mb-8 px-4 mt-4">
          <h1 className="text-xl font-bold tracking-tight">Maxima Admin</h1>
          <p className="text-slate-400 text-xs mt-1">Super Admin / Manajer</p>
        </div>
        
        <nav className="flex-1 space-y-1">
          <Link href="/admin/dashboard" className="block px-4 py-2 rounded-lg bg-blue-600 text-white">
            Dashboard
          </Link>
          <Link href="#" className="block px-4 py-2 rounded-lg text-slate-300 hover:bg-slate-800 hover:text-white transition-colors">
            Data Siswa
          </Link>
          <Link href="/admin/keuangan" className="block px-4 py-2 rounded-lg text-slate-300 hover:bg-slate-800 hover:text-white transition-colors">
            Manajemen Keuangan
          </Link>
          <Link href="#" className="block px-4 py-2 rounded-lg text-slate-300 hover:bg-slate-800 hover:text-white transition-colors">
            Layanan & Partner
          </Link>
        </nav>

        <div className="pt-4 border-t border-slate-700">
          <a href="/api/auth/logout" className="block w-full text-left px-4 py-2 rounded-lg text-red-400 hover:bg-red-400/10 transition-colors">
            Keluar
          </a>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        <header className="bg-white border-b border-gray-200 px-8 py-4">
          <h2 className="text-sm font-medium text-gray-500">Admin Portal</h2>
        </header>
        <div className="p-8">
          {children}
        </div>
      </main>
    </div>
  );
}
