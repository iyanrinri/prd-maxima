'use client';

import { useState } from 'react';
import { updateTahapanAdmission } from '../../actions';
import { Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function TahapanAdmissionSelector({ siswaId, currentTahapan }: { siswaId: string, currentTahapan: string | null }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [tahapan, setTahapan] = useState(currentTahapan || 'Belum Diproses');

  const tahapanOptions = [
    'Belum Diproses',
    'Sedang Diproses',
    'Sudah Interview',
    'Sudah Dapat Vertrag',
    'Sedang Proses Visa',
    'Visa Granted',
    'Sudah Berangkat',
    'Alumni'
  ];

  const handleChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newVal = e.target.value;
    setTahapan(newVal);
    setLoading(true);
    try {
      await updateTahapanAdmission(siswaId, newVal);
      router.refresh();
    } catch (err) {
      alert('Gagal mengupdate tahapan admission');
      setTahapan(currentTahapan || 'Belum Diproses'); // rollback
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center space-x-3">
      <span className="text-sm font-medium text-gray-500">Status Admission:</span>
      <div className="relative">
        <select 
          value={tahapan}
          onChange={handleChange}
          disabled={loading}
          className="appearance-none pl-4 pr-10 py-2 bg-white border border-gray-300 rounded-lg text-sm font-semibold text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer disabled:opacity-50"
        >
          {tahapanOptions.map(opt => (
            <option key={opt} value={opt}>{opt}</option>
          ))}
        </select>
        {loading && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
            <Loader2 className="h-4 w-4 animate-spin text-gray-400" />
          </div>
        )}
      </div>
    </div>
  );
}
