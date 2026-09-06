'use client';

import { useState } from 'react';
import { addProgresBahasa, deleteProgresBahasa, addRekomendasiUjian, deleteRekomendasiUjian, updateRekomendasiUjianStatus } from '../../actions';
import { Trash2, Plus, Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function BahasaDanRekomendasiForm({ 
  siswaId, 
  progres = [], 
  rekomendasi = [] 
}: { 
  siswaId: string, 
  progres: any[], 
  rekomendasi: any[] 
}) {
  const router = useRouter();
  
  const [addingProgres, setAddingProgres] = useState(false);
  const [loadingProgres, setLoadingProgres] = useState(false);
  const [progresForm, setProgresForm] = useState({ level: 'A1', statusLulus: false, sedangBelajar: true });

  const [addingRekom, setAddingRekom] = useState(false);
  const [loadingRekom, setLoadingRekom] = useState(false);
  const [rekomForm, setRekomForm] = useState({ namaUjian: 'Goethe Zertifikat B1', status: 'Belum' });

  // -- Progres Bahasa --
  const submitProgres = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoadingProgres(true);
    try {
      await addProgresBahasa({ siswaId, ...progresForm });
      setAddingProgres(false);
      setProgresForm({ level: 'A1', statusLulus: false, sedangBelajar: true });
      router.refresh();
    } catch {
      alert('Gagal menambah progres bahasa');
    } finally {
      setLoadingProgres(false);
    }
  };

  const hapusProgres = async (id: string) => {
    if (!confirm('Hapus progres bahasa?')) return;
    try {
      await deleteProgresBahasa(id, siswaId);
      router.refresh();
    } catch {
      alert('Gagal');
    }
  };

  // -- Rekomendasi Ujian --
  const submitRekom = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoadingRekom(true);
    try {
      await addRekomendasiUjian({ siswaId, ...rekomForm });
      setAddingRekom(false);
      setRekomForm({ namaUjian: 'Goethe Zertifikat B1', status: 'Belum' });
      router.refresh();
    } catch {
      alert('Gagal menambah rekomendasi');
    } finally {
      setLoadingRekom(false);
    }
  };

  const updateRekomStatus = async (id: string, status: string) => {
    try {
      await updateRekomendasiUjianStatus(id, status, siswaId);
      router.refresh();
    } catch {
      alert('Gagal update status');
    }
  };

  const hapusRekom = async (id: string) => {
    if (!confirm('Hapus rekomendasi ujian?')) return;
    try {
      await deleteRekomendasiUjian(id, siswaId);
      router.refresh();
    } catch {
      alert('Gagal');
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
      
      {/* 1. Progres Bahasa */}
      <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-semibold text-gray-900">Progres Belajar Bahasa</h3>
          {!addingProgres && (
            <button onClick={() => setAddingProgres(true)} className="text-sm text-blue-600 hover:text-blue-700 flex items-center font-medium">
              <Plus className="h-4 w-4 mr-1" /> Tambah
            </button>
          )}
        </div>

        {addingProgres && (
          <form onSubmit={submitProgres} className="mb-4 bg-gray-50 p-3 rounded-lg border border-gray-200 text-sm">
            <div className="grid grid-cols-2 gap-3 mb-3">
              <div>
                <label className="block text-xs text-gray-600 mb-1">Level</label>
                <select value={progresForm.level} onChange={e => setProgresForm({...progresForm, level: e.target.value})} className="w-full border-gray-300 rounded text-xs py-1.5">
                  <option>A1</option><option>A2</option><option>B1</option><option>B2</option>
                </select>
              </div>
            </div>
            <div className="flex space-x-4 mb-3">
              <label className="flex items-center space-x-2 text-xs">
                <input type="checkbox" checked={progresForm.statusLulus} onChange={e => setProgresForm({...progresForm, statusLulus: e.target.checked})} className="rounded text-blue-600" />
                <span>Status Lulus</span>
              </label>
              <label className="flex items-center space-x-2 text-xs">
                <input type="checkbox" checked={progresForm.sedangBelajar} onChange={e => setProgresForm({...progresForm, sedangBelajar: e.target.checked})} className="rounded text-blue-600" />
                <span>Sedang Belajar</span>
              </label>
            </div>
            <div className="flex justify-end space-x-2">
              <button type="button" onClick={() => setAddingProgres(false)} className="text-gray-500 hover:text-gray-700 text-xs px-2 py-1">Batal</button>
              <button type="submit" disabled={loadingProgres} className="bg-blue-600 text-white rounded text-xs px-3 py-1 flex items-center">
                {loadingProgres && <Loader2 className="h-3 w-3 mr-1 animate-spin" />} Simpan
              </button>
            </div>
          </form>
        )}

        <div className="space-y-2">
          {progres.map(p => (
            <div key={p.id} className="flex items-center justify-between p-3 bg-gray-50 border border-gray-100 rounded-lg">
              <div className="flex items-center space-x-3">
                <span className="font-bold text-gray-800 text-lg w-8">{p.level}</span>
                <div className="flex flex-col">
                  <span className={`text-xs font-semibold ${p.statusLulus ? 'text-green-600' : 'text-gray-400'}`}>{p.statusLulus ? '✓ Sudah Lulus' : 'Belum Lulus'}</span>
                  <span className={`text-xs ${p.sedangBelajar ? 'text-blue-600' : 'text-gray-400'}`}>{p.sedangBelajar ? 'Sedang dipelajari' : '-'}</span>
                </div>
              </div>
              <button onClick={() => hapusProgres(p.id)} className="text-gray-400 hover:text-red-500"><Trash2 className="h-4 w-4" /></button>
            </div>
          ))}
          {progres.length === 0 && !addingProgres && <div className="text-center text-xs text-gray-500 py-4">Belum ada progres tercatat</div>}
        </div>
      </div>

      {/* 2. Rekomendasi Ujian */}
      <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-semibold text-gray-900">Rekomendasi Ujian (Akademik)</h3>
          {!addingRekom && (
            <button onClick={() => setAddingRekom(true)} className="text-sm text-blue-600 hover:text-blue-700 flex items-center font-medium">
              <Plus className="h-4 w-4 mr-1" /> Tambah
            </button>
          )}
        </div>

        {addingRekom && (
          <form onSubmit={submitRekom} className="mb-4 bg-gray-50 p-3 rounded-lg border border-gray-200 text-sm">
            <div className="mb-3">
              <label className="block text-xs text-gray-600 mb-1">Nama Ujian</label>
              <input type="text" value={rekomForm.namaUjian} onChange={e => setRekomForm({...rekomForm, namaUjian: e.target.value})} className="w-full border-gray-300 rounded text-xs py-1.5 px-2 border" placeholder="Cth: Goethe Zertifikat B1" required />
            </div>
            <div className="mb-3">
              <label className="block text-xs text-gray-600 mb-1">Status</label>
              <select value={rekomForm.status} onChange={e => setRekomForm({...rekomForm, status: e.target.value})} className="w-full border-gray-300 rounded text-xs py-1.5 px-2 border">
                <option>Belum</option>
                <option>Direkomendasikan</option>
                <option>Tidak Direkomendasikan</option>
                <option>Lulus</option>
              </select>
            </div>
            <div className="flex justify-end space-x-2">
              <button type="button" onClick={() => setAddingRekom(false)} className="text-gray-500 hover:text-gray-700 text-xs px-2 py-1">Batal</button>
              <button type="submit" disabled={loadingRekom} className="bg-blue-600 text-white rounded text-xs px-3 py-1 flex items-center">
                {loadingRekom && <Loader2 className="h-3 w-3 mr-1 animate-spin" />} Simpan
              </button>
            </div>
          </form>
        )}

        <div className="space-y-2">
          {rekomendasi.map(r => (
            <div key={r.id} className="flex items-center justify-between p-3 bg-gray-50 border border-gray-100 rounded-lg">
              <div>
                <div className="font-semibold text-gray-800 text-sm">{r.namaUjian}</div>
                <select 
                  value={r.status} 
                  onChange={(e) => updateRekomStatus(r.id, e.target.value)}
                  className={`mt-1 text-xs font-semibold bg-transparent border-none p-0 focus:ring-0 cursor-pointer ${
                    r.status === 'Direkomendasikan' ? 'text-blue-600' :
                    r.status === 'Lulus' ? 'text-green-600' :
                    r.status === 'Tidak Direkomendasikan' ? 'text-red-500' : 'text-gray-500'
                  }`}
                >
                  <option>Belum</option>
                  <option>Direkomendasikan</option>
                  <option>Tidak Direkomendasikan</option>
                  <option>Lulus</option>
                </select>
              </div>
              <button onClick={() => hapusRekom(r.id)} className="text-gray-400 hover:text-red-500"><Trash2 className="h-4 w-4" /></button>
            </div>
          ))}
          {rekomendasi.length === 0 && !addingRekom && <div className="text-center text-xs text-gray-500 py-4">Belum ada rekomendasi</div>}
        </div>
      </div>
    </div>
  );
}
