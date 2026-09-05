'use client';

import { useState } from 'react';
import { createProgram, updateProgram, deleteProgram } from './actions';

export default function ProgramList({ initialPrograms }: { initialPrograms: any[] }) {
  const [programs, setPrograms] = useState(initialPrograms);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProgram, setEditingProgram] = useState<any>(null);

  const openCreateModal = () => {
    setEditingProgram(null);
    setIsModalOpen(true);
  };

  const openEditModal = (p: any) => {
    setEditingProgram(p);
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (confirm('Yakin ingin menghapus program ini? Semua siswa yang terdaftar di program ini bisa kehilangan referensi data.')) {
      await deleteProgram(id);
      setPrograms(programs.filter(p => p.id !== id));
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    if (editingProgram) {
      await updateProgram(editingProgram.id, formData);
    } else {
      await createProgram(formData);
    }
    
    // Refresh page to get latest data from server
    window.location.reload();
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Program Akademik</h1>
          <p className="text-gray-500 mt-1">Kelola target level, harga program, dan ambang batas (gatekeeper).</p>
        </div>
        <button 
          onClick={openCreateModal}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition"
        >
          + Tambah Program
        </button>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {programs.map(p => (
          <div key={p.id} className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden flex flex-col md:flex-row">
            <div className="bg-slate-50 p-6 md:w-1/3 border-b md:border-b-0 md:border-r border-gray-200 flex flex-col justify-center">
              <span className="inline-block px-3 py-1 bg-blue-100 text-blue-800 text-xs font-bold rounded-full w-max mb-2">
                Target Level: {p.targetLevel}
              </span>
              <h3 className="text-xl font-bold text-gray-900">{p.nama}</h3>
              <p className="text-gray-500 text-sm mt-2 line-clamp-2">
                {p.deskripsi || 'Program persiapan bahasa intensif untuk target sertifikasi bahasa Jerman.'}
              </p>
              <div className="mt-4 pt-4 border-t border-gray-200">
                <p className="text-sm text-gray-500">Total Siswa Aktif</p>
                <p className="text-2xl font-bold text-gray-900">{p.siswas?.length || 0} Siswa</p>
              </div>
            </div>
            
            <div className="p-6 md:w-2/3 flex flex-col justify-between">
              <div>
                <h4 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-4">Pengaturan Harga & Gatekeeper</h4>
                <div className="grid grid-cols-2 gap-y-4 gap-x-8">
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Total Harga (IDR)</p>
                    <p className="font-semibold text-gray-900">Rp {p.hargaRupiah.toLocaleString('id-ID')}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Total Harga (EUR)</p>
                    <p className="font-semibold text-gray-900">€ {p.hargaEuro.toLocaleString('id-ID')}</p>
                  </div>
                  
                  <div className="col-span-2 pt-2 pb-1">
                    <p className="text-xs font-bold text-gray-400 uppercase">Ambang Batas Gatekeeper (Minimal Pembayaran)</p>
                  </div>
                  
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Syarat Buka Paspor</p>
                    <p className="font-medium text-gray-800">{p.ambangPaspor ? `Rp ${p.ambangPaspor.toLocaleString('id-ID')}` : '-'}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Syarat Ikut Ujian B1/B2</p>
                    <p className="font-medium text-gray-800">{p.ambangUjian ? `Rp ${p.ambangUjian.toLocaleString('id-ID')}` : '-'}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Syarat Pemberkasan</p>
                    <p className="font-medium text-gray-800">{p.ambangPemberkasan ? `Rp ${p.ambangPemberkasan.toLocaleString('id-ID')}` : '-'}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Syarat TTD Kontrak</p>
                    <p className="font-medium text-gray-800">{p.ambangKontrak ? `Rp ${p.ambangKontrak.toLocaleString('id-ID')}` : '-'}</p>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-end mt-6 pt-4 border-t border-gray-100 space-x-3">
                <button 
                  onClick={() => openEditModal(p)}
                  className="px-4 py-2 bg-gray-900 text-white rounded-lg text-sm font-medium hover:bg-gray-800 transition shadow-sm"
                >
                  Edit Program
                </button>
                <button 
                  onClick={() => handleDelete(p.id)}
                  className="px-4 py-2 bg-red-100 text-red-700 rounded-lg text-sm font-medium hover:bg-red-200 transition shadow-sm"
                >
                  Hapus
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 overflow-y-auto">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl mt-20 md:mt-0">
            <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
              <h2 className="text-xl font-bold text-gray-900">
                {editingProgram ? 'Edit Program Akademik' : 'Tambah Program Baru'}
              </h2>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-500 hover:text-gray-700 font-bold text-xl">&times;</button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2 md:col-span-1">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Nama Program</label>
                  <input type="text" name="nama" defaultValue={editingProgram?.nama} required className="w-full border border-gray-300 rounded-lg px-4 py-2" placeholder="Contoh: FSJ 2027" />
                </div>
                <div className="col-span-2 md:col-span-1">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Target Level</label>
                  <select name="targetLevel" defaultValue={editingProgram?.targetLevel || 'B1'} className="w-full border border-gray-300 rounded-lg px-4 py-2">
                    <option value="A2">A2</option>
                    <option value="B1">B1</option>
                    <option value="B2">B2</option>
                  </select>
                </div>
                
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Deskripsi Singkat</label>
                  <textarea name="deskripsi" defaultValue={editingProgram?.deskripsi || ''} className="w-full border border-gray-300 rounded-lg px-4 py-2 h-20" placeholder="Opsional..."></textarea>
                </div>

                <div className="col-span-2 md:col-span-1">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Harga (IDR)</label>
                  <input type="number" name="hargaRupiah" defaultValue={editingProgram?.hargaRupiah} required className="w-full border border-gray-300 rounded-lg px-4 py-2" />
                </div>
                <div className="col-span-2 md:col-span-1">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Harga (EUR)</label>
                  <input type="number" name="hargaEuro" defaultValue={editingProgram?.hargaEuro || 0} required className="w-full border border-gray-300 rounded-lg px-4 py-2" />
                </div>

                <div className="col-span-2 mt-2 pt-2 border-t">
                  <h4 className="text-sm font-bold text-gray-900 mb-2">Ambang Batas (Gatekeeper)</h4>
                </div>

                <div className="col-span-2 md:col-span-1">
                  <label className="block text-xs font-medium text-gray-700 mb-1">Buka Paspor (IDR)</label>
                  <input type="number" name="ambangPaspor" defaultValue={editingProgram?.ambangPaspor} className="w-full border border-gray-300 rounded-lg px-4 py-1.5" />
                </div>
                <div className="col-span-2 md:col-span-1">
                  <label className="block text-xs font-medium text-gray-700 mb-1">Ikut Ujian Sertifikasi (IDR)</label>
                  <input type="number" name="ambangUjian" defaultValue={editingProgram?.ambangUjian} className="w-full border border-gray-300 rounded-lg px-4 py-1.5" />
                </div>
                <div className="col-span-2 md:col-span-1">
                  <label className="block text-xs font-medium text-gray-700 mb-1">Pemberkasan (IDR)</label>
                  <input type="number" name="ambangPemberkasan" defaultValue={editingProgram?.ambangPemberkasan} className="w-full border border-gray-300 rounded-lg px-4 py-1.5" />
                </div>
                <div className="col-span-2 md:col-span-1">
                  <label className="block text-xs font-medium text-gray-700 mb-1">TTD Kontrak (IDR)</label>
                  <input type="number" name="ambangKontrak" defaultValue={editingProgram?.ambangKontrak} className="w-full border border-gray-300 rounded-lg px-4 py-1.5" />
                </div>
              </div>
              
              <div className="flex justify-end space-x-3 pt-4 border-t mt-6">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-5 py-2.5 rounded-lg font-medium text-gray-700 hover:bg-gray-100">
                  Batal
                </button>
                <button type="submit" className="px-5 py-2.5 rounded-lg font-medium bg-blue-600 text-white hover:bg-blue-700">
                  {editingProgram ? 'Simpan Perubahan' : 'Buat Program'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
