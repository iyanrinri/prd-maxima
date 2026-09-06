'use client';

import { useState } from 'react';
import { addTimelineSiswa } from '../../actions';
import { Plus, Loader2, Clock, CheckCircle2 } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function TimelineView({ 
  siswaId, 
  timelineList = [] 
}: { 
  siswaId: string, 
  timelineList: any[] 
}) {
  const router = useRouter();
  const [adding, setAdding] = useState(false);
  const [loading, setLoading] = useState(false);
  const [kegiatan, setKegiatan] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await addTimelineSiswa(siswaId, kegiatan, '');
      setAdding(false);
      setKegiatan('');
      router.refresh();
    } catch {
      alert('Gagal menambah log timeline');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm mt-8">
      <div className="flex justify-between items-center mb-6 border-b pb-4">
        <div>
          <h2 className="text-lg font-semibold text-gray-900">Timeline Siswa</h2>
          <p className="text-sm text-gray-500">Log aktivitas dan perubahan status proses admission.</p>
        </div>
        {!adding && (
          <button onClick={() => setAdding(true)} className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 flex items-center">
            <Plus className="h-4 w-4 mr-2" /> Tambah Log Manual
          </button>
        )}
      </div>

      {adding && (
        <form onSubmit={handleSubmit} className="mb-8 bg-gray-50 p-5 rounded-lg border border-gray-200 flex items-end space-x-3">
          <div className="flex-1">
            <label className="block text-xs font-medium text-gray-600 mb-1">Aktivitas / Kegiatan</label>
            <input type="text" value={kegiatan} onChange={e => setKegiatan(e.target.value)} className="w-full border-gray-300 rounded text-sm py-2 px-3 border" placeholder="Cth: Admission mengirim Dokumen Siswa ke Partner" required />
          </div>
          <button type="button" onClick={() => setAdding(false)} className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md">Batal</button>
          <button type="submit" disabled={loading || !kegiatan} className="px-4 py-2 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center h-[38px]">
            {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Simpan Log'}
          </button>
        </form>
      )}

      <div className="relative border-l border-gray-200 ml-3 space-y-6">
        {timelineList.map((item, i) => (
          <div key={item.id} className="relative pl-6">
            <span className="absolute -left-[9px] top-1 h-4 w-4 rounded-full bg-blue-100 border border-blue-600 flex items-center justify-center">
              {i === 0 ? <CheckCircle2 className="h-3 w-3 text-blue-600" /> : <div className="h-2 w-2 bg-blue-600 rounded-full" />}
            </span>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-1">
              <h3 className="font-semibold text-gray-800 text-sm">{item.kegiatan}</h3>
              <time className="text-xs font-medium text-gray-500 flex items-center whitespace-nowrap mt-1 sm:mt-0">
                <Clock className="w-3 h-3 mr-1" />
                {new Date(item.tanggal).toLocaleString('id-ID', { dateStyle: 'medium', timeStyle: 'short' })}
              </time>
            </div>
          </div>
        ))}
        {timelineList.length === 0 && (
          <div className="pl-6 text-sm text-gray-500 py-4">Belum ada riwayat aktivitas tercatat.</div>
        )}
      </div>
    </div>
  );
}
