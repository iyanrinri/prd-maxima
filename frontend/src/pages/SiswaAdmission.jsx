import React from 'react';
import { AlertCircle, FileText } from 'lucide-react';

const SiswaAdmission = () => {
  return (
    <div>
      <h1 className="page-title">Layanan Admission & Partner (FR-5.4)</h1>
      
      <div className="glass-card" style={{marginBottom: '2rem'}}>
        <h3 style={{marginTop: 0, display: 'flex', alignItems: 'center', gap: '0.5rem'}}>
          <FileText size={20}/> Status Kelengkapan Dokumen Layanan
        </h3>
        
        {/* Simulasi FR-5.4.2 Admission Status terblokir oleh Gatekeeper */}
        <div style={{padding: '1rem', background: '#FEF3C7', color: '#92400E', borderRadius: '8px', marginBottom: '1.5rem'}}>
          <AlertCircle size={16} style={{display: 'inline', marginRight: '5px', verticalAlign: 'text-bottom'}}/>
          Proses pendelegasian Partner (RS/Perusahaan di Jerman) belum bisa dilakukan karena <strong>Cicilan Ke-2 (Finance) belum lunas</strong>.
        </div>
        
        <ul style={{lineHeight: '2', listStyle: 'none', paddingLeft: 0}}>
          <li><span style={{color: '#10B981', marginRight: '8px'}}>✔</span> Pas Foto Biometrik (4x6)</li>
          <li><span style={{color: '#10B981', marginRight: '8px'}}>✔</span> KTP Terjemahan Tersumpah</li>
          <li><span style={{color: '#10B981', marginRight: '8px'}}>✔</span> Motivation Letter</li>
          <li style={{display: 'flex', alignItems: 'center', gap: '10px'}}>
            <span style={{color: '#EF4444', marginRight: '8px'}}>✘</span> Video Perkenalan Diri (Bahasa Jerman) 
            <button style={{border:'1px solid var(--primary)', background:'none', color:'var(--primary)', padding:'2px 8px', borderRadius:'4px', cursor:'pointer', fontSize:'0.8rem'}}>Upload (FR-5.4.1)</button>
          </li>
        </ul>
      </div>

      <div className="table-container">
        <h3 className="table-title">Jadwal Latihan Wawancara (FR-5.4.3)</h3>
        <table>
          <thead>
            <tr>
              <th>Topik / Tujuan</th>
              <th>Tanggal</th>
              <th>Media</th>
              <th>Status</th>
              <th>Catatan Tim Admission (FR-5.4.4)</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Wawancara Ausbildung (Kesehatan)</td>
              <td>20 Nov 2023, 15:00 WIB</td>
              <td>Zoom Meeting</td>
              <td><span className="badge badge-warning">Dijadwalkan</span></td>
              <td>Siapkan catatan kosakata medis Jerman.</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SiswaAdmission;
