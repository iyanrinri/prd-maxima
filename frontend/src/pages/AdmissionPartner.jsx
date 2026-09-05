import React from 'react';
import { getFullSiswaData } from '../data/mockDatabase';

const AdmissionPartner = () => {
  const siswaData = getFullSiswaData().filter(s => s.tracking);

  return (
    <div>
      <h1 className="page-title">Tracking Partner & Wawancara (Admission)</h1>
      <div className="table-container">
        <h3 className="table-title">Tabel Tracking Partner (FR-4.3)</h3>
        <div style={{padding: '1rem', background: '#FEF3C7', color: '#92400E', fontSize: '0.9rem', borderBottom: '1px solid #E5E7EB'}}>
          <strong>Info Gatekeeper:</strong> Tombol aksi proses partner akan non-aktif (disabled) jika siswa belum melunasi biaya layanan (Gatekeeper dari Finance).
        </div>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ whiteSpace: 'nowrap' }}>
            <thead>
              <tr>
                <th>Nama Siswa</th>
                <th>Finance</th>
                <th>Posisi Dilamar</th>
                <th>Wawancara Ke</th>
                <th>Tgl Latihan</th>
                <th>Partner Diproses</th>
                <th>Status (Gagal)</th>
                <th>Partner Terakhir</th>
                <th>Progres Terakhir</th>
                <th>Update</th>
                <th>Aksi Layanan</th>
              </tr>
            </thead>
            <tbody>
              {siswaData.map(s => {
                const isLocked = s.statusPembayaran !== 'Lunas';
                return (
                  <tr key={s.id} style={{opacity: isLocked ? 0.6 : 1}}>
                    <td style={{fontWeight: 500}}>{s.namaLengkap}</td>
                    <td>{isLocked ? <span className="badge badge-danger">Locked</span> : <span className="badge badge-success">Unlocked</span>}</td>
                    <td>{s.tracking.posisiDilamar}</td>
                    <td>{s.tracking.wawancaraKe}</td>
                    <td>{s.tracking.tanggalLatihan}</td>
                    <td>{s.tracking.partnerDiproses} ({s.tracking.jumlahDiproses} dikirim)</td>
                    <td><span className="badge badge-warning">{s.tracking.jumlahGagal} Gagal</span></td>
                    <td>{s.tracking.partnerTerakhir}</td>
                    <td><span className="badge badge-info">{s.tracking.progresTerakhir}</span></td>
                    <td>{s.tracking.updateTerakhir}</td>
                    <td>
                      <button 
                        disabled={isLocked}
                        onClick={() => alert(`Memulai proses pencarian partner untuk ${s.namaLengkap}.`)}
                        style={{
                          padding: '4px 8px', 
                          background: isLocked ? '#ccc' : 'var(--primary)', 
                          color: 'white', border: 'none', borderRadius: '4px', 
                          cursor: isLocked ? 'not-allowed' : 'pointer'
                        }}
                      >
                        {isLocked ? 'Menunggu Finance' : 'Proses Partner'}
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdmissionPartner;
