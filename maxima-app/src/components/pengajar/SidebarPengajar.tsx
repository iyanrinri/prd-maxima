'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function SidebarPengajar() {
  const pathname = usePathname();

  const menuItems = [
    { name: 'Kelas & Jadwal Hari Ini', href: '/pengajar/dashboard' },
    { name: 'Siswa Saya', href: '/pengajar/siswa' },
    { name: 'Input Nilai (Raport)', href: '/pengajar/raport' },
    { name: 'Absensi', href: '/pengajar/absensi' },
  ];

  return (
    <aside className="w-64 bg-emerald-900 text-white min-h-screen p-4 flex flex-col shadow-xl">
      <div className="mb-8 px-4 mt-4">
        <h1 className="text-xl font-bold tracking-tight text-emerald-300">Maxima Akademik</h1>
        <p className="text-emerald-100/70 text-xs mt-1">Portal Pengajar</p>
      </div>
      
      <nav className="flex-1 space-y-1">
        {menuItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`block px-4 py-2 rounded-lg transition-colors ${
                isActive
                  ? 'bg-emerald-800 text-white font-medium'
                  : 'text-emerald-100 hover:bg-emerald-800 hover:text-white'
              }`}
            >
              {item.name}
            </Link>
          );
        })}
      </nav>

      <div className="pt-4 border-t border-emerald-800">
        <a href="/api/auth/logout" className="block w-full text-left px-4 py-2 rounded-lg text-red-300 hover:bg-red-400/20 transition-colors">
          Keluar
        </a>
      </div>
    </aside>
  );
}
