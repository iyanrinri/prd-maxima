'use client';

import { useState } from 'react';
import { createPromoCode } from '@/app/admin/keuangan/actions';

export default function PromoModal({ onClose }: { onClose: () => void }) {
  const [kode, setKode] = useState('');
  const [jenis, setJenis] = useState('NOMINAL');
  const [nilaiRupiah, setNilaiRupiah] = useState('');
  const [nilaiPersentase, setNilaiPersentase] = useState('');
  const [kuota, setKuota] = useState('');
  const [berlakuHingga, setBerlakuHingga] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await createPromoCode({
      kode,
      jenis,
      nilaiRupiah: jenis === 'NOMINAL' ? parseInt(nilaiRupiah) || 0 : 0,
      nilaiPersentase: jenis === 'PERSENTASE' ? parseFloat(nilaiPersentase) || 0 : 0,
      kuota: kuota || null,
      berlakuHingga: berlakuHingga || null
    });
    setLoading(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-md overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-gray-50">
          <h3 className="font-bold text-gray-900">Buat Promo Baru</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">×</button>
        </div>
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Kode Promo</label>
            <input required type="text" value={kode} onChange={e => setKode(e.target.value.toUpperCase())} className="w-full border border-gray-300 rounded-lg p-2 text-sm font-mono" placeholder="Contoh: DISKON20" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Jenis Diskon</label>
            <select required value={jenis} onChange={e => setJenis(e.target.value)} className="w-full border border-gray-300 rounded-lg p-2 text-sm">
              <option value="NOMINAL">Potongan Nominal (Rp)</option>
              <option value="PERSENTASE">Potongan Persentase (%)</option>
            </select>
          </div>
          
          {jenis === 'NOMINAL' ? (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Nilai Potongan (Rupiah)</label>
              <input required type="number" min="0" value={nilaiRupiah} onChange={e => setNilaiRupiah(e.target.value)} className="w-full border border-gray-300 rounded-lg p-2 text-sm" placeholder="Contoh: 500000" />
            </div>
          ) : (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Nilai Potongan (%)</label>
              <input required type="number" min="0" max="100" value={nilaiPersentase} onChange={e => setNilaiPersentase(e.target.value)} className="w-full border border-gray-300 rounded-lg p-2 text-sm" placeholder="Contoh: 10" />
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Batas Kuota (Opsional)</label>
            <input type="number" min="1" value={kuota} onChange={e => setKuota(e.target.value)} className="w-full border border-gray-300 rounded-lg p-2 text-sm" placeholder="Kosongkan jika tak terbatas" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Berlaku Hingga (Opsional)</label>
            <input type="date" value={berlakuHingga} onChange={e => setBerlakuHingga(e.target.value)} className="w-full border border-gray-300 rounded-lg p-2 text-sm" />
          </div>
          <div className="pt-4 flex justify-end space-x-3">
            <button type="button" onClick={onClose} className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg">Batal</button>
            <button type="submit" disabled={loading} className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg disabled:opacity-50">
              {loading ? 'Menyimpan...' : 'Simpan Promo'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
