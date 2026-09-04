import React from 'react';
import { MOCK_STUDENTS } from '../data/mockAdmission';

const AdmissionUjian = () => {
  return (
    <div>
      <h1 className="page-title">Ujian & Sertifikat</h1>
      <div className="table-container">
        <h3 className="table-title">Manajemen Ujian & Sertifikat (FR-4.2)</h3>
        <table>
          <thead>
            <tr>
              <th>Nama Siswa</th>
              <th>Sertifikat Target</th>
              <th>Status Ujian</th>
              <th>Lesen</th>
              <th>Hören</th>
              <th>Schreiben</th>
              <th>Sprechen</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {MOCK_STUDENTS.map(s => (
              <tr key={s.id}>
                <td style={{fontWeight: 500}}>{s.name}</td>
                <td><span className="badge badge-info">{s.sertifikat.level}</span></td>
                <td>
                  {s.sertifikat.status === 'Lulus' ? <span className="badge badge-success">Lulus</span> : 
                   s.sertifikat.status === 'Terdaftar Ujian' ? <span className="badge badge-warning">Jadwal: 15 Nov</span> :
                   <span className="badge badge-danger">Belum Siap</span>}
                </td>
                <td>{s.sertifikat.lesen || '-'}</td>
                <td>{s.sertifikat.horen || '-'}</td>
                <td>{s.sertifikat.schreiben || '-'}</td>
                <td>{s.sertifikat.sprechen || '-'}</td>
                <td>
                  <button style={{padding: '4px 8px', background: 'var(--primary)', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer'}}>
                    Update Nilai
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdmissionUjian;
