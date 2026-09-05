'use client';

import { useState } from 'react';

export default function DetailKelasPengajarPage({ params }: { params: { id: string } }) {
  const [activeTab, setActiveTab] = useState('absensi');
  const [progresBab, setProgresBab] = useState(4);

  // Mock Data untuk render Client Component
  const mockSiswa = [
    { id: '1', nama: 'Riska Mustikawati', kehadiran: 'Hadir', nilai: { lesen: 80, horen: 75, schreiben: 85, sprechen: 70 } },
    { id: '2', nama: 'Budi Santoso', kehadiran: 'Alpha', nilai: { lesen: 0, horen: 0, schreiben: 0, sprechen: 0 } },
    { id: '3', nama: 'Siti Aminah', kehadiran: 'Izin', nilai: { lesen: 90, horen: 85, schreiben: 88, sprechen: 80 } },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-start">
        <div>
          <div className="flex items-center space-x-3">
            <h1 className="text-2xl font-bold text-slate-900">Kelas Berlin</h1>
            <span className="px-2.5 py-1 text-xs font-medium bg-emerald-100 text-emerald-800 rounded-full">Level A1</span>
          </div>
          <p className="text-slate-500 mt-1">Sesi Reguler • 08:00 - 10:00 • Berjalan</p>
        </div>
        <div className="flex items-center space-x-3 bg-white p-2 rounded-lg border border-slate-200 shadow-sm">
          <span className="text-sm text-slate-500 pl-2">Progres Materi: Bab</span>
          <input 
            type="number" 
            value={progresBab} 
            onChange={(e) => setProgresBab(parseInt(e.target.value) || 0)}
            className="w-16 px-2 py-1 border border-slate-300 rounded-md text-center"
          />
          <button className="bg-emerald-600 text-white px-3 py-1.5 rounded-md text-sm font-medium hover:bg-emerald-700 transition">Update</button>
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
          <button 
            className={`px-6 py-4 text-sm font-medium ${activeTab === 'tugas' ? 'border-b-2 border-emerald-600 text-emerald-700 bg-white' : 'text-slate-500 hover:text-slate-700'}`}
            onClick={() => setActiveTab('tugas')}
          >
            Tugas Harian
          </button>
        </div>

        <div className="p-0">
          {activeTab === 'absensi' && (
            <table className="w-full text-left text-sm">
              <thead className="bg-white text-slate-500 border-b">
                <tr>
                  <th className="px-6 py-3 font-medium">Nama Siswa</th>
                  <th className="px-6 py-3 font-medium">Status Kehadiran Hari Ini</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {mockSiswa.map(s => (
                  <tr key={s.id} className="hover:bg-slate-50">
                    <td className="px-6 py-4 font-medium text-slate-900">{s.nama}</td>
                    <td className="px-6 py-4">
                      <div className="flex space-x-2">
                        {['Hadir', 'Izin', 'Sakit', 'Alpha', 'Terlambat'].map(status => (
                          <button 
                            key={status}
                            className={`px-3 py-1.5 text-xs font-medium rounded-md border transition ${s.kehadiran === status ? 'bg-emerald-600 text-white border-emerald-600' : 'bg-white text-slate-600 border-slate-300 hover:bg-slate-50'}`}
                          >
                            {status}
                          </button>
                        ))}
                      </div>
                    </td>
                  </tr>
                ))}
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
                    <th className="px-6 py-3 font-medium">Catatan Raport</th>
                    <th className="px-6 py-3 font-medium w-24">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {mockSiswa.map(s => (
                    <tr key={s.id} className="hover:bg-slate-50">
                      <td className="px-6 py-4 font-medium text-slate-900">{s.nama}</td>
                      <td className="px-4 py-4"><input type="number" defaultValue={progresBab} className="w-16 px-2 py-1 border border-slate-300 rounded text-center bg-slate-50" /></td>
                      <td className="px-4 py-4"><input type="number" defaultValue={s.nilai.lesen} className="w-16 px-2 py-1 border border-slate-300 rounded text-center" /></td>
                      <td className="px-4 py-4"><input type="number" defaultValue={s.nilai.horen} className="w-16 px-2 py-1 border border-slate-300 rounded text-center" /></td>
                      <td className="px-4 py-4"><input type="number" defaultValue={s.nilai.schreiben} className="w-16 px-2 py-1 border border-slate-300 rounded text-center" /></td>
                      <td className="px-4 py-4"><input type="number" defaultValue={s.nilai.sprechen} className="w-16 px-2 py-1 border border-slate-300 rounded text-center" /></td>
                      <td className="px-6 py-4"><input type="text" placeholder="Catatan perkembangan..." className="w-full px-3 py-1 border border-slate-300 rounded" /></td>
                      <td className="px-6 py-4"><button className="bg-emerald-100 text-emerald-700 px-3 py-1 rounded text-xs font-medium hover:bg-emerald-200">Simpan</button></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {activeTab === 'tugas' && (
            <div className="p-8 text-center text-slate-500">
              <p>Formulir penugasan harian sedang dalam tahap pengembangan MVP.</p>
            </div>
          )}

        </div>
        <div className="px-6 py-4 border-t border-slate-200 bg-slate-50 flex justify-end">
          <button className="bg-emerald-600 text-white px-6 py-2 rounded-lg font-medium shadow-sm hover:bg-emerald-700 transition">
            Simpan Semua Data Kelas
          </button>
        </div>
      </div>
    </div>
  );
}
