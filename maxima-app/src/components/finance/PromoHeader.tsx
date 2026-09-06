'use client';

import { useState } from 'react';
import { Plus } from 'lucide-react';
import PromoModal from './PromoModal';

export default function PromoHeader() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="flex justify-between items-center">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Manajemen Promo Code</h1>
        <p className="text-gray-500 mt-1">Buat dan atur diskon / potongan untuk siswa.</p>
      </div>
      <button 
        onClick={() => setIsModalOpen(true)}
        className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm font-medium transition-colors"
      >
        <Plus className="w-4 h-4 mr-2" />
        Buat Promo Baru
      </button>

      {isModalOpen && (
        <PromoModal onClose={() => setIsModalOpen(false)} />
      )}
    </div>
  );
}
