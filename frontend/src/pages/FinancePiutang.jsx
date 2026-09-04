import React from 'react';

const FinancePiutang = () => {
  return (
    <div>
      <h1 className="page-title">Manajemen Piutang & Penagihan</h1>
      <div className="table-container">
        <h3 className="table-title">Pemantauan Piutang & Reminder (FR-2.4)</h3>
        <table>
          <thead>
            <tr>
              <th>Nama Siswa</th>
              <th>Total Tunggakan</th>
              <th>Jatuh Tempo</th>
              <th>Status Bot Reminder</th>
              <th>Gatekeeper (Akses Siswa)</th>
              <th>Aksi Manual</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Siti Aminah</td>
              <td>Rp 8.000.000</td>
              <td>15 Nov 2023</td>
              <td><span className="badge badge-warning">H-1 Sent</span></td>
              <td><span className="badge badge-success">Aman</span></td>
              <td><button style={{border:'none', background:'var(--primary)', color:'white', padding:'4px 8px', borderRadius:'4px', cursor:'pointer'}}>WA Manual</button></td>
            </tr>
            <tr>
              <td>Riko Kurniawan</td>
              <td>Rp 12.000.000</td>
              <td>30 Okt 2023</td>
              <td><span className="badge badge-danger">H+14 Lewat Batas</span></td>
              <td><span className="badge badge-danger">Diblokir (Suspended)</span></td>
              <td><button style={{border:'none', background:'var(--primary)', color:'white', padding:'4px 8px', borderRadius:'4px', cursor:'pointer'}}>Buka Akses</button></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default FinancePiutang;
