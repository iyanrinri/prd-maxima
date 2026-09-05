import React from 'react';
import { getFullSiswaData } from '../data/mockDatabase';

const DashboardAkademik = () => {
  const siswaData = getFullSiswaData().filter(s => s.akademik);

  return (
    <div>
      <h1 className="page-title">Dashboard Kepala Akademik</h1>
      
      <div className="dashboard-grid">
        <div className="glass-card">
          <div className="metric-label">Total Siswa Aktif</div>
          <div className="metric-value">450</div>
          <div style={{color: '#10B981', fontSize: '0.9rem'}}>Tersebar di 3 Cabang</div>
        </div>
        <div className="glass-card">
          <div className="metric-label">Kelas Aktif Berjalan</div>
          <div className="metric-value">24</div>
          <div style={{color: '#6B7280', fontSize: '0.9rem'}}>Pengajar Aktif: 12 Orang</div>
        </div>
      </div>
      
      <div className="table-container" style={{ marginTop: '2rem' }}>
        <h3 className="table-title">Tabel Progres Akademik Siswa</h3>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ whiteSpace: 'nowrap' }}>
            <thead>
              <tr>
                <th>No Kontrak</th>
                <th>Nama Siswa</th>
                <th>Kehadiran</th>
                <th>Level A1</th>
                <th>Level A2</th>
                <th>Level B1</th>
                <th>Level B2</th>
                <th>Rekomendasi B1</th>
              </tr>
            </thead>
            <tbody>
              {siswaData.map(siswa => (
                <tr key={siswa.id}>
                  <td style={{fontWeight: 600}}>{siswa.noKontrak}</td>
                  <td>{siswa.namaLengkap}</td>
                  <td>{siswa.akademik.kehadiran}</td>
                  <td><span className={`badge ${siswa.akademik.tingkatA1 === 'Lulus' ? 'badge-success' : 'badge-warning'}`}>{siswa.akademik.tingkatA1}</span></td>
                  <td><span className={`badge ${siswa.akademik.tingkatA2 === 'Lulus' ? 'badge-success' : 'badge-warning'}`}>{siswa.akademik.tingkatA2}</span></td>
                  <td><span className={`badge ${siswa.akademik.tingkatB1 === 'Lulus' ? 'badge-success' : 'badge-warning'}`}>{siswa.akademik.tingkatB1}</span></td>
                  <td><span className={`badge ${siswa.akademik.tingkatB2 === 'Lulus' ? 'badge-success' : 'badge-danger'}`}>{siswa.akademik.tingkatB2}</span></td>
                  <td>{siswa.akademik.rekomendasiB1}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DashboardAkademik;
