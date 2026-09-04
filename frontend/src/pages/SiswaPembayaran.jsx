import React from 'react';

const SiswaPembayaran = () => {
  return (
    <div>
      <h1 className="page-title">Manajemen Pembayaran (FR-5.2)</h1>
      <div className="table-container">
        <h3 className="table-title">Jadwal & Riwayat Tagihan (FR-5.2.2 & FR-5.2.4)</h3>
        <table>
          <thead>
            <tr>
              <th>Tahapan Tagihan</th>
              <th>Nominal</th>
              <th>Jatuh Tempo</th>
              <th>Status</th>
              <th>Metode Gateway (FR-5.2.3)</th>
              <th>Invoice (FR-5.2.5)</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>DP (Down Payment)</td>
              <td>Rp 5.000.000</td>
              <td>01 Ags 2023</td>
              <td><span className="badge badge-success">Lunas</span></td>
              <td>VA Mandiri</td>
              <td><button style={{border:'none', background:'none', color:'var(--primary)', cursor:'pointer'}}>Unduh PDF</button></td>
            </tr>
            <tr>
              <td>Cicilan Ke-1</td>
              <td>Rp 8.000.000</td>
              <td>15 Sep 2023</td>
              <td><span className="badge badge-success">Lunas</span></td>
              <td>Transfer Manual</td>
              <td><button style={{border:'none', background:'none', color:'var(--primary)', cursor:'pointer'}}>Unduh PDF</button></td>
            </tr>
            <tr>
              <td style={{fontWeight: 600}}>Cicilan Ke-2</td>
              <td style={{fontWeight: 600}}>Rp 8.000.000</td>
              <td style={{fontWeight: 600}}>15 Nov 2023</td>
              <td><span className="badge badge-warning">Sisa: Rp 4.000.000</span></td>
              <td>
                <button style={{border:'none', background:'var(--primary)', color:'white', padding:'4px 8px', borderRadius:'4px', cursor:'pointer', fontWeight: 600}}>Bayar QRIS/VA</button>
              </td>
              <td>-</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SiswaPembayaran;
