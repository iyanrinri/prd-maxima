'use client';

import { useState } from 'react';
import { toggleLayananSiswa } from '../../actions';
import { Loader2, CheckCircle, XCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';

const DAFTAR_LAYANAN = [
  'Pembuatan Paspor',
  'Terjemah Dokumen',
  'Apostille Dokumen',
  'Ujian Bahasa',
  'Workshop',
  'Pencarian Perusahaan',
  'Pengajuan Visa'
];

export default function LayananFinanceForm({ siswaId, layanan = [] }: { siswaId: string, layanan: any[] }) {
  const router = useRouter();
  const [updating, setUpdating] = useState<string | null>(null);

  const handleToggle = async (jenis: string, currentStatus: string) => {
    const nextStatus = currentStatus === 'Bisa diproses' ? 'Belum Bisa diproses' : 'Bisa diproses';
    setUpdating(jenis);
    try {
      await toggleLayananSiswa(siswaId, jenis, nextStatus);
      router.refresh();
    } catch (err) {
      alert('Gagal mengupdate status layanan');
    } finally {
      setUpdating(null);
    }
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
      <h3 className="font-semibold text-gray-900 mb-2">Layanan (Diambil dari Finance)</h3>
      <p className="text-sm text-gray-500 mb-6">Tandai layanan mana yang sudah bisa diproses oleh pihak admission berdasarkan konfirmasi pembayaran dari finance.</p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {DAFTAR_LAYANAN.map((jenis) => {
          const item = layanan.find((l: any) => l.jenisLayanan === jenis);
          const status = item ? item.status : 'Belum Bisa diproses';
          const isBisa = status === 'Bisa diproses';
          const isUpdating = updating === jenis;

          return (
            <div key={jenis} className={`border rounded-lg p-4 flex items-center justify-between transition-colors ${isBisa ? 'border-green-200 bg-green-50/30' : 'border-gray-200 bg-gray-50'}`}>
              <div className="flex flex-col">
                <span className="font-medium text-sm text-gray-800">{jenis}</span>
                <span className={`text-xs mt-1 ${isBisa ? 'text-green-600' : 'text-gray-500'}`}>
                  {status}
                </span>
              </div>
              
              <button 
                onClick={() => handleToggle(jenis, status)}
                disabled={isUpdating}
                className={`p-2 rounded-full focus:outline-none transition ${isBisa ? 'text-green-500 hover:bg-green-100' : 'text-gray-400 hover:bg-gray-200'}`}
              >
                {isUpdating ? (
                  <Loader2 className="h-6 w-6 animate-spin" />
                ) : isBisa ? (
                  <CheckCircle className="h-6 w-6" />
                ) : (
                  <XCircle className="h-6 w-6" />
                )}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
