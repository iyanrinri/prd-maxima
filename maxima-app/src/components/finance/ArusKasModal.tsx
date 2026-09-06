'use client';

import { useState } from 'react';
import { createArusKas } from '@/app/admin/keuangan/actions';

export default function ArusKasModal({ onClose }: { onClose: () => void }) {
  const [tipe, setTipe] = useState('CASH_OUT');
  const [kategori, setKategori] = useState('OPERASIONAL');
  const [nominal, setNominal] = useState('');
  const [keterangan, setKeterangan] = useState('');
  const [tanggal, setTanggal] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await createArusKas({
      tipe,
      kategori,
      nominal: parseInt(nominal),
      keterangan,
      tanggal
    });
    setLoading(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-md overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-gray-50">
          <h3 className="font-bold text-gray-900">Catat Arus Kas Baru</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">×</button>
        </div>
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Tipe Transaksi</label>
            <select required value={tipe} onChange={e => setTipe(e.target.value)} className="w-full border border-gray-300 rounded-lg p-2 text-sm">
              <option value="CASH_OUT">Pengeluaran (Cash Out)</option>
              <option value="CASH_IN">Pemasukan (Cash In)</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Kategori</label>
            <select required value={kategori} onChange={e => setKategori(e.target.value)} className="w-full border border-gray-300 rounded-lg p-2 text-sm">
              {tipe === 'CASH_OUT' ? (
                <>
                  <option value="OPERASIONAL">Pengeluaran Operasional</option>
                  <option value="REFUND">Refund Siswa</option>
                  <option value="PARTNER">Pembayaran Partner</option>
                  <option value="LAINNYA">Lainnya (Keluar)</option>
                </>
              ) : (
                <>
                  <option value="DANA_LAINNYA">Dana Lainnya</option>
                  <option value="LAINNYA">Lainnya (Masuk)</option>
                </>
              )}
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Nominal (Rupiah)</label>
            <input required type="number" min="0" value={nominal} onChange={e => setNominal(e.target.value)} className="w-full border border-gray-300 rounded-lg p-2 text-sm" placeholder="Contoh: 1500000" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Keterangan</label>
            <input required type="text" value={keterangan} onChange={e => setKeterangan(e.target.value)} className="w-full border border-gray-300 rounded-lg p-2 text-sm" placeholder="Bayar Listrik Bulan Ini" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Tanggal</label>
            <input required type="date" value={tanggal} onChange={e => setTanggal(e.target.value)} className="w-full border border-gray-300 rounded-lg p-2 text-sm" />
          </div>
          <div className="pt-4 flex justify-end space-x-3">
            <button type="button" onClick={onClose} className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg">Batal</button>
            <button type="submit" disabled={loading} className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg disabled:opacity-50">
              {loading ? 'Menyimpan...' : 'Simpan Transaksi'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
