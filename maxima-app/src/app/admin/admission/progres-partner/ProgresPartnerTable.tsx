'use client';

import { useState } from 'react';
import { addProgresPartner, deleteProgresPartner, updateProgresPartnerStatus } from './../actions';
import { Plus, Trash2, Edit2, Loader2, Search } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function ProgresPartnerTable({ initialData, siswaList }: { initialData: any[], siswaList: any[] }) {
  const router = useRouter();
  const [isAdding, setIsAdding] = useState(false);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState('');

  const [formData, setFormData] = useState({
    siswaId: '',
    partnerName: '',
    posisi: '',
    status: 'Interview',
    catatanPartner: '',
    catatanAdmission: ''
  });

  const filteredData = initialData.filter(item => 
    item.siswa?.namaLengkap.toLowerCase().includes(search.toLowerCase()) ||
    item.partnerName.toLowerCase().includes(search.toLowerCase())
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await addProgresPartner(formData);
      setIsAdding(false);
      setFormData({
        siswaId: '', partnerName: '', posisi: '', status: 'Interview',
        catatanPartner: '', catatanAdmission: ''
      });
      router.refresh();
    } catch (err) {
      alert('Gagal menambah data');
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (id: string, newStatus: string) => {
    try {
      await updateProgresPartnerStatus(id, newStatus);
      router.refresh();
    } catch (err) {
      alert('Gagal update status');
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Hapus progres ini?')) return;
    try {
      await deleteProgresPartner(id);
      router.refresh();
    } catch (err) {
      alert('Gagal hapus');
    }
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
      
      {/* Header Toolbar */}
      <div className="p-4 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input 
            type="text" 
            placeholder="Cari Siswa / Partner..." 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9 pr-4 py-2 border border-gray-300 rounded-lg text-sm w-72 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        {!isAdding && (
          <button onClick={() => setIsAdding(true)} className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 flex items-center">
            <Plus className="h-4 w-4 mr-2" /> Tambah Progres
          </button>
        )}
      </div>

      {/* Add Form */}
      {isAdding && (
        <div className="p-6 border-b border-gray-200 bg-gray-50">
          <form onSubmit={handleSubmit} className="max-w-4xl bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
            <h3 className="font-semibold text-gray-800 mb-4">Input Progres Partner Baru</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">Pilih Siswa</label>
                <select value={formData.siswaId} onChange={e => setFormData({...formData, siswaId: e.target.value})} className="w-full border-gray-300 rounded-md text-sm py-2" required>
                  <option value="">-- Pilih Siswa --</option>
                  {siswaList.map(s => (
                    <option key={s.id} value={s.id}>{s.namaLengkap} ({s.program})</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">Status Progres</label>
                <select value={formData.status} onChange={e => setFormData({...formData, status: e.target.value})} className="w-full border-gray-300 rounded-md text-sm py-2" required>
                  <option>Interview</option>
                  <option>Dapat Kontrak</option>
                  <option>Gagal</option>
                  <option>Pending</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">Nama Partner / Perusahaan</label>
                <input type="text" value={formData.partnerName} onChange={e => setFormData({...formData, partnerName: e.target.value})} className="w-full border border-gray-300 rounded-md text-sm py-2 px-3" required />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">Posisi / Jurusan</label>
                <input type="text" value={formData.posisi} onChange={e => setFormData({...formData, posisi: e.target.value})} className="w-full border border-gray-300 rounded-md text-sm py-2 px-3" required />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">Catatan dari Partner (Opsional)</label>
                <textarea value={formData.catatanPartner} onChange={e => setFormData({...formData, catatanPartner: e.target.value})} className="w-full border border-gray-300 rounded-md text-sm py-2 px-3" rows={2}></textarea>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">Catatan Admission (Opsional)</label>
                <textarea value={formData.catatanAdmission} onChange={e => setFormData({...formData, catatanAdmission: e.target.value})} className="w-full border border-gray-300 rounded-md text-sm py-2 px-3" rows={2}></textarea>
              </div>
            </div>

            <div className="flex justify-end space-x-3">
              <button type="button" onClick={() => setIsAdding(false)} className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md">Batal</button>
              <button type="submit" disabled={loading} className="px-4 py-2 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center">
                {loading && <Loader2 className="h-4 w-4 mr-2 animate-spin" />} Simpan
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Table List */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead className="bg-gray-50 text-gray-500 border-b">
            <tr>
              <th className="px-6 py-4 font-medium">Tanggal</th>
              <th className="px-6 py-4 font-medium">Siswa</th>
              <th className="px-6 py-4 font-medium">Partner & Posisi</th>
              <th className="px-6 py-4 font-medium">Status & Catatan</th>
              <th className="px-6 py-4 font-medium text-center">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {filteredData.map((item) => (
              <tr key={item.id} className="hover:bg-gray-50/50">
                <td className="px-6 py-4 whitespace-nowrap text-gray-500 text-xs">
                  {new Date(item.tanggalProses).toLocaleDateString('id-ID')}
                </td>
                <td className="px-6 py-4">
                  <div className="font-semibold text-gray-900">{item.siswa?.namaLengkap}</div>
                  <div className="text-xs text-gray-500">{item.siswa?.noKontrak}</div>
                </td>
                <td className="px-6 py-4">
                  <div className="font-medium text-gray-800">{item.partnerName}</div>
                  <div className="text-xs text-blue-600">{item.posisi}</div>
                </td>
                <td className="px-6 py-4 max-w-xs">
                  <select 
                    value={item.status} 
                    onChange={(e) => handleStatusChange(item.id, e.target.value)}
                    className={`text-xs font-semibold rounded-full px-3 py-1 mb-2 outline-none cursor-pointer border-r-[8px] border-transparent ${
                      item.status === 'Dapat Kontrak' ? 'bg-green-100 text-green-800' :
                      item.status === 'Gagal' ? 'bg-red-100 text-red-800' :
                      item.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-indigo-100 text-indigo-800'
                    }`}
                  >
                    <option value="Interview">Interview</option>
                    <option value="Pending">Pending</option>
                    <option value="Dapat Kontrak">Dapat Kontrak</option>
                    <option value="Gagal">Gagal</option>
                  </select>
                  {item.catatanPartner && <div className="text-xs text-gray-500 line-clamp-1 border-l-2 border-gray-300 pl-2 mt-1">P: {item.catatanPartner}</div>}
                  {item.catatanAdmission && <div className="text-xs text-gray-500 line-clamp-1 border-l-2 border-blue-300 pl-2 mt-1">A: {item.catatanAdmission}</div>}
                </td>
                <td className="px-6 py-4 text-center">
                  <button onClick={() => handleDelete(item.id)} className="p-2 text-gray-400 hover:text-red-600 rounded-md hover:bg-red-50 transition">
                    <Trash2 className="h-4 w-4" />
                  </button>
                </td>
              </tr>
            ))}
            {filteredData.length === 0 && (
              <tr>
                <td colSpan={5} className="px-6 py-12 text-center text-gray-500">
                  Tidak ada data progres partner ditemukan.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
