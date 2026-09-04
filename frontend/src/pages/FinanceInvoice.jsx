import React from 'react';

const FinanceInvoice = () => {
  return (
    <div>
      <h1 className="page-title">Invoice & Tagihan Siswa (FR-2.3)</h1>
      <div className="table-container">
        <h3 className="table-title">Daftar Tagihan Berjalan</h3>
        <table>
          <thead>
            <tr>
              <th>Nama Siswa</th>
              <th>Program / Tahapan</th>
              <th>Jatuh Tempo</th>
              <th>Nominal</th>
              <th>Status</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Sarah Jenkins</td>
              <td>Ausbildung / Cicilan 2</td>
              <td>15 Nov 2023</td>
              <td>Rp 8.000.000</td>
              <td><span className="badge badge-warning">Sebagian</span></td>
              <td><button style={{border:'none', background:'none', color:'var(--primary)', cursor:'pointer', fontWeight: 600}}>Kirim Ulang Invoice</button></td>
            </tr>
            <tr>
              <td>Ahmad Bustomi</td>
              <td>Ausbildung / DP</td>
              <td>02 Nov 2023</td>
              <td>Rp 5.000.000</td>
              <td><span className="badge badge-success">Lunas</span></td>
              <td><button style={{border:'none', background:'none', color:'var(--primary)', cursor:'pointer', fontWeight: 600}}>Cetak Kwitansi</button></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default FinanceInvoice;
