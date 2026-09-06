'use client';

import { useState } from 'react';
import { updateDataAlumni } from '../actions';
import { MapPin, Briefcase, GraduationCap, Calendar, Phone, Edit, ExternalLink, Loader2, FileText, Upload } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function AlumniTable({ data }: { data: any[] }) {
  const router = useRouter();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [uploadingField, setUploadingField] = useState<string | null>(null);
  
  const [form, setForm] = useState({
    perusahaan: '',
    posisiJurusan: '',
    kota: '',
    bundesland: '',
    tanggalMulaiVertrag: '',
    tanggalBerakhirVertrag: '',
    tanggalPengajuanVisa: '',
    tanggalWawancaraVisa: '',
    tanggalApprovedVisa: '',
    tanggalKeberangkatan: '',
    uploadVisa: '',
    uploadKontrakKerja: '',
    uploadKrankenversicherung: '',
    uploadRahmenplan: '',
    uploadDokumenLain: ''
  });

  const formatDateValue = (dateString?: string) => {
    if (!dateString) return '';
    return new Date(dateString).toISOString().split('T')[0];
  };

  const handleEdit = (siswa: any) => {
    setEditingId(siswa.id);
    if (siswa.dataAlumni) {
      setForm({
        perusahaan: siswa.dataAlumni.perusahaan || '',
        posisiJurusan: siswa.dataAlumni.posisiJurusan || '',
        kota: siswa.dataAlumni.kota || '',
        bundesland: siswa.dataAlumni.bundesland || '',
        tanggalMulaiVertrag: formatDateValue(siswa.dataAlumni.tanggalMulaiVertrag),
        tanggalBerakhirVertrag: formatDateValue(siswa.dataAlumni.tanggalBerakhirVertrag),
        tanggalPengajuanVisa: formatDateValue(siswa.dataAlumni.tanggalPengajuanVisa),
        tanggalWawancaraVisa: formatDateValue(siswa.dataAlumni.tanggalWawancaraVisa),
        tanggalApprovedVisa: formatDateValue(siswa.dataAlumni.tanggalApprovedVisa),
        tanggalKeberangkatan: formatDateValue(siswa.dataAlumni.tanggalKeberangkatan),
        uploadVisa: siswa.dataAlumni.uploadVisa || '',
        uploadKontrakKerja: siswa.dataAlumni.uploadKontrakKerja || '',
        uploadKrankenversicherung: siswa.dataAlumni.uploadKrankenversicherung || '',
        uploadRahmenplan: siswa.dataAlumni.uploadRahmenplan || '',
        uploadDokumenLain: siswa.dataAlumni.uploadDokumenLain || ''
      });
    } else {
      setForm({
        perusahaan: '', posisiJurusan: '', kota: '', bundesland: '',
        tanggalMulaiVertrag: '', tanggalBerakhirVertrag: '', tanggalPengajuanVisa: '',
        tanggalWawancaraVisa: '', tanggalApprovedVisa: '', tanggalKeberangkatan: '',
        uploadVisa: '', uploadKontrakKerja: '', uploadKrankenversicherung: '',
        uploadRahmenplan: '', uploadDokumenLain: ''
      });
    }
  };

  const handleUpload = async (file: File, fieldName: string) => {
    setUploadingField(fieldName);
    try {
      const data = new FormData();
      data.append('file', file);
      data.append('category', 'alumni');
      const res = await fetch('/api/upload', { method: 'POST', body: data });
      if (!res.ok) throw new Error('Upload gagal');
      const { url } = await res.json();
      setForm((prev: any) => ({ ...prev, [fieldName]: url }));
    } catch (err) {
      alert('Gagal upload dokumen');
    } finally {
      setUploadingField(null);
    }
  };

  const handleSave = async (siswaId: string) => {
    setLoading(true);
    try {
      const submitData = {
        perusahaan: form.perusahaan,
        posisiJurusan: form.posisiJurusan,
        kota: form.kota,
        bundesland: form.bundesland,
        tanggalMulaiVertrag: form.tanggalMulaiVertrag ? new Date(form.tanggalMulaiVertrag) : null,
        tanggalBerakhirVertrag: form.tanggalBerakhirVertrag ? new Date(form.tanggalBerakhirVertrag) : null,
        tanggalPengajuanVisa: form.tanggalPengajuanVisa ? new Date(form.tanggalPengajuanVisa) : null,
        tanggalWawancaraVisa: form.tanggalWawancaraVisa ? new Date(form.tanggalWawancaraVisa) : null,
        tanggalApprovedVisa: form.tanggalApprovedVisa ? new Date(form.tanggalApprovedVisa) : null,
        tanggalKeberangkatan: form.tanggalKeberangkatan ? new Date(form.tanggalKeberangkatan) : null,
        uploadVisa: form.uploadVisa,
        uploadKontrakKerja: form.uploadKontrakKerja,
        uploadKrankenversicherung: form.uploadKrankenversicherung,
        uploadRahmenplan: form.uploadRahmenplan,
        uploadDokumenLain: form.uploadDokumenLain
      };

      await updateDataAlumni(siswaId, submitData);
      setEditingId(null);
      router.refresh();
    } catch {
      alert('Gagal menyimpan data alumni');
    } finally {
      setLoading(false);
    }
  };

  const FileUploadField = ({ label, field }: { label: string, field: string }) => (
    <div className="mb-4">
      <label className="block text-xs font-medium text-gray-600 mb-1">{label} (Max 5MB)</label>
      {(form as any)[field] ? (
        <div className="flex items-center text-sm text-green-600 font-medium bg-green-50 p-2 rounded border border-green-100">
          <FileText className="h-4 w-4 mr-2" /> File terupload
          <button type="button" onClick={() => setForm({...form, [field]: ''})} className="ml-3 text-red-500 hover:underline">Hapus</button>
        </div>
      ) : (
        <label className="inline-flex items-center w-full justify-center px-4 py-2 border border-dashed border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-gray-50 hover:bg-gray-100 cursor-pointer transition-colors">
          {uploadingField === field ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <Upload className="h-4 w-4 mr-2" />}
          {uploadingField === field ? 'Mengunggah...' : 'Pilih File'}
          <input type="file" className="hidden" accept=".pdf,.jpg,.jpeg,.png" onChange={(e) => e.target.files?.[0] && handleUpload(e.target.files[0], field)} />
        </label>
      )}
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-6">
        {data.map((siswa) => (
          <div key={siswa.id} className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden flex flex-col md:flex-row">
            {/* Profil Singkat */}
            <div className="p-6 bg-gray-50 md:w-1/3 border-b md:border-b-0 md:border-r border-gray-200">
              <div className="flex items-center space-x-4 mb-4">
                <div className="h-12 w-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-bold text-xl">
                  {siswa.namaLengkap.charAt(0)}
                </div>
                <div>
                  <h3 className="font-bold text-gray-900">{siswa.namaLengkap}</h3>
                  <div className="text-sm text-gray-500">{siswa.program}</div>
                </div>
              </div>
              <div className="space-y-2 text-sm text-gray-600">
                <div className="flex items-center"><MapPin className="h-4 w-4 mr-2" /> Cabang {siswa.cabang}</div>
                <div className="flex items-center"><FileText className="h-4 w-4 mr-2" /> {siswa.noKontrak}</div>
                <Link href={`/admin/admission/database-siswa/${siswa.id}`} className="text-blue-600 hover:underline flex items-center mt-2">
                  <ExternalLink className="h-3 w-3 mr-1" /> Buka Profil Siswa
                </Link>
              </div>
            </div>

            {/* Detail Alumni / Form */}
            <div className="p-6 flex-1">
              {editingId === siswa.id ? (
                <div className="space-y-4">
                  <h4 className="font-semibold text-gray-900 mb-3 border-b pb-2">Edit Data Alumni</h4>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="block text-xs font-medium text-gray-600 mb-1">Perusahaan</label>
                      <input type="text" value={form.perusahaan} onChange={e => setForm({...form, perusahaan: e.target.value})} className="w-full border-gray-300 rounded text-sm py-2 px-3 border" placeholder="Nama Perusahaan" />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-600 mb-1">Posisi / Jurusan</label>
                      <input type="text" value={form.posisiJurusan} onChange={e => setForm({...form, posisiJurusan: e.target.value})} className="w-full border-gray-300 rounded text-sm py-2 px-3 border" placeholder="Cth: Pflegefachmann" />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-600 mb-1">Kota</label>
                      <input type="text" value={form.kota} onChange={e => setForm({...form, kota: e.target.value})} className="w-full border-gray-300 rounded text-sm py-2 px-3 border" placeholder="Cth: Berlin" />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-600 mb-1">Bundesland</label>
                      <input type="text" value={form.bundesland} onChange={e => setForm({...form, bundesland: e.target.value})} className="w-full border-gray-300 rounded text-sm py-2 px-3 border" placeholder="Cth: Bayern" />
                    </div>
                  </div>

                  <h5 className="text-sm font-semibold text-gray-700 mt-6 mb-3 border-b pb-1">Tanggal Penting</h5>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    <div><label className="block text-xs font-medium text-gray-600 mb-1">Mulai Vertrag</label><input type="date" value={form.tanggalMulaiVertrag} onChange={e => setForm({...form, tanggalMulaiVertrag: e.target.value})} className="w-full border-gray-300 rounded text-sm py-2 px-3 border" /></div>
                    <div><label className="block text-xs font-medium text-gray-600 mb-1">Berakhir Vertrag</label><input type="date" value={form.tanggalBerakhirVertrag} onChange={e => setForm({...form, tanggalBerakhirVertrag: e.target.value})} className="w-full border-gray-300 rounded text-sm py-2 px-3 border" /></div>
                    <div><label className="block text-xs font-medium text-gray-600 mb-1">Pengajuan Visa</label><input type="date" value={form.tanggalPengajuanVisa} onChange={e => setForm({...form, tanggalPengajuanVisa: e.target.value})} className="w-full border-gray-300 rounded text-sm py-2 px-3 border" /></div>
                    <div><label className="block text-xs font-medium text-gray-600 mb-1">Wawancara Visa</label><input type="date" value={form.tanggalWawancaraVisa} onChange={e => setForm({...form, tanggalWawancaraVisa: e.target.value})} className="w-full border-gray-300 rounded text-sm py-2 px-3 border" /></div>
                    <div><label className="block text-xs font-medium text-gray-600 mb-1">Approved Visa</label><input type="date" value={form.tanggalApprovedVisa} onChange={e => setForm({...form, tanggalApprovedVisa: e.target.value})} className="w-full border-gray-300 rounded text-sm py-2 px-3 border" /></div>
                    <div><label className="block text-xs font-medium text-gray-600 mb-1">Keberangkatan</label><input type="date" value={form.tanggalKeberangkatan} onChange={e => setForm({...form, tanggalKeberangkatan: e.target.value})} className="w-full border-gray-300 rounded text-sm py-2 px-3 border" /></div>
                  </div>

                  <h5 className="text-sm font-semibold text-gray-700 mt-6 mb-3 border-b pb-1">Upload Dokumen</h5>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <FileUploadField label="Visa" field="uploadVisa" />
                    <FileUploadField label="Kontrak Kerja" field="uploadKontrakKerja" />
                    <FileUploadField label="Krankenversicherung" field="uploadKrankenversicherung" />
                    <FileUploadField label="Rahmenplan" field="uploadRahmenplan" />
                    <FileUploadField label="Dokumen Lainnya" field="uploadDokumenLain" />
                  </div>

                  <div className="flex justify-end space-x-3 mt-6 pt-4 border-t">
                    <button onClick={() => setEditingId(null)} className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md transition-colors">Batal</button>
                    <button onClick={() => handleSave(siswa.id)} disabled={loading} className="px-4 py-2 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center transition-colors">
                      {loading && <Loader2 className="h-4 w-4 mr-2 animate-spin" />} Simpan Data
                    </button>
                  </div>
                </div>
              ) : (
                <div className="relative h-full flex flex-col justify-between">
                  <button onClick={() => handleEdit(siswa)} className="absolute top-0 right-0 p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                    <Edit className="h-4 w-4" />
                  </button>
                  
                  {siswa.dataAlumni ? (
                    <div className="space-y-6">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-6">
                        {siswa.dataAlumni.perusahaan && (
                          <div>
                            <div className="text-gray-500 text-xs mb-0.5">Perusahaan</div>
                            <div className="font-medium text-gray-900">{siswa.dataAlumni.perusahaan}</div>
                          </div>
                        )}
                        {siswa.dataAlumni.posisiJurusan && (
                          <div>
                            <div className="text-gray-500 text-xs mb-0.5">Posisi / Jurusan</div>
                            <div className="font-medium text-gray-900">{siswa.dataAlumni.posisiJurusan}</div>
                          </div>
                        )}
                        {(siswa.dataAlumni.kota || siswa.dataAlumni.bundesland) && (
                          <div>
                            <div className="text-gray-500 text-xs mb-0.5">Lokasi</div>
                            <div className="font-medium text-gray-900">{[siswa.dataAlumni.kota, siswa.dataAlumni.bundesland].filter(Boolean).join(', ')}</div>
                          </div>
                        )}
                      </div>

                      <div className="border-t border-gray-100 pt-4">
                        <div className="text-sm font-semibold text-gray-700 mb-3">Jadwal & Tanggal Penting</div>
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-y-3 gap-x-4 text-sm">
                          <div><span className="block text-xs text-gray-500">Mulai Vertrag</span>{siswa.dataAlumni.tanggalMulaiVertrag ? new Date(siswa.dataAlumni.tanggalMulaiVertrag).toLocaleDateString('id-ID') : '-'}</div>
                          <div><span className="block text-xs text-gray-500">Wawancara Visa</span>{siswa.dataAlumni.tanggalWawancaraVisa ? new Date(siswa.dataAlumni.tanggalWawancaraVisa).toLocaleDateString('id-ID') : '-'}</div>
                          <div><span className="block text-xs text-gray-500">Keberangkatan</span>{siswa.dataAlumni.tanggalKeberangkatan ? new Date(siswa.dataAlumni.tanggalKeberangkatan).toLocaleDateString('id-ID') : '-'}</div>
                        </div>
                      </div>

                      <div className="border-t border-gray-100 pt-4">
                        <div className="text-sm font-semibold text-gray-700 mb-3">Dokumen Tersimpan</div>
                        <div className="flex flex-wrap gap-3">
                          {siswa.dataAlumni.uploadVisa && <a href={siswa.dataAlumni.uploadVisa} target="_blank" rel="noreferrer" className="inline-flex items-center text-xs font-medium text-blue-600 bg-blue-50 px-2.5 py-1.5 rounded hover:bg-blue-100 transition-colors"><FileText className="h-3.5 w-3.5 mr-1.5" /> Visa</a>}
                          {siswa.dataAlumni.uploadKontrakKerja && <a href={siswa.dataAlumni.uploadKontrakKerja} target="_blank" rel="noreferrer" className="inline-flex items-center text-xs font-medium text-blue-600 bg-blue-50 px-2.5 py-1.5 rounded hover:bg-blue-100 transition-colors"><FileText className="h-3.5 w-3.5 mr-1.5" /> Kontrak Kerja</a>}
                          {siswa.dataAlumni.uploadKrankenversicherung && <a href={siswa.dataAlumni.uploadKrankenversicherung} target="_blank" rel="noreferrer" className="inline-flex items-center text-xs font-medium text-blue-600 bg-blue-50 px-2.5 py-1.5 rounded hover:bg-blue-100 transition-colors"><FileText className="h-3.5 w-3.5 mr-1.5" /> Asuransi</a>}
                          {siswa.dataAlumni.uploadRahmenplan && <a href={siswa.dataAlumni.uploadRahmenplan} target="_blank" rel="noreferrer" className="inline-flex items-center text-xs font-medium text-blue-600 bg-blue-50 px-2.5 py-1.5 rounded hover:bg-blue-100 transition-colors"><FileText className="h-3.5 w-3.5 mr-1.5" /> Rahmenplan</a>}
                          {siswa.dataAlumni.uploadDokumenLain && <a href={siswa.dataAlumni.uploadDokumenLain} target="_blank" rel="noreferrer" className="inline-flex items-center text-xs font-medium text-blue-600 bg-blue-50 px-2.5 py-1.5 rounded hover:bg-blue-100 transition-colors"><FileText className="h-3.5 w-3.5 mr-1.5" /> Lainnya</a>}
                          {!siswa.dataAlumni.uploadVisa && !siswa.dataAlumni.uploadKontrakKerja && !siswa.dataAlumni.uploadKrankenversicherung && !siswa.dataAlumni.uploadRahmenplan && !siswa.dataAlumni.uploadDokumenLain && (
                            <span className="text-xs text-gray-400 italic">Belum ada dokumen yang diunggah</span>
                          )}
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center h-full text-center py-8">
                      <div className="bg-gray-100 p-3 rounded-full mb-3">
                        <GraduationCap className="h-6 w-6 text-gray-400" />
                      </div>
                      <p className="text-gray-500 text-sm mb-4">Data alumni belum dilengkapi.</p>
                      <button onClick={() => handleEdit(siswa)} className="text-sm font-medium text-blue-600 hover:text-blue-700">
                        + Lengkapi Data
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        ))}

        {data.length === 0 && (
          <div className="bg-white rounded-xl border border-gray-200 p-12 text-center text-gray-500">
            Belum ada siswa dengan status Alumni. Ubah Tahapan Admission siswa menjadi &quot;Alumni&quot; terlebih dahulu.
          </div>
        )}
      </div>
    </div>
  );
}
