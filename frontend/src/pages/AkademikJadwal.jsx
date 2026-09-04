import React from 'react';

const AkademikJadwal = () => {
  return (
    <div>
      <h1 className="page-title">Manajemen Penjadwalan Kelas</h1>
      <div className="table-container">
        <h3 className="table-title">Master Penjadwalan Akademik (FR-3.3)</h3>
        <table>
          <thead>
            <tr>
              <th>Nama Kelas</th>
              <th>Level</th>
              <th>Pengajar (Teacher)</th>
              <th>Jadwal Kelas</th>
              <th>Status</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Berlin Pagi</td>
              <td>A1</td>
              <td>Herr Thomas</td>
              <td>Senin - Jumat, 08:00</td>
              <td><span className="badge badge-success">Berjalan Aktif</span></td>
              <td><button style={{border:'none', background:'none', color:'var(--primary)', cursor:'pointer'}}>Ganti Pengajar</button></td>
            </tr>
            <tr>
              <td>München Sore</td>
              <td>B1</td>
              <td>Frau Lena (Sakit)</td>
              <td>Senin - Jumat, 15:00</td>
              <td><span className="badge badge-warning">Butuh Pengganti</span></td>
              <td><button style={{border:'none', background:'var(--primary)', color:'white', padding:'4px 8px', borderRadius:'4px', cursor:'pointer'}}>Plot Pengganti</button></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AkademikJadwal;
