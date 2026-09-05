import React from 'react';
import { getFullSiswaData } from '../data/mockDatabase';

const AdmissionUjian = () => {
  const siswaData = getFullSiswaData().filter(s => s.sertifikasi);

  return (
    <div>
      <h1 className="page-title">Sertifikasi & Nilai Ujian Bahasa (Admission)</h1>
      <div className="table-container">
        <h3 className="table-title">Tabel Sertifikasi & Nilai Ujian Bahasa (FR-4.2)</h3>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ whiteSpace: 'nowrap' }}>
            <thead>
              <tr>
                <th>Nama Siswa</th>
                <th>Keterangan Ujian</th>
                <th>Jenis Sertifikat</th>
                <th>Level Sertifikat</th>
                <th>Lesen (Exp)</th>
                <th>Hören (Exp)</th>
                <th>Schreiben (Exp)</th>
                <th>Sprechen (Exp)</th>
                <th>Aksi</th>
              </tr>
            </thead>
            <tbody>
              {siswaData.map(s => (
                <tr key={s.id}>
                  <td style={{fontWeight: 500}}>{s.namaLengkap}</td>
                  <td>
                    <span className={`badge ${s.sertifikasi.keteranganUjian === 'Sudah Punya' ? 'badge-success' : 'badge-warning'}`}>
                      {s.sertifikasi.keteranganUjian}
                    </span>
                  </td>
                  <td>{s.sertifikasi.jenisSertifikat}</td>
                  <td><span className="badge badge-info">{s.sertifikasi.levelSertifikat}</span></td>
                  <td>{s.sertifikasi.skorLesen ? `${s.sertifikasi.skorLesen} (${s.sertifikasi.lesenExpired})` : '-'}</td>
                  <td>{s.sertifikasi.skorHoren ? `${s.sertifikasi.skorHoren} (${s.sertifikasi.horenExpired})` : '-'}</td>
                  <td>{s.sertifikasi.skorSchreiben ? `${s.sertifikasi.skorSchreiben} (${s.sertifikasi.schreibenExpired})` : '-'}</td>
                  <td>{s.sertifikasi.skorSprechen ? `${s.sertifikasi.skorSprechen} (${s.sertifikasi.sprechenExpired})` : '-'}</td>
                  <td>
                    <button style={{padding: '4px 8px', background: 'var(--primary)', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer'}}>
                      Update Nilai
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdmissionUjian;
