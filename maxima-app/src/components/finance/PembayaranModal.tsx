'use client';

import { useState } from 'react';
import { createPembayaran } from '@/app/admin/keuangan/actions';

export default function PembayaranModal({ siswas, tagihans, onClose }: { siswas: any[], tagihans: any[], onClose: () => void }) {
  const [siswaId, setSiswaId] = useState('');
  const [tagihanId, setTagihanId] = useState('');
  const [nominal, setNominal] = useState('');
  const [metode, setMetode] = useState('Transfer Bank');
  const [keterangan, setKeterangan] = useState('');
  const [tanggal, setTanggal] = useState('');
  const [loading, setLoading] = useState(false);

  const filteredTagihans = tagihans.filter(t => t.siswaId === siswaId && t.status !== 'LUNAS');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await createPembayaran({
      siswaId,
      tagihanId: tagihanId || undefined,
      nominalRupiah: parseInt(nominal),
      nominalEuro: 0,
      keterangan,
      metode,
      tanggal
    });
    setLoading(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-md overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-gray-50">
          <h3 className="font-bold text-gray-900">Catat Pembayaran Masuk</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">×</button>
        </div>
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Siswa</label>
            <select required value={siswaId} onChange={e => { setSiswaId(e.target.value); setTagihanId(''); }} className="w-full border border-gray-300 rounded-lg p-2 text-sm">
              <option value="">Pilih Siswa</option>
              {siswas.map(s => <option key={s.id} value={s.id}>{s.namaLengkap}</option>)}
            </select>
          </div>
          {siswaId && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Pilih Tagihan (Opsional)</label>
              <select value={tagihanId} onChange={e => setTagihanId(e.target.value)} className="w-full border border-gray-300 rounded-lg p-2 text-sm">
                <option value="">Tanpa Tagihan Spesifik</option>
                {filteredTagihans.map(t => (
                  <option key={t.id} value={t.id}>Termin {t.termin} (Rp {t.nominalRupiah})</option>
                ))}
              </select>
            </div>
          )}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Metode Pembayaran</label>
            <select required value={metode} onChange={e => setMetode(e.target.value)} className="w-full border border-gray-300 rounded-lg p-2 text-sm">
              <option value="Transfer Bank">Transfer Bank</option>
              <option value="Tunai">Tunai / Cash</option>
              <option value="Dana Talang">Dana Talang</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Nominal Masuk (Rupiah)</label>
            <input required type="number" min="0" value={nominal} onChange={e => setNominal(e.target.value)} className="w-full border border-gray-300 rounded-lg p-2 text-sm" placeholder="Contoh: 1000000" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Keterangan</label>
            <input required type="text" value={keterangan} onChange={e => setKeterangan(e.target.value)} className="w-full border border-gray-300 rounded-lg p-2 text-sm" placeholder="Pembayaran DP termin A2" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Tanggal Bayar</label>
            <input required type="date" value={tanggal} onChange={e => setTanggal(e.target.value)} className="w-full border border-gray-300 rounded-lg p-2 text-sm" />
          </div>
          <div className="pt-4 flex justify-end space-x-3">
            <button type="button" onClick={onClose} className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg">Batal</button>
            <button type="submit" disabled={loading} className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg disabled:opacity-50">
              {loading ? 'Menyimpan...' : 'Simpan Pembayaran'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
