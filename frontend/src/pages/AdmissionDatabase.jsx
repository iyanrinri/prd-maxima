import React from 'react';
import { Filter, CheckCircle, XCircle } from 'lucide-react';
import { MOCK_STUDENTS } from '../data/mockAdmission';

const AdmissionDatabase = () => {
  return (
    <div>
      <h1 className="page-title">Database & Dokumen Siswa</h1>
      <div className="table-container">
        <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1.5rem', borderBottom: '1px solid #E5E7EB'}}>
          <h3 style={{margin: 0}}>Kelengkapan Dokumen (FR-4.1)</h3>
          <div style={{display: 'flex', gap: '0.5rem'}}>
            <input type="text" placeholder="Cari siswa..." style={{padding: '0.5rem', borderRadius: '4px', border: '1px solid #ccc'}} />
            <button style={{padding: '0.5rem', background: '#F3F4F6', border: '1px solid #ccc', borderRadius: '4px', cursor: 'pointer'}}><Filter size={18} /></button>
          </div>
        </div>
        <table>
          <thead>
            <tr>
              <th>Nama Siswa</th>
              <th>Gatekeeper (Finance)</th>
              <th>Status Dokumen</th>
              <th>Pas Foto</th>
              <th>KTP</th>
              <th>CV / ML</th>
              <th>Video</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {MOCK_STUDENTS.map(s => (
              <tr key={s.id}>
                <td style={{fontWeight: 500}}>{s.name} <div style={{fontSize: '0.8rem', color: '#6B7280'}}>{s.program}</div></td>
                <td>
                  {s.financeStatus === 'Lunas' ? 
                    <span className="badge badge-success"><CheckCircle size={12} style={{marginRight:'4px'}}/> Bisa Diproses</span> : 
                    <span className="badge badge-danger"><XCircle size={12} style={{marginRight:'4px'}}/> Terkunci (Belum Lunas)</span>
                  }
                </td>
                <td>
                  {Object.values(s.documents).every(v => v) ? <span className="badge badge-success">Lengkap 5/5</span> : <span className="badge badge-warning">Belum Lengkap</span>}
                </td>
                <td style={{color: s.documents.pasFoto ? '#10B981' : '#EF4444'}}>{s.documents.pasFoto ? '✔' : '✘'}</td>
                <td style={{color: s.documents.ktp ? '#10B981' : '#EF4444'}}>{s.documents.ktp ? '✔' : '✘'}</td>
                <td style={{color: s.documents.cv ? '#10B981' : '#EF4444'}}>{s.documents.cv && s.documents.motivationLetter ? '✔' : '✘'}</td>
                <td style={{color: s.documents.videoPerkenalan ? '#10B981' : '#EF4444'}}>{s.documents.videoPerkenalan ? '✔' : '✘'}</td>
                <td>
                  <button 
                    onClick={() => alert(`Meminta siswa ${s.name} melengkapi dokumen via email otomatis.`)}
                    style={{border:'none', background:'none', color:'var(--primary)', cursor:'pointer', fontWeight: 600}}
                  >
                    Follow Up
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

export default AdmissionDatabase;
