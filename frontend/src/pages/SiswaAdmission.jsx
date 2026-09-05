import React from 'react';
import { AlertCircle, FileText, CheckCircle, Info } from 'lucide-react';
import { getFullSiswaData } from '../data/mockDatabase';

const SiswaAdmission = () => {
  const siswa = getFullSiswaData().find(s => s.id === 1);

  if (!siswa) return <div>Data tidak ditemukan</div>;

  const renderDokumenStatus = (label, status) => {
    const isSudah = status === 'Sudah';
    return (
      <li style={{display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '0.5rem'}}>
        <span style={{color: isSudah ? '#10B981' : '#EF4444', marginRight: '8px'}}>
          {isSudah ? '✔' : '✘'}
        </span> 
        {label}
        {!isSudah && (
          <button style={{border:'1px solid var(--primary)', background:'none', color:'var(--primary)', padding:'2px 8px', borderRadius:'4px', cursor:'pointer', fontSize:'0.8rem'}}>Upload</button>
        )}
      </li>
    );
  };

  return (
    <div>
      <h1 className="page-title">Layanan Admission & Partner (FR-5.4)</h1>
      
      <div className="glass-card" style={{marginBottom: '2rem'}}>
        <h3 style={{marginTop: 0, display: 'flex', alignItems: 'center', gap: '0.5rem'}}>
          <FileText size={20}/> Status Kelengkapan Dokumen Layanan
        </h3>
        
        {siswa.statusPembayaran !== 'Lunas' && (
          <div style={{padding: '1rem', background: '#FEF3C7', color: '#92400E', borderRadius: '8px', marginBottom: '1.5rem'}}>
            <AlertCircle size={16} style={{display: 'inline', marginRight: '5px', verticalAlign: 'text-bottom'}}/>
            Proses pendelegasian Partner (RS/Perusahaan di Jerman) belum bisa dilakukan karena <strong>pembayaran layanan belum lunas</strong> (Gatekeeper).
          </div>
        )}
        
        <ul style={{lineHeight: '2', listStyle: 'none', paddingLeft: 0}}>
          {siswa.dokumen && (
            <>
              {renderDokumenStatus('Pas Foto Biometrik (4x6)', siswa.dokumen.pasFoto)}
              {renderDokumenStatus('KTP Terjemahan Tersumpah', siswa.dokumen.ktp)}
              {renderDokumenStatus('Ijazah Terakhir', siswa.dokumen.ijazah)}
              {renderDokumenStatus('Paspor', siswa.dokumen.paspor)}
              {renderDokumenStatus('Curriculum Vitae (CV)', siswa.dokumen.cv)}
              {renderDokumenStatus('Motivationsschreiben', siswa.dokumen.motivationLetter)}
            </>
          )}
        </ul>
      </div>

      <div className="table-container" style={{marginBottom: '2rem'}}>
        <h3 className="table-title">Status Lamaran & Partner (FR-5.4.3)</h3>
        {siswa.tracking ? (
          <div style={{padding: '1rem'}}>
            <div style={{display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem', marginBottom: '1rem'}}>
              <div><strong>Posisi Dilamar:</strong> {siswa.tracking.posisiDilamar}</div>
              <div><strong>Wawancara Ke:</strong> {siswa.tracking.wawancaraKe}</div>
              <div><strong>Total Lamaran Terkirim:</strong> {siswa.tracking.jumlahDiproses} Perusahaan</div>
              <div><strong>Update Terakhir:</strong> {siswa.tracking.updateTerakhir}</div>
            </div>
            
            <div style={{padding: '1rem', background: '#F3F4F6', borderRadius: '8px', marginTop: '1rem'}}>
              <h4 style={{marginTop: 0}}>Progres Terakhir (Partner: {siswa.tracking.partnerTerakhir})</h4>
              <div style={{display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#1D4ED8', fontWeight: 600}}>
                <Info size={16} /> {siswa.tracking.progresTerakhir}
              </div>
            </div>
          </div>
        ) : (
          <div style={{padding: '1rem', textAlign: 'center'}}>Belum ada proses lamaran partner.</div>
        )}
      </div>

      {siswa.alumni && siswa.alumni.jenisVisa && (
        <div className="table-container">
          <h3 className="table-title">Status Keberangkatan (FR-5.4.5)</h3>
          <div style={{padding: '1rem'}}>
            <div style={{display: 'flex', alignItems: 'center', gap: '1rem', padding: '1rem', background: '#ECFDF5', borderRadius: '8px', border: '1px solid #A7F3D0'}}>
              <CheckCircle size={32} color="#10B981" />
              <div>
                <h4 style={{margin: '0 0 0.25rem 0', color: '#065F46'}}>Visa {siswa.alumni.jenisVisa} Granted!</h4>
                <p style={{margin: 0, fontSize: '0.9rem', color: '#047857'}}>Keberangkatan dijadwalkan pada {siswa.alumni.tanggalKeberangkatan}. Penempatan: {siswa.alumni.kota} ({siswa.alumni.partner}).</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SiswaAdmission;
