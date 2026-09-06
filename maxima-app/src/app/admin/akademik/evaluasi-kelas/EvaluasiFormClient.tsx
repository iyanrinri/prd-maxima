'use client';

import { useState } from 'react';
import { createEvaluasi } from './actions';

export function EvaluasiFormClient({ kelasAktif }: { kelasAktif: any[] }) {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedKelasId, setSelectedKelasId] = useState('');

  const openFormForKelas = (kelasId?: string) => {
    setSelectedKelasId(kelasId || '');
    setIsOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.currentTarget);
    const res = await createEvaluasi(formData);
    setLoading(false);
    
    if (res?.success) {
      setIsOpen(false);
      setSelectedKelasId('');
    } else {
      alert(res?.error || 'Gagal menyimpan.');
    }
  };

  return (
    <>
      <button 
        onClick={() => openFormForKelas()}
        className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition"
      >
        + Buat Form Evaluasi Baru
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-lg overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
              <h3 className="font-bold text-lg text-gray-900">Form Evaluasi Kelas</h3>
              <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-gray-600 text-xl font-bold">&times;</button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Pilih Kelas</label>
                <select 
                  name="kelasId" 
                  defaultValue={selectedKelasId} 
                  required
                  className="w-full border border-gray-300 rounded-lg px-4 py-2"
                >
                  <option value="" disabled>-- Pilih Kelas --</option>
                  {kelasAktif.map(k => (
                    <option key={k.id} value={k.id}>{k.nama} (Level {k.level} - {k.pengajar.nama})</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Evaluasi Kinerja Pengajar</label>
                <textarea 
                  name="evaluasiPengajar" 
                  required
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 h-24"
                  placeholder="Contoh: Pengajar sangat baik dalam menjelaskan Grammatik, namun kurang interaktif di sesi Sprechen..."
                ></textarea>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Kendala Operasional Kelas</label>
                <textarea 
                  name="kendalaKelas" 
                  required
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 h-24"
                  placeholder="Contoh: AC ruangan kadang kurang dingin, 3 siswa sering terlambat..."
                ></textarea>
              </div>

              <div className="flex justify-end pt-4 border-t border-gray-100">
                <button 
                  type="button" 
                  onClick={() => setIsOpen(false)}
                  className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg font-medium transition mr-2"
                >
                  Batal
                </button>
                <button 
                  type="submit" 
                  disabled={loading}
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg font-medium shadow-sm hover:bg-blue-700 transition disabled:opacity-50"
                >
                  {loading ? 'Menyimpan...' : 'Simpan Evaluasi'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
