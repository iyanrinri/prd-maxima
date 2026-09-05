import React from 'react';
import { getFullSiswaData } from '../data/mockDatabase';

const SiswaPembayaran = () => {
  const siswa = getFullSiswaData().find(s => s.id === 1);

  if (!siswa) return <div>Data tidak ditemukan</div>;

  return (
    <div>
      <h1 className="page-title">Manajemen Pembayaran (FR-5.2)</h1>
      <div className="table-container">
        <h3 className="table-title">Jadwal & Riwayat Tagihan (FR-5.2.2 & FR-5.2.4)</h3>
        <div style={{padding: '1rem', background: '#DBEAFE', color: '#1E40AF', fontSize: '0.9rem', borderBottom:'1px solid #E5E7EB'}}>
          <strong>Total Biaya Layanan:</strong> Rp {siswa.totalHargaIDR.toLocaleString('id-ID')} | <strong>Sudah Dibayar:</strong> Rp {siswa.dibayarIDR.toLocaleString('id-ID')} | <strong>Kekurangan:</strong> Rp {siswa.kekuranganIDR.toLocaleString('id-ID')}
        </div>
        <table>
          <thead>
            <tr>
              <th>Tahapan Tagihan</th>
              <th>Nominal</th>
              <th>Tanggal Transaksi / Jatuh Tempo</th>
              <th>Status</th>
              <th>Metode Gateway (FR-5.2.3)</th>
              <th>Invoice (FR-5.2.5)</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>DP (Down Payment)</td>
              <td>Rp {siswa.dibayarIDR.toLocaleString('id-ID')}</td>
              <td>{siswa.tanggalDP}</td>
              <td><span className="badge badge-success">Lunas</span></td>
              <td>Transfer Manual</td>
              <td><button style={{border:'none', background:'none', color:'var(--primary)', cursor:'pointer'}}>Unduh PDF</button></td>
            </tr>
            {siswa.kekuranganIDR > 0 && (
              <tr>
                <td style={{fontWeight: 600}}>Sisa Tagihan (Piutang)</td>
                <td style={{fontWeight: 600}}>Rp {siswa.kekuranganIDR.toLocaleString('id-ID')}</td>
                <td style={{fontWeight: 600}}>-</td>
                <td><span className="badge badge-warning">Sisa: Rp {siswa.kekuranganIDR.toLocaleString('id-ID')}</span></td>
                <td>
                  <button style={{border:'none', background:'var(--primary)', color:'white', padding:'4px 8px', borderRadius:'4px', cursor:'pointer', fontWeight: 600}}>Bayar QRIS/VA</button>
                </td>
                <td>-</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SiswaPembayaran;
