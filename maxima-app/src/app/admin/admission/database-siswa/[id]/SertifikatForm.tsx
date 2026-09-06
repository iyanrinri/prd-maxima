'use client';

import { useState } from 'react';
import { addSertifikatBahasa, deleteSertifikatBahasa } from '../../actions';
import { Trash2, Plus, Upload, Loader2, FileText } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function SertifikatForm({ siswaId, sertifikats = [] }: { siswaId: string, sertifikats: any[] }) {
  const router = useRouter();
  const [isAdding, setIsAdding] = useState(false);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);

  const [formData, setFormData] = useState({
    jenisSertifikat: 'Goethe',
    level: 'B1',
    nilaiLesen: '',
    masaBerlakuLesen: '',
    nilaiHoren: '',
    masaBerlakuHoren: '',
    nilaiSprechen: '',
    masaBerlakuSprechen: '',
    nilaiSchreiben: '',
    masaBerlakuSchreiben: '',
    uploadSertifikat: ''
  });

  const handleUpload = async (file: File) => {
    setUploading(true);
    try {
      const data = new FormData();
      data.append('file', file);
      data.append('category', 'sertifikat');
      const res = await fetch('/api/upload', { method: 'POST', body: data });
      if (!res.ok) throw new Error('Upload gagal');
      const { url } = await res.json();
      setFormData({ ...formData, uploadSertifikat: url });
    } catch (err) {
      alert('Gagal upload sertifikat');
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await addSertifikatBahasa(siswaId, {
        jenisSertifikat: formData.jenisSertifikat,
        level: formData.level,
        nilaiLesen: parseInt(formData.nilaiLesen) || null,
        masaBerlakuLesen: formData.masaBerlakuLesen ? new Date(formData.masaBerlakuLesen) : null,
        nilaiHoren: parseInt(formData.nilaiHoren) || null,
        masaBerlakuHoren: formData.masaBerlakuHoren ? new Date(formData.masaBerlakuHoren) : null,
        nilaiSprechen: parseInt(formData.nilaiSprechen) || null,
        masaBerlakuSprechen: formData.masaBerlakuSprechen ? new Date(formData.masaBerlakuSprechen) : null,
        nilaiSchreiben: parseInt(formData.nilaiSchreiben) || null,
        masaBerlakuSchreiben: formData.masaBerlakuSchreiben ? new Date(formData.masaBerlakuSchreiben) : null,
        uploadSertifikat: formData.uploadSertifikat || null,
      });
      setIsAdding(false);
      setFormData({
        jenisSertifikat: 'Goethe', level: 'B1', nilaiLesen: '', masaBerlakuLesen: '',
        nilaiHoren: '', masaBerlakuHoren: '', nilaiSprechen: '', masaBerlakuSprechen: '',
        nilaiSchreiben: '', masaBerlakuSchreiben: '', uploadSertifikat: ''
      });
      router.refresh();
    } catch (err) {
      alert('Gagal menyimpan sertifikat');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Hapus sertifikat ini?')) return;
    try {
      await deleteSertifikatBahasa(id, siswaId);
      router.refresh();
    } catch (err) {
      alert('Gagal menghapus');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="font-semibold text-gray-900">Data Sertifikat Bahasa</h3>
        {!isAdding && (
          <button onClick={() => setIsAdding(true)} className="flex items-center text-sm bg-blue-600 text-white px-3 py-1.5 rounded-md hover:bg-blue-700">
            <Plus className="h-4 w-4 mr-1" /> Tambah Sertifikat
          </button>
        )}
      </div>

      {/* List existing */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {sertifikats.map((cert) => (
          <div key={cert.id} className="border border-gray-200 rounded-xl p-5 bg-white relative">
            <button onClick={() => handleDelete(cert.id)} className="absolute top-4 right-4 text-gray-400 hover:text-red-500">
              <Trash2 className="h-4 w-4" />
            </button>
            <div className="font-bold text-gray-800 mb-1">{cert.jenisSertifikat} - {cert.level}</div>
            <div className="grid grid-cols-2 gap-2 text-sm mt-3">
              <div><span className="text-gray-500 block text-xs">Lesen</span>{cert.nilaiLesen || '-'}</div>
              <div><span className="text-gray-500 block text-xs">Hören</span>{cert.nilaiHoren || '-'}</div>
              <div><span className="text-gray-500 block text-xs">Sprechen</span>{cert.nilaiSprechen || '-'}</div>
              <div><span className="text-gray-500 block text-xs">Schreiben</span>{cert.nilaiSchreiben || '-'}</div>
            </div>
            {cert.uploadSertifikat && (
              <a href={cert.uploadSertifikat} target="_blank" rel="noreferrer" className="mt-4 inline-flex items-center text-xs font-medium text-blue-600 hover:underline">
                <FileText className="h-3 w-3 mr-1" /> Lihat Dokumen Sertifikat
              </a>
            )}
          </div>
        ))}
        {sertifikats.length === 0 && !isAdding && (
          <div className="col-span-2 text-center py-8 text-gray-500 text-sm bg-gray-50 rounded-xl border border-dashed border-gray-300">
            Belum ada sertifikat terdaftar.
          </div>
        )}
      </div>

      {/* Form Add */}
      {isAdding && (
        <form onSubmit={handleSubmit} className="bg-gray-50 p-6 rounded-xl border border-gray-200">
          <h4 className="font-medium text-gray-800 mb-4">Tambah Sertifikat Baru</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">Jenis Sertifikat</label>
              <select value={formData.jenisSertifikat} onChange={e => setFormData({...formData, jenisSertifikat: e.target.value})} className="w-full border-gray-300 rounded-md text-sm py-2">
                <option>Goethe</option>
                <option>ÖSD</option>
                <option>ECL</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">Level</label>
              <select value={formData.level} onChange={e => setFormData({...formData, level: e.target.value})} className="w-full border-gray-300 rounded-md text-sm py-2">
                <option>A1</option><option>A2</option><option>B1</option><option>B2</option>
              </select>
            </div>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            {['Lesen', 'Horen', 'Sprechen', 'Schreiben'].map((modul) => (
              <div key={modul} className="space-y-2">
                <label className="block text-xs font-semibold text-gray-700">{modul}</label>
                <input 
                  type="number" placeholder="Nilai" 
                  value={(formData as any)[`nilai${modul}`]} 
                  onChange={e => setFormData({...formData, [`nilai${modul}`]: e.target.value})}
                  className="w-full border border-gray-300 rounded-md text-sm py-1.5 px-2"
                />
                <input 
                  type="date" 
                  value={(formData as any)[`masaBerlaku${modul}`]} 
                  onChange={e => setFormData({...formData, [`masaBerlaku${modul}`]: e.target.value})}
                  className="w-full border border-gray-300 rounded-md text-xs py-1.5 px-2 text-gray-500"
                />
              </div>
            ))}
          </div>

          <div className="mb-6">
            <label className="block text-xs font-medium text-gray-600 mb-2">Upload Dokumen Sertifikat (PDF/JPG Max 5MB)</label>
            {formData.uploadSertifikat ? (
              <div className="flex items-center text-sm text-green-600 font-medium">
                <FileText className="h-4 w-4 mr-2" /> File siap disimpan
                <button type="button" onClick={() => setFormData({...formData, uploadSertifikat: ''})} className="ml-3 text-red-500 hover:underline">Batal</button>
              </div>
            ) : (
              <label className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 cursor-pointer">
                {uploading ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <Upload className="h-4 w-4 mr-2" />}
                {uploading ? 'Mengunggah...' : 'Pilih File'}
                <input type="file" className="hidden" accept=".pdf,.jpg,.jpeg,.png" onChange={(e) => e.target.files?.[0] && handleUpload(e.target.files[0])} />
              </label>
            )}
          </div>

          <div className="flex justify-end space-x-3">
            <button type="button" onClick={() => setIsAdding(false)} className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md">Batal</button>
            <button type="submit" disabled={loading} className="px-4 py-2 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 flex items-center">
              {loading && <Loader2 className="h-4 w-4 mr-2 animate-spin" />} Simpan
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
