'use client';

import { useState } from 'react';
import { addLatihanWawancara, deleteLatihanWawancara, updateLatihanWawancaraStatus } from '../../actions';
import { Trash2, Plus, Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function LatihanWawancaraForm({ 
  siswaId, 
  latihanList = [] 
}: { 
  siswaId: string, 
  latihanList: any[] 
}) {
  const router = useRouter();
  const [adding, setAdding] = useState(false);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    posisi: '',
    interviewKe: 1,
    tanggal: '',
    status: 'Dijadwalkan',
    pic: '',
    catatan: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await addLatihanWawancara({
        siswaId,
        posisi: form.posisi,
        interviewKe: Number(form.interviewKe),
        tanggal: new Date(form.tanggal),
        status: form.status,
        pic: form.pic,
        catatan: form.catatan
      });
      setAdding(false);
      setForm({
        posisi: '', interviewKe: 1, tanggal: '', status: 'Dijadwalkan', pic: '', catatan: ''
      });
      router.refresh();
    } catch {
      alert('Gagal menambah latihan wawancara');
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateStatus = async (id: string, newStatus: string) => {
    try {
      await updateLatihanWawancaraStatus(id, newStatus, siswaId);
      router.refresh();
    } catch {
      alert('Gagal update status');
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Hapus riwayat latihan wawancara ini?')) return;
    try {
      await deleteLatihanWawancara(id, siswaId);
      router.refresh();
    } catch {
      alert('Gagal hapus');
    }
  };

  return (
    <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm mt-8">
      <div className="flex justify-between items-center mb-6 border-b pb-4">
        <div>
          <h2 className="text-lg font-semibold text-gray-900">Latihan Wawancara</h2>
          <p className="text-sm text-gray-500">Rekam jejak latihan interview internal siswa.</p>
        </div>
        {!adding && (
          <button onClick={() => setAdding(true)} className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 flex items-center">
            <Plus className="h-4 w-4 mr-2" /> Tambah Jadwal
          </button>
        )}
      </div>

      {adding && (
        <form onSubmit={handleSubmit} className="mb-8 bg-gray-50 p-5 rounded-lg border border-gray-200">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">Posisi / Jurusan Target</label>
              <input type="text" value={form.posisi} onChange={e => setForm({...form, posisi: e.target.value})} className="w-full border-gray-300 rounded text-sm py-2 px-3 border" required />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">Interview Ke</label>
              <input type="number" min="1" value={form.interviewKe} onChange={e => setForm({...form, interviewKe: Number(e.target.value)})} className="w-full border-gray-300 rounded text-sm py-2 px-3 border" required />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">Tanggal & Waktu</label>
              <input type="datetime-local" value={form.tanggal} onChange={e => setForm({...form, tanggal: e.target.value})} className="w-full border-gray-300 rounded text-sm py-2 px-3 border" required />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">PIC (Penanya)</label>
              <input type="text" value={form.pic} onChange={e => setForm({...form, pic: e.target.value})} className="w-full border-gray-300 rounded text-sm py-2 px-3 border" placeholder="Nama PIC" />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">Status Awal</label>
              <select value={form.status} onChange={e => setForm({...form, status: e.target.value})} className="w-full border-gray-300 rounded text-sm py-2 px-3 border">
                <option>Dijadwalkan</option>
                <option>Selesai</option>
                <option>Batal</option>
              </select>
            </div>
            <div className="md:col-span-2 lg:col-span-1">
              <label className="block text-xs font-medium text-gray-600 mb-1">Catatan Evaluasi</label>
              <input type="text" value={form.catatan} onChange={e => setForm({...form, catatan: e.target.value})} className="w-full border-gray-300 rounded text-sm py-2 px-3 border" placeholder="Cth: Kurang lancar saat perkenalan" />
            </div>
          </div>
          <div className="flex justify-end space-x-3">
            <button type="button" onClick={() => setAdding(false)} className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md">Batal</button>
            <button type="submit" disabled={loading} className="px-4 py-2 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center">
              {loading && <Loader2 className="h-4 w-4 mr-2 animate-spin" />} Simpan
            </button>
          </div>
        </form>
      )}

      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead className="bg-gray-50 text-gray-500 border-b">
            <tr>
              <th className="px-4 py-3 font-medium">Tanggal</th>
              <th className="px-4 py-3 font-medium">Posisi / Interview Ke</th>
              <th className="px-4 py-3 font-medium">PIC</th>
              <th className="px-4 py-3 font-medium">Status & Catatan</th>
              <th className="px-4 py-3 font-medium text-right">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {latihanList.map(item => (
              <tr key={item.id} className="hover:bg-gray-50">
                <td className="px-4 py-3 whitespace-nowrap text-gray-600">
                  {new Date(item.tanggal).toLocaleString('id-ID', { dateStyle: 'medium', timeStyle: 'short' })}
                </td>
                <td className="px-4 py-3">
                  <div className="font-medium text-gray-900">{item.posisi}</div>
                  <div className="text-xs text-gray-500">Tahap ke-{item.interviewKe}</div>
                </td>
                <td className="px-4 py-3 text-gray-600">{item.pic || '-'}</td>
                <td className="px-4 py-3">
                  <select 
                    value={item.status}
                    onChange={(e) => handleUpdateStatus(item.id, e.target.value)}
                    className={`text-xs font-semibold rounded-full px-2 py-1 mb-1 outline-none border-r-[6px] border-transparent cursor-pointer ${
                      item.status === 'Selesai' ? 'bg-green-100 text-green-800' :
                      item.status === 'Batal' ? 'bg-red-100 text-red-800' :
                      'bg-yellow-100 text-yellow-800'
                    }`}
                  >
                    <option value="Dijadwalkan">Dijadwalkan</option>
                    <option value="Selesai">Selesai</option>
                    <option value="Batal">Batal</option>
                  </select>
                  {item.catatan && <div className="text-xs text-gray-500 mt-1 pl-2 border-l-2 border-blue-200">{item.catatan}</div>}
                </td>
                <td className="px-4 py-3 text-right">
                  <button onClick={() => handleDelete(item.id)} className="p-2 text-gray-400 hover:text-red-600 rounded">
                    <Trash2 className="h-4 w-4" />
                  </button>
                </td>
              </tr>
            ))}
            {latihanList.length === 0 && (
              <tr>
                <td colSpan={5} className="px-4 py-8 text-center text-gray-500">Belum ada riwayat latihan wawancara.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
