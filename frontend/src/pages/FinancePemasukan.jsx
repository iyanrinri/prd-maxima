import React from 'react';

const FinancePemasukan = () => {
  return (
    <div>
      <h1 className="page-title">Rekonsiliasi Pembayaran Masuk</h1>
      <div className="table-container">
        <h3 className="table-title">Mutasi Otomatis Payment Gateway</h3>
        <div style={{padding: '1rem', background: '#DBEAFE', color: '#1E40AF', fontSize: '0.9rem', borderBottom:'1px solid #E5E7EB'}}>
          Transaksi dari portal siswa (QRIS/VA) otomatis memotong tagihan (*Auto-reconcile*).
        </div>
        <table>
          <thead>
            <tr>
              <th>Tanggal Bayar</th>
              <th>Ref. Transaksi</th>
              <th>Siswa</th>
              <th>Keterangan Tagihan</th>
              <th>Nominal Masuk</th>
              <th>Metode</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>14 Nov 2023 10:05</td>
              <td>TRX-00192</td>
              <td>Sarah Jenkins</td>
              <td>Cicilan 2 (Parsial)</td>
              <td>Rp 4.000.000</td>
              <td><span className="badge badge-info">VA Mandiri</span></td>
            </tr>
            <tr>
              <td>13 Nov 2023 15:30</td>
              <td>TRX-00191</td>
              <td>Ahmad Bustomi</td>
              <td>Down Payment</td>
              <td>Rp 5.000.000</td>
              <td><span className="badge badge-success">QRIS</span></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default FinancePemasukan;
