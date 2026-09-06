'use client';

import { useState } from 'react';
import { updateAbsensi, updateNilai, updateProgressBab } from './actions';

export function KelasDetailClient({ kelas, siswaList }: { kelas: any, siswaList: any[] }) {
  const [activeTab, setActiveTab] = useState('absensi');
  const [progresBab, setProgresBab] = useState(kelas.bab || 1);
  const [savingStatus, setSavingStatus] = useState<Record<string, boolean>>({});

  const handleUpdateBab = async () => {
    await updateProgressBab(kelas.id, progresBab);
    alert('Progress Bab berhasil diupdate!');
  };

  const handleKehadiran = async (siswaId: string, status: string) => {
    setSavingStatus(prev => ({ ...prev, [siswaId + 'absen']: true }));
    await updateAbsensi(siswaId, kelas.id, status);
    setSavingStatus(prev => ({ ...prev, [siswaId + 'absen']: false }));
  };

  const handleSimpanNilai = async (e: React.FormEvent<HTMLFormElement>, siswaId: string) => {
    e.preventDefault();
    setSavingStatus(prev => ({ ...prev, [siswaId + 'nilai']: true }));
    const formData = new FormData(e.currentTarget);
    formData.append('siswaId', siswaId);
    formData.append('kelasLevel', kelas.level);
    await updateNilai(formData);
    setSavingStatus(prev => ({ ...prev, [siswaId + 'nilai']: false }));
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-start">
        <div>
          <div className="flex items-center space-x-3">
            <h1 className="text-2xl font-bold text-slate-900">{kelas.nama}</h1>
            <span className="px-2.5 py-1 text-xs font-medium bg-emerald-100 text-emerald-800 rounded-full">Level {kelas.level}</span>
          </div>
          <p className="text-slate-500 mt-1">Sesi Reguler • Berjalan</p>
        </div>
        <div className="flex items-center space-x-3 bg-white p-2 rounded-lg border border-slate-200 shadow-sm">
          <span className="text-sm text-slate-500 pl-2">Progres Materi: Bab</span>
          <input 
            type="number" 
            value={progresBab} 
            onChange={(e) => setProgresBab(parseInt(e.target.value) || 1)}
            className="w-16 px-2 py-1 border border-slate-300 rounded-md text-center"
          />
          <button onClick={handleUpdateBab} className="bg-emerald-600 text-white px-3 py-1.5 rounded-md text-sm font-medium hover:bg-emerald-700 transition">Update</button>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="flex border-b border-slate-200 bg-slate-50">
          <button 
            className={`px-6 py-4 text-sm font-medium ${activeTab === 'absensi' ? 'border-b-2 border-emerald-600 text-emerald-700 bg-white' : 'text-slate-500 hover:text-slate-700'}`}
            onClick={() => setActiveTab('absensi')}
          >
            Input Absensi
          </button>
          <button 
            className={`px-6 py-4 text-sm font-medium ${activeTab === 'nilai' ? 'border-b-2 border-emerald-600 text-emerald-700 bg-white' : 'text-slate-500 hover:text-slate-700'}`}
            onClick={() => setActiveTab('nilai')}
          >
            Input Nilai (Raport)
          </button>
        </div>

        <div className="p-0">
          {activeTab === 'absensi' && (
            <table className="w-full text-left text-sm">
              <thead className="bg-white text-slate-500 border-b">
                <tr>
                  <th className="px-6 py-3 font-medium">Nama Siswa</th>
                  <th className="px-6 py-3 font-medium">Status Kehadiran Terakhir</th>
                  <th className="px-6 py-3 font-medium">Ubah Status Hari Ini</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {siswaList.map(s => {
                  const lastAbsen = s.kehadirans[s.kehadirans.length - 1]?.status || 'Belum ada';
                  return (
                    <tr key={s.id} className="hover:bg-slate-50">
                      <td className="px-6 py-4 font-medium text-slate-900">{s.namaLengkap}</td>
                      <td className="px-6 py-4 text-slate-500">{lastAbsen}</td>
                      <td className="px-6 py-4">
                        <div className="flex space-x-2">
                          {['Hadir', 'Izin', 'Sakit', 'Alpha', 'Terlambat'].map(status => (
                            <button 
                              key={status}
                              onClick={() => handleKehadiran(s.id, status)}
                              disabled={savingStatus[s.id + 'absen']}
                              className={`px-3 py-1.5 text-xs font-medium rounded-md border transition ${lastAbsen === status ? 'bg-emerald-600 text-white border-emerald-600' : 'bg-white text-slate-600 border-slate-300 hover:bg-slate-50'}`}
                            >
                              {savingStatus[s.id + 'absen'] ? '...' : status}
                            </button>
                          ))}
                        </div>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          )}

          {activeTab === 'nilai' && (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="bg-white text-slate-500 border-b">
                  <tr>
                    <th className="px-6 py-3 font-medium">Nama Siswa</th>
                    <th className="px-4 py-3 font-medium text-center w-24">Bab Ke-</th>
                    <th className="px-4 py-3 font-medium text-center w-20">Lesen</th>
                    <th className="px-4 py-3 font-medium text-center w-20">Hören</th>
                    <th className="px-4 py-3 font-medium text-center w-20">Schreiben</th>
                    <th className="px-4 py-3 font-medium text-center w-20">Sprechen</th>
                    <th className="px-6 py-3 font-medium">Catatan (Raport)</th>
                    <th className="px-6 py-3 font-medium w-24">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {siswaList.map(s => {
                    const lastNilai = s.nilais[s.nilais.length - 1] || {};
                    return (
                      <tr key={s.id} className="hover:bg-slate-50">
                        <td className="px-6 py-4 font-medium text-slate-900">{s.namaLengkap}</td>
                        <td colSpan={7} className="p-0">
                          <form onSubmit={(e) => handleSimpanNilai(e, s.id)} className="flex w-full">
                            <div className="px-4 py-4 w-24 flex items-center justify-center border-l border-slate-100"><input name="bab" type="number" defaultValue={lastNilai.bab || progresBab} className="w-16 px-2 py-1 border border-slate-300 rounded text-center bg-slate-50" /></div>
                            <div className="px-4 py-4 w-20 flex items-center justify-center border-l border-slate-100"><input name="lesen" type="number" defaultValue={lastNilai.lesen || 0} className="w-16 px-2 py-1 border border-slate-300 rounded text-center" /></div>
                            <div className="px-4 py-4 w-20 flex items-center justify-center border-l border-slate-100"><input name="horen" type="number" defaultValue={lastNilai.horen || 0} className="w-16 px-2 py-1 border border-slate-300 rounded text-center" /></div>
                            <div className="px-4 py-4 w-20 flex items-center justify-center border-l border-slate-100"><input name="schreiben" type="number" defaultValue={lastNilai.schreiben || 0} className="w-16 px-2 py-1 border border-slate-300 rounded text-center" /></div>
                            <div className="px-4 py-4 w-20 flex items-center justify-center border-l border-slate-100"><input name="sprechen" type="number" defaultValue={lastNilai.sprechen || 0} className="w-16 px-2 py-1 border border-slate-300 rounded text-center" /></div>
                            <div className="px-6 py-4 flex-1 border-l border-slate-100"><input name="catatan" type="text" placeholder="Catatan perkembangan..." className="w-full px-3 py-1 border border-slate-300 rounded" /></div>
                            <div className="px-6 py-4 w-24 flex items-center justify-center border-l border-slate-100">
                              <button type="submit" disabled={savingStatus[s.id + 'nilai']} className="bg-emerald-100 text-emerald-700 px-3 py-1 rounded text-xs font-medium hover:bg-emerald-200 disabled:opacity-50">
                                {savingStatus[s.id + 'nilai'] ? '...' : 'Simpan'}
                              </button>
                            </div>
                          </form>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
