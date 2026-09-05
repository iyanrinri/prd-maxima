import Link from 'next/link';
import { getSession } from '@/lib/auth';
import { redirect } from 'next/navigation';

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSession();
  if (!session) redirect('/');

  const isAdmin = session.role === 'admin';
  const isAkademik = session.role === 'kepala_akademik';

  return (
    <div className="min-h-screen flex bg-gray-50 text-gray-900">
      {/* Sidebar */}
      <aside className="w-64 bg-slate-900 text-white min-h-screen p-4 flex flex-col shadow-xl">
        <div className="mb-8 px-4 mt-4">
          <h1 className="text-xl font-bold tracking-tight">Maxima Portal</h1>
          <p className="text-slate-400 text-xs mt-1">{session.name}</p>
        </div>
        
        <nav className="flex-1 space-y-1">
          {isAdmin && (
            <>
              <Link href="/admin/dashboard" className="block px-4 py-2 rounded-lg hover:bg-slate-800 transition-colors">
                Dashboard Pusat
              </Link>
              <Link href="/admin/keuangan" className="block px-4 py-2 rounded-lg text-slate-300 hover:bg-slate-800 hover:text-white transition-colors">
                Manajemen Keuangan
              </Link>
            </>
          )}

          {(isAdmin || isAkademik) && (
            <div className="pt-4 mt-4 border-t border-slate-700">
              <p className="px-4 text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Akademik</p>
              <Link href="/admin/akademik/dashboard" className="block px-4 py-2 rounded-lg text-slate-300 hover:bg-slate-800 hover:text-white transition-colors">
                Dashboard Akademik
              </Link>
              <Link href="/admin/akademik/monitoring-kelas" className="block px-4 py-2 rounded-lg text-slate-300 hover:bg-slate-800 hover:text-white transition-colors">
                Monitoring Kelas
              </Link>
              <Link href="/admin/akademik/monitoring-pengajar" className="block px-4 py-2 rounded-lg text-slate-300 hover:bg-slate-800 hover:text-white transition-colors">
                Monitoring Pengajar
              </Link>
              <Link href="/admin/akademik/evaluasi-kelas" className="block px-4 py-2 rounded-lg text-slate-300 hover:bg-slate-800 hover:text-white transition-colors">
                Evaluasi Kelas
              </Link>
              <Link href="/admin/akademik/kalender" className="block px-4 py-2 rounded-lg text-slate-300 hover:bg-slate-800 hover:text-white transition-colors">
                Kalender Akademik
              </Link>
              <Link href="/admin/akademik/program" className="block px-4 py-2 rounded-lg text-slate-300 hover:bg-slate-800 hover:text-white transition-colors">
                Program Akademik
              </Link>
            </div>
          )}
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
          <h2 className="text-sm font-medium text-gray-500">Divisi {isAdmin ? 'Manajemen & Keuangan' : 'Akademik'}</h2>
        </header>
        <div className="p-8">
          {children}
        </div>
      </main>
    </div>
  );
}
