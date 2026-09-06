'use client';

import { useState } from 'react';
import { saveDokumenSiswa } from '../../actions';
import { Upload, CheckCircle, FileText, Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function DokumenForm({ siswaId, initialData }: { siswaId: string, initialData: any }) {
  const router = useRouter();
  const [uploading, setUploading] = useState<string | null>(null);

  const dokumenList = [
    { key: 'pasFoto', label: 'Pas Foto' },
    { key: 'aktaKelahiran', label: 'Akta Kelahiran' },
    { key: 'kartuKeluarga', label: 'Kartu Keluarga' },
    { key: 'ijazahTerakhir', label: 'Ijazah Terakhir' },
    { key: 'transkripTerakhir', label: 'Transkrip Terakhir' },
    { key: 'paspor', label: 'Paspor' },
    { key: 'lebenslauf', label: 'Lebenslauf (CV)' },
    { key: 'motivationsschreiben', label: 'Motivationsschreiben' },
    { key: 'videoPerkenalan', label: 'Video Perkenalan' },
  ];

  const handleUpload = async (key: string, file: File) => {
    setUploading(key);
    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('category', 'dokumen-siswa');

      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      if (!res.ok) throw new Error('Upload gagal');
      
      const { url } = await res.json();
      
      await saveDokumenSiswa(siswaId, { [key]: url });
      router.refresh();
    } catch (err) {
      alert('Gagal mengunggah dokumen.');
    } finally {
      setUploading(null);
    }
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
      <h3 className="font-semibold text-gray-900 mb-6">Dokumen Pribadi & Persyaratan</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {dokumenList.map(({ key, label }) => {
          const fileUrl = initialData?.[key];
          const isUploading = uploading === key;

          return (
            <div key={key} className="border border-gray-200 rounded-lg p-4 flex flex-col justify-between hover:border-gray-300 transition-colors bg-gray-50/50">
              <div className="mb-4 flex justify-between items-start">
                <span className="font-medium text-sm text-gray-700">{label}</span>
                {fileUrl && <CheckCircle className="h-4 w-4 text-green-500" />}
              </div>
              
              <div className="flex items-center space-x-2 mt-auto">
                {fileUrl ? (
                  <a href={fileUrl} target="_blank" rel="noreferrer" className="flex-1 flex justify-center items-center px-3 py-2 bg-white border border-gray-300 text-sm font-medium rounded-md text-gray-700 hover:bg-gray-50 transition">
                    <FileText className="h-4 w-4 mr-2 text-blue-500" />
                    Lihat Berkas
                  </a>
                ) : (
                  <label className="flex-1 cursor-pointer flex justify-center items-center px-3 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 transition">
                    {isUploading ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <Upload className="h-4 w-4 mr-2" />}
                    {isUploading ? 'Mengunggah...' : 'Unggah'}
                    <input 
                      type="file" 
                      className="hidden" 
                      accept=".pdf,.jpg,.jpeg,.png,.mp4"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) handleUpload(key, file);
                      }}
                    />
                  </label>
                )}
                
                {fileUrl && (
                  <label className="cursor-pointer px-3 py-2 bg-gray-100 text-gray-600 border border-gray-200 text-sm font-medium rounded-md hover:bg-gray-200 transition" title="Ganti File">
                    {isUploading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Upload className="h-4 w-4" />}
                    <input 
                      type="file" 
                      className="hidden" 
                      accept=".pdf,.jpg,.jpeg,.png,.mp4"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) handleUpload(key, file);
                      }}
                    />
                  </label>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
