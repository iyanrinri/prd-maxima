import Link from 'next/link';
import { getSession } from '@/lib/auth';
import { redirect } from 'next/navigation';

export default async function PengajarLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSession();
  if (!session || session.role !== 'pengajar') redirect('/');

  return (
    <div className="min-h-screen flex bg-slate-50 text-slate-900">
      {/* Sidebar Pengajar */}
      <aside className="w-64 bg-emerald-900 text-white min-h-screen p-4 flex flex-col shadow-xl">
        <div className="mb-8 px-4 mt-4">
          <h1 className="text-xl font-bold tracking-tight text-emerald-300">Maxima Akademik</h1>
          <p className="text-emerald-100/70 text-xs mt-1">Portal Pengajar</p>
        </div>
        
        <nav className="flex-1 space-y-1">
          <Link href="/pengajar/dashboard" className="block px-4 py-2 rounded-lg bg-emerald-800 text-white font-medium">
            Kelas & Jadwal Hari Ini
          </Link>
          <Link href="#" className="block px-4 py-2 rounded-lg text-emerald-100 hover:bg-emerald-800 hover:text-white transition-colors">
            Siswa Saya
          </Link>
          <Link href="#" className="block px-4 py-2 rounded-lg text-emerald-100 hover:bg-emerald-800 hover:text-white transition-colors">
            Input Nilai (Raport)
          </Link>
          <Link href="#" className="block px-4 py-2 rounded-lg text-emerald-100 hover:bg-emerald-800 hover:text-white transition-colors">
            Absensi
          </Link>
        </nav>

        <div className="pt-4 border-t border-emerald-800">
          <a href="/api/auth/logout" className="block w-full text-left px-4 py-2 rounded-lg text-red-300 hover:bg-red-400/20 transition-colors">
            Keluar
          </a>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        <header className="bg-white border-b border-slate-200 px-8 py-4 flex justify-between items-center">
          <h2 className="text-sm font-medium text-slate-500">Guten Tag, {session.name}!</h2>
        </header>
        <div className="p-8">
          {children}
        </div>
      </main>
    </div>
  );
}
