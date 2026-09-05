import React from 'react';
import { getFullSiswaData } from '../data/mockDatabase';

const SiswaAkademik = () => {
  const siswa = getFullSiswaData().find(s => s.id === 1);

  if (!siswa) return <div>Data tidak ditemukan</div>;

  return (
    <div>
      <h1 className="page-title">Akademik & Pembelajaran (FR-5.3)</h1>
      
      <div className="glass-card" style={{marginBottom: '2rem'}}>
        <h3 style={{marginTop: 0, marginBottom: '1.5rem'}}>Progres Pembelajaran Bahasa (Jerman)</h3>
        <div style={{marginBottom: '1.5rem'}}>
          <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: '0.25rem'}}>
            <span style={{fontWeight: 600}}>Level A1</span>
            <span style={{color: 'var(--text-muted)'}}>Status: {siswa.akademik?.tingkatA1}</span>
          </div>
          <div className="progress-bar"><div className="progress-fill" style={{width: siswa.akademik?.tingkatA1 === 'Lulus' ? '100%' : '50%', backgroundColor: siswa.akademik?.tingkatA1 === 'Lulus' ? '#10B981' : '#F59E0B'}}></div></div>
        </div>
        <div style={{marginBottom: '1.5rem'}}>
          <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: '0.25rem'}}>
            <span style={{fontWeight: 600}}>Level A2</span>
            <span style={{color: 'var(--text-muted)'}}>Status: {siswa.akademik?.tingkatA2}</span>
          </div>
          <div className="progress-bar"><div className="progress-fill" style={{width: siswa.akademik?.tingkatA2 === 'Lulus' ? '100%' : '50%', backgroundColor: siswa.akademik?.tingkatA2 === 'Lulus' ? '#10B981' : '#F59E0B'}}></div></div>
        </div>
        <div>
          <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: '0.25rem'}}>
            <span style={{fontWeight: 600}}>Level B1</span>
            <span style={{color: siswa.akademik?.tingkatB1 === 'Lulus' ? '#10B981' : '#F59E0B', fontWeight: 500}}>Status: {siswa.akademik?.tingkatB1}</span>
          </div>
          <div className="progress-bar"><div className="progress-fill" style={{width: siswa.akademik?.tingkatB1 === 'Lulus' ? '100%' : '50%', backgroundColor: siswa.akademik?.tingkatB1 === 'Lulus' ? '#10B981' : '#F59E0B'}}></div></div>
        </div>
        <div style={{marginTop: '1.5rem'}}>
          <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: '0.25rem'}}>
            <span style={{fontWeight: 600}}>Level B2</span>
            <span style={{color: siswa.akademik?.tingkatB2 === 'Lulus' ? '#10B981' : '#F59E0B', fontWeight: 500}}>Status: {siswa.akademik?.tingkatB2}</span>
          </div>
          <div className="progress-bar"><div className="progress-fill" style={{width: siswa.akademik?.tingkatB2 === 'Lulus' ? '100%' : '50%', backgroundColor: siswa.akademik?.tingkatB2 === 'Lulus' ? '#10B981' : '#F59E0B'}}></div></div>
        </div>
      </div>

      <div className="table-container">
        <h3 className="table-title">Detail Nilai Sertifikat (FR-5.3.5)</h3>
        <table>
          <thead>
            <tr>
              <th>Jenis Ujian</th>
              <th>Level</th>
              <th>Lesen</th>
              <th>Hören</th>
              <th>Schreiben</th>
              <th>Sprechen</th>
              <th>Status Kelulusan</th>
            </tr>
          </thead>
          <tbody>
            {siswa.sertifikasi && (
              <tr>
                <td>{siswa.sertifikasi.jenisSertifikat}</td>
                <td>{siswa.sertifikasi.levelSertifikat}</td>
                <td>{siswa.sertifikasi.skorLesen || '-'}</td>
                <td>{siswa.sertifikasi.skorHoren || '-'}</td>
                <td>{siswa.sertifikasi.skorSchreiben || '-'}</td>
                <td>{siswa.sertifikasi.skorSprechen || '-'}</td>
                <td><span className="badge badge-success">{siswa.sertifikasi.keteranganUjian}</span></td>
              </tr>
            )}
            {!siswa.sertifikasi && (
              <tr>
                <td colSpan="7" style={{textAlign: 'center', padding: '1rem'}}>Belum ada data sertifikat ujian</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SiswaAkademik;
