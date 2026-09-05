import React from 'react';
import { getFullSiswaData } from '../data/mockDatabase';
import { Plane } from 'lucide-react';

const AdmissionAlumni = () => {
  const siswaData = getFullSiswaData().filter(s => s.alumni);

  return (
    <div>
      <h1 className="page-title">Keberangkatan & Alumni</h1>
      
      <div className="table-container">
        <h3 className="table-title">Data Keberangkatan & Alumni (FR-4.4)</h3>
        <div style={{padding: '1rem', background: '#ECFDF5', color: '#065F46', fontSize: '0.9rem', borderBottom:'1px solid #E5E7EB'}}>
          Daftar ini khusus untuk memonitor siswa yang sudah mendapatkan <strong>Visa Granted</strong> dan jadwal keberangkatan mereka ke Jerman.
        </div>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ whiteSpace: 'nowrap' }}>
            <thead>
              <tr>
                <th>Nama Siswa</th>
                <th>Jenis Visa</th>
                <th>Jadwal Berangkat</th>
                <th>Mulai Kontrak</th>
                <th>Kota / Bundesland</th>
                <th>Partner / Perusahaan</th>
                <th>Masa Berlaku Visa</th>
                <th>Aksi Alumni</th>
              </tr>
            </thead>
            <tbody>
              {siswaData.map(s => (
                <tr key={s.id}>
                  <td style={{fontWeight: 500}}>{s.namaLengkap}</td>
                  <td><span className="badge badge-info">{s.alumni.jenisVisa}</span></td>
                  <td>
                    <div style={{display:'flex', alignItems:'center', gap:'0.25rem'}}>
                      <Plane size={14}/> {s.alumni.tanggalKeberangkatan}
                    </div> 
                  </td>
                  <td>{s.alumni.tanggalMulaiKontrak}</td>
                  <td>
                    <strong>{s.alumni.kota}</strong>
                    <div style={{fontSize: '0.8rem', color: '#6B7280'}}>Berlin</div>
                  </td>
                  <td>
                    <strong>{s.alumni.partner}</strong>
                    <div style={{fontSize: '0.8rem', color: '#6B7280'}}>{s.alumni.perusahaan}</div>
                  </td>
                  <td><span className="badge badge-success">{s.alumni.masaBerlakuVisa}</span></td>
                  <td>
                    <button 
                      onClick={() => alert(`Buka Tautan GDrive: ${s.alumni.tautanGDrive}`)}
                      style={{border:'none', background:'none', color:'var(--primary)', cursor:'pointer', fontWeight: 600}}
                    >
                      Buka Drive Alumni
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdmissionAlumni;
