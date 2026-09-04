import React from 'react';
import { MOCK_STUDENTS } from '../data/mockAdmission';

const AdmissionPartner = () => {
  return (
    <div>
      <h1 className="page-title">Layanan Partner & Wawancara</h1>
      <div className="table-container">
        <h3 className="table-title">Pencarian Partner (FR-4.3)</h3>
        <div style={{padding: '1rem', background: '#FEF3C7', color: '#92400E', fontSize: '0.9rem'}}>
          <strong>Info Gatekeeper:</strong> Tombol aksi proses partner akan non-aktif (disabled) jika siswa belum melunasi biaya layanan (Gatekeeper dari Finance).
        </div>
        <table>
          <thead>
            <tr>
              <th>Nama Siswa</th>
              <th>Status Finance</th>
              <th>Sertifikat</th>
              <th>Nama Partner (RS/Perusahaan)</th>
              <th>Status Wawancara</th>
              <th>Aksi Layanan</th>
            </tr>
          </thead>
          <tbody>
            {MOCK_STUDENTS.map(s => {
              const isLocked = s.financeStatus !== 'Lunas';
              return (
                <tr key={s.id} style={{opacity: isLocked ? 0.6 : 1}}>
                  <td style={{fontWeight: 500}}>{s.name}</td>
                  <td>{isLocked ? <span className="badge badge-danger">Locked</span> : <span className="badge badge-success">Unlocked</span>}</td>
                  <td>{s.sertifikat.status === 'Lulus' ? '✔ '+s.sertifikat.level : '✘'}</td>
                  <td>{s.partner.namaRS}</td>
                  <td>{s.partner.statusWawancara}</td>
                  <td>
                    <button 
                      disabled={isLocked}
                      onClick={() => alert(`Memulai proses pencarian partner untuk ${s.name}. Timeline akan terupdate otomatis.`)}
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
  );
};

export default AdmissionPartner;
