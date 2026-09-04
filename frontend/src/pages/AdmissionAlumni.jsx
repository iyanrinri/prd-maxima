import React from 'react';
import { MOCK_STUDENTS } from '../data/mockAdmission';
import { Plane } from 'lucide-react';

const AdmissionAlumni = () => {
  return (
    <div>
      <h1 className="page-title">Manajemen Alumni & Keberangkatan Visa</h1>
      
      <div className="table-container">
        <h3 className="table-title">Data Keberangkatan & Alumni (FR-4.4)</h3>
        <div style={{padding: '1rem', background: '#ECFDF5', color: '#065F46', fontSize: '0.9rem', borderBottom:'1px solid #E5E7EB'}}>
          Daftar ini khusus untuk memonitor siswa yang sudah mendapatkan <strong>Visa Granted</strong> dan jadwal keberangkatan mereka ke Jerman.
        </div>
        <table>
          <thead>
            <tr>
              <th>Nama Siswa</th>
              <th>Program</th>
              <th>Status Visa</th>
              <th>Jadwal Berangkat</th>
              <th>Kota Penempatan (Jerman)</th>
              <th>Status Dana Talang</th>
              <th>Aksi Alumni</th>
            </tr>
          </thead>
          <tbody>
            {MOCK_STUDENTS.filter(s => s.alumni && s.alumni.visaStatus !== '-').map(s => (
              <tr key={s.id}>
                <td style={{fontWeight: 500}}>{s.name}</td>
                <td>{s.program}</td>
                <td>
                  {s.alumni.visaStatus === 'Granted' ? 
                    <span className="badge badge-success">Visa Granted</span> : 
                    <span className="badge badge-warning">{s.alumni.visaStatus}</span>
                  }
                </td>
                <td>
                  {s.alumni.berangkat !== '-' ? 
                    <div style={{display:'flex', alignItems:'center', gap:'0.25rem'}}><Plane size={14}/> {s.alumni.berangkat}</div> 
                    : '-'
                  }
                </td>
                <td>
                  {s.alumni.kota !== '-' ? 
                    <strong>{s.alumni.kota}</strong> : '-'
                  }
                  <div style={{fontSize: '0.8rem', color: '#6B7280'}}>{s.alumni.bundesland !== '-' ? s.alumni.bundesland : ''}</div>
                </td>
                <td>
                  {s.program === 'Ausbildung' ? <span className="badge badge-info">Diberikan</span> : '-'}
                </td>
                <td>
                  <button style={{border:'none', background:'none', color:'var(--primary)', cursor:'pointer', fontWeight: 600}}>
                    Update Data Jerman
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

export default AdmissionAlumni;
