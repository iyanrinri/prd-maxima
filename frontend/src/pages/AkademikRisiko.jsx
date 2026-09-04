import React from 'react';

const AkademikRisiko = () => {
  return (
    <div>
      <h1 className="page-title">Sistem Peringatan Siswa Berisiko</h1>
      <div className="table-container">
        <h3 className="table-title" style={{color: '#EF4444'}}>Manajemen Siswa Berisiko (Risk Alert) - FR-3.2</h3>
        <div style={{padding: '1rem', background: '#FEE2E2', color: '#991B1B', fontSize: '0.9rem', borderBottom:'1px solid #E5E7EB'}}>
          Sistem mendeteksi otomatis siswa di bawah ini karena **Tingkat Kehadiran Rendah** atau **Nilai Gagal Evaluasi**. Segera jadwalkan sesi konseling akademik.
        </div>
        <table>
          <thead>
            <tr>
              <th>Nama Siswa</th>
              <th>Kelas</th>
              <th>Alasan Peringatan</th>
              <th>Tingkat Risiko</th>
              <th>Catatan Intervensi</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Dian Sastro</td>
              <td>A2 - Berlin</td>
              <td>Kehadiran &lt; 70% (Banyak Alpha)</td>
              <td><span className="badge badge-danger">Kritis</span></td>
              <td><button style={{border:'none', background:'none', color:'var(--primary)', cursor:'pointer', fontWeight:600}}>Input Catatan</button></td>
            </tr>
            <tr>
              <td>Reza Rahadian</td>
              <td>B1 - Munchen</td>
              <td>Gagal Evaluasi Bab 2 (Nilai Lesen 40)</td>
              <td><span className="badge badge-warning">Warning</span></td>
              <td>Sudah Remedial</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AkademikRisiko;
