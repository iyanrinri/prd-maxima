import React from 'react';
import { Filter, CheckCircle, XCircle } from 'lucide-react';
import { getFullSiswaData } from '../data/mockDatabase';

const AdmissionDatabase = () => {
  const siswaData = getFullSiswaData().filter(s => s.dokumen);

  return (
    <div>
      <h1 className="page-title">Database & Dokumen Siswa (Admission)</h1>
      <div className="table-container">
        <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1.5rem', borderBottom: '1px solid #E5E7EB'}}>
          <h3 style={{margin: 0}}>Kelengkapan Dokumen (FR-4.1)</h3>
          <div style={{display: 'flex', gap: '0.5rem'}}>
            <input type="text" placeholder="Cari siswa..." style={{padding: '0.5rem', borderRadius: '4px', border: '1px solid #ccc'}} />
            <button style={{padding: '0.5rem', background: '#F3F4F6', border: '1px solid #ccc', borderRadius: '4px', cursor: 'pointer'}}><Filter size={18} /></button>
          </div>
        </div>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ whiteSpace: 'nowrap' }}>
            <thead>
              <tr>
                <th>No Kontrak</th>
                <th>Nama Siswa</th>
                <th>Finance (Lunas)</th>
                <th>Pas Foto</th>
                <th>Ijazah</th>
                <th>Paspor</th>
                <th>CV & Motivationsschreiben</th>
                <th>Aksi</th>
              </tr>
            </thead>
            <tbody>
              {siswaData.map(s => (
                <tr key={s.id}>
                  <td style={{fontWeight: 600}}>{s.noKontrak}</td>
                  <td style={{fontWeight: 500}}>{s.namaLengkap} <div style={{fontSize: '0.8rem', color: '#6B7280'}}>{s.program}</div></td>
                  <td>
                    {s.statusPembayaran === 'Lunas' ? 
                      <span className="badge badge-success"><CheckCircle size={12} style={{marginRight:'4px'}}/> Bisa Diproses</span> : 
                      <span className="badge badge-danger"><XCircle size={12} style={{marginRight:'4px'}}/> Terkunci</span>
                    }
                  </td>
                  <td style={{color: s.dokumen.pasFoto === 'Sudah' ? '#10B981' : '#EF4444'}}>{s.dokumen.pasFoto === 'Sudah' ? '✔ Sudah' : '✘ Belum'}</td>
                  <td style={{color: s.dokumen.ijazah === 'Sudah' ? '#10B981' : '#EF4444'}}>{s.dokumen.ijazah === 'Sudah' ? '✔ Sudah' : '✘ Belum'}</td>
                  <td style={{color: s.dokumen.paspor === 'Sudah' ? '#10B981' : '#EF4444'}}>{s.dokumen.paspor === 'Sudah' ? '✔ Sudah' : '✘ Belum'}</td>
                  <td style={{color: (s.dokumen.cv === 'Sudah' && s.dokumen.motivationLetter === 'Sudah') ? '#10B981' : '#EF4444'}}>
                    {(s.dokumen.cv === 'Sudah' && s.dokumen.motivationLetter === 'Sudah') ? '✔ Sudah' : '✘ Belum'}
                  </td>
                  <td>
                    <button 
                      onClick={() => alert(`Membuka link Google Drive Admission Siswa: ${s.dokumen.driveAdmission}`)}
                      style={{border:'none', background:'none', color:'var(--primary)', cursor:'pointer', fontWeight: 600}}
                    >
                      Buka Drive
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

export default AdmissionDatabase;
