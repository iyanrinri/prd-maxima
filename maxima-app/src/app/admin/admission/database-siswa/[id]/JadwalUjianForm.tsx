'use client';

import { useState } from 'react';
import { addJadwalUjian, deleteJadwalUjian } from '../../actions';
import { Trash2, Plus, Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function JadwalUjianForm({ siswaId, jadwal = [] }: { siswaId: string, jadwal: any[] }) {
  const router = useRouter();
  const [isAdding, setIsAdding] = useState(false);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    jenisUjian: 'Goethe Zertifikat',
    level: 'B1',
    tanggalPendaftaran: '',
    tanggalUjian: '',
    status: 'Terdaftar',
    hasil: '',
    modulLulus: '',
    modulGagal: '',
    catatan: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await addJadwalUjian(siswaId, {
        jenisUjian: formData.jenisUjian,
        level: formData.level,
        tanggalPendaftaran: formData.tanggalPendaftaran ? new Date(formData.tanggalPendaftaran) : null,
        tanggalUjian: formData.tanggalUjian ? new Date(formData.tanggalUjian) : null,
        status: formData.status,
        hasil: formData.hasil || null,
        modulLulus: formData.modulLulus || null,
        modulGagal: formData.modulGagal || null,
        catatan: formData.catatan || null,
      });
      setIsAdding(false);
      setFormData({
        jenisUjian: 'Goethe Zertifikat', level: 'B1', tanggalPendaftaran: '', tanggalUjian: '',
        status: 'Terdaftar', hasil: '', modulLulus: '', modulGagal: '', catatan: ''
      });
      router.refresh();
    } catch (err) {
      alert('Gagal menyimpan jadwal ujian');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Hapus jadwal ujian ini?')) return;
    try {
      await deleteJadwalUjian(id, siswaId);
      router.refresh();
    } catch (err) {
      alert('Gagal menghapus');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="font-semibold text-gray-900">Jadwal & Riwayat Ujian</h3>
        {!isAdding && (
          <button onClick={() => setIsAdding(true)} className="flex items-center text-sm bg-blue-600 text-white px-3 py-1.5 rounded-md hover:bg-blue-700">
            <Plus className="h-4 w-4 mr-1" /> Tambah Jadwal
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {jadwal.map((item) => (
          <div key={item.id} className="border border-gray-200 rounded-xl p-5 bg-white relative">
            <button onClick={() => handleDelete(item.id)} className="absolute top-4 right-4 text-gray-400 hover:text-red-500">
              <Trash2 className="h-4 w-4" />
            </button>
            <div className="font-bold text-gray-800 mb-1">{item.jenisUjian} - {item.level}</div>
            <div className="text-xs text-blue-600 font-medium mb-3">{item.status}</div>
            
            <div className="space-y-2 text-sm text-gray-600">
              <div className="flex justify-between border-b border-dashed pb-1">
                <span>Tgl Pendaftaran</span>
                <span className="font-medium">{item.tanggalPendaftaran ? new Date(item.tanggalPendaftaran).toLocaleDateString('id-ID') : '-'}</span>
              </div>
              <div className="flex justify-between border-b border-dashed pb-1">
                <span>Tgl Ujian</span>
                <span className="font-medium">{item.tanggalUjian ? new Date(item.tanggalUjian).toLocaleDateString('id-ID') : '-'}</span>
              </div>
              {item.hasil && (
                <div className="flex justify-between border-b border-dashed pb-1">
                  <span>Hasil Keseluruhan</span>
                  <span className="font-medium text-gray-900">{item.hasil}</span>
                </div>
              )}
              {item.modulLulus && (
                <div className="text-xs mt-2 text-green-600 bg-green-50 p-2 rounded">
                  <span className="font-bold">Modul Lulus:</span> {item.modulLulus}
                </div>
              )}
              {item.modulGagal && (
                <div className="text-xs text-red-600 bg-red-50 p-2 rounded">
                  <span className="font-bold">Modul Gagal:</span> {item.modulGagal}
                </div>
              )}
            </div>
          </div>
        ))}
        {jadwal.length === 0 && !isAdding && (
          <div className="col-span-2 text-center py-8 text-gray-500 text-sm bg-gray-50 rounded-xl border border-dashed border-gray-300">
            Belum ada jadwal ujian.
          </div>
        )}
      </div>

      {isAdding && (
        <form onSubmit={handleSubmit} className="bg-gray-50 p-6 rounded-xl border border-gray-200">
          <h4 className="font-medium text-gray-800 mb-4">Form Jadwal Ujian Baru</h4>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">Jenis Ujian</label>
              <input type="text" value={formData.jenisUjian} onChange={e => setFormData({...formData, jenisUjian: e.target.value})} className="w-full border border-gray-300 rounded-md text-sm py-2 px-3" required />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">Level</label>
              <select value={formData.level} onChange={e => setFormData({...formData, level: e.target.value})} className="w-full border-gray-300 rounded-md text-sm py-2 px-3">
                <option>A1</option><option>A2</option><option>B1</option><option>B2</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">Tanggal Pendaftaran</label>
              <input type="date" value={formData.tanggalPendaftaran} onChange={e => setFormData({...formData, tanggalPendaftaran: e.target.value})} className="w-full border border-gray-300 rounded-md text-sm py-2 px-3" />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">Tanggal Ujian</label>
              <input type="date" value={formData.tanggalUjian} onChange={e => setFormData({...formData, tanggalUjian: e.target.value})} className="w-full border border-gray-300 rounded-md text-sm py-2 px-3" />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">Status</label>
              <select value={formData.status} onChange={e => setFormData({...formData, status: e.target.value})} className="w-full border-gray-300 rounded-md text-sm py-2 px-3">
                <option>Terdaftar</option>
                <option>Selesai - Lulus Semua</option>
                <option>Selesai - Lulus Sebagian</option>
                <option>Selesai - Gagal</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6 pt-4 border-t border-gray-200">
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">Modul Lulus (Pisahkan dgn koma)</label>
              <input type="text" placeholder="Cth: Lesen, Horen" value={formData.modulLulus} onChange={e => setFormData({...formData, modulLulus: e.target.value})} className="w-full border border-gray-300 rounded-md text-sm py-2 px-3" />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">Modul Gagal (Pisahkan dgn koma)</label>
              <input type="text" placeholder="Cth: Sprechen" value={formData.modulGagal} onChange={e => setFormData({...formData, modulGagal: e.target.value})} className="w-full border border-gray-300 rounded-md text-sm py-2 px-3" />
            </div>
          </div>

          <div className="flex justify-end space-x-3">
            <button type="button" onClick={() => setIsAdding(false)} className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md">Batal</button>
            <button type="submit" disabled={loading} className="px-4 py-2 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center">
              {loading && <Loader2 className="h-4 w-4 mr-2 animate-spin" />} Simpan
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
