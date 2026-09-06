import Link from 'next/link';

export default function SiswaLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex bg-gray-50 text-gray-900">
      {/* Sidebar Siswa */}
      <aside className="w-64 bg-white border-r border-gray-200 min-h-screen p-4 flex flex-col shadow-sm">
        <div className="mb-8 px-4 mt-4">
          <h1 className="text-xl font-bold tracking-tight text-blue-600">Maxima Portal</h1>
          <p className="text-gray-500 text-xs mt-1">Siswa</p>
        </div>
        
        <nav className="flex-1 space-y-1">
          <Link href="/siswa/dashboard" className="block px-4 py-2 rounded-lg text-gray-600 hover:bg-blue-50 hover:text-blue-700 transition-colors">
            Dashboard
          </Link>
          <Link href="/siswa/profil" className="block px-4 py-2 rounded-lg text-gray-600 hover:bg-blue-50 hover:text-blue-700 transition-colors">
            Profil Saya
          </Link>
          <Link href="/siswa/pembayaran" className="block px-4 py-2 rounded-lg text-gray-600 hover:bg-blue-50 hover:text-blue-700 transition-colors">
            Pembayaran
          </Link>
          <Link href="/siswa/pembelajaran" className="block px-4 py-2 rounded-lg text-gray-600 hover:bg-blue-50 hover:text-blue-700 transition-colors">
            Pembelajaran
          </Link>
          <Link href="/siswa/jadwal" className="block px-4 py-2 rounded-lg text-gray-600 hover:bg-blue-50 hover:text-blue-700 transition-colors">
            Jadwal Saya
          </Link>
          <Link href="/siswa/kehadiran" className="block px-4 py-2 rounded-lg text-gray-600 hover:bg-blue-50 hover:text-blue-700 transition-colors">
            Kehadiran
          </Link>
          <Link href="/siswa/nilai-raport" className="block px-4 py-2 rounded-lg text-gray-600 hover:bg-blue-50 hover:text-blue-700 transition-colors">
            Nilai & Raport
          </Link>
          <Link href="/siswa/sertifikat-bahasa" className="block px-4 py-2 rounded-lg text-gray-600 hover:bg-blue-50 hover:text-blue-700 transition-colors">
            Sertifikat Bahasa
          </Link>
          <Link href="/siswa/progres-layanan" className="block px-4 py-2 rounded-lg text-gray-600 hover:bg-blue-50 hover:text-blue-700 transition-colors">
            Progres Layanan
          </Link>
          <Link href="/siswa/admission-progress" className="block px-4 py-2 rounded-lg text-gray-600 hover:bg-blue-50 hover:text-blue-700 transition-colors">
            Admission Progress
          </Link>
          <Link href="/siswa/latihan-wawancara" className="block px-4 py-2 rounded-lg text-gray-600 hover:bg-blue-50 hover:text-blue-700 transition-colors">
            Latihan Wawancara
          </Link>
          <Link href="/siswa/alumni" className="block px-4 py-2 rounded-lg text-gray-600 hover:bg-blue-50 hover:text-blue-700 transition-colors">
            Alumni
          </Link>
        </nav>

        <div className="pt-4 border-t border-gray-100">
          <a href="/api/auth/logout" className="block w-full text-left px-4 py-2 rounded-lg text-red-600 hover:bg-red-50 transition-colors">
            Keluar
          </a>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        <header className="bg-white border-b border-gray-200 px-8 py-4 flex justify-between items-center">
          <h2 className="text-sm font-medium text-gray-500">Selamat datang, Riska!</h2>
        </header>
        <div className="p-8">
          {children}
        </div>
      </main>
    </div>
  );
}
