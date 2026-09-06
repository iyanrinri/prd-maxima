import SidebarPengajar from '@/components/pengajar/SidebarPengajar';
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
      <SidebarPengajar />

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
