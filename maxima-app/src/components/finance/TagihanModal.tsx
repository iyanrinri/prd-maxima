'use client';

import { useState } from 'react';
import { createTagihan } from '@/app/admin/keuangan/actions';

export default function TagihanModal({ siswas, onClose }: { siswas: any[], onClose: () => void }) {
  const [siswaId, setSiswaId] = useState('');
  const [termin, setTermin] = useState('Termin Ke-1');
  const [nominal, setNominal] = useState('');
  const [jatuhTempo, setJatuhTempo] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await createTagihan({
      siswaId,
      termin,
      nominalRupiah: parseInt(nominal),
      nominalEuro: 0,
      jatuhTempo,
      status: 'BELUM_BAYAR'
    });
    setLoading(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-md overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-gray-50">
          <h3 className="font-bold text-gray-900">Buat Tagihan Baru</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">×</button>
        </div>
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Siswa</label>
            <select required value={siswaId} onChange={e => setSiswaId(e.target.value)} className="w-full border border-gray-300 rounded-lg p-2 text-sm">
              <option value="">Pilih Siswa</option>
              {siswas.map(s => <option key={s.id} value={s.id}>{s.namaLengkap} - {s.noKontrak}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Termin / Tahapan</label>
            <select required value={termin} onChange={e => setTermin(e.target.value)} className="w-full border border-gray-300 rounded-lg p-2 text-sm">
              <option value="DP">DP (Down Payment)</option>
              <option value="Termin A2">Termin A2</option>
              <option value="Termin B1">Termin B1</option>
              <option value="Termin Paspor">Termin Paspor</option>
              <option value="Termin Ujian">Termin Ujian</option>
              <option value="Termin Visa">Termin Visa</option>
              <option value="Lainnya">Lainnya</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Nominal (Rupiah)</label>
            <input required type="number" min="0" value={nominal} onChange={e => setNominal(e.target.value)} className="w-full border border-gray-300 rounded-lg p-2 text-sm" placeholder="Contoh: 5000000" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Jatuh Tempo</label>
            <input required type="date" value={jatuhTempo} onChange={e => setJatuhTempo(e.target.value)} className="w-full border border-gray-300 rounded-lg p-2 text-sm" />
          </div>
          <div className="pt-4 flex justify-end space-x-3">
            <button type="button" onClick={onClose} className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg">Batal</button>
            <button type="submit" disabled={loading} className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg disabled:opacity-50">
              {loading ? 'Menyimpan...' : 'Simpan Tagihan'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
