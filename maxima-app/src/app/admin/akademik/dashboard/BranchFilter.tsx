'use client';

import { useRouter, useSearchParams } from 'next/navigation';

export function BranchFilter({ initialCabang }: { initialCabang: string }) {
  const router = useRouter();
  
  return (
    <select 
      className="text-sm font-bold text-gray-900 bg-transparent border-none focus:ring-0 cursor-pointer"
      defaultValue={initialCabang}
      onChange={(e) => {
        router.push(`/admin/akademik/dashboard?cabang=${encodeURIComponent(e.target.value)}`);
      }}
    >
      <option value="Semua Cabang">Semua Cabang</option>
      <option value="Pusat">Pusat (Jakarta)</option>
      <option value="Bandung">Cabang Bandung</option>
    </select>
  );
}
