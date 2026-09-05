import React from 'react';
import { User, Mail, Phone, MapPin, FileText, UploadCloud } from 'lucide-react';
import { getFullSiswaData } from '../data/mockDatabase';

const SiswaProfil = () => {
  const siswa = getFullSiswaData().find(s => s.id === 1);

  if (!siswa) return <div>Data tidak ditemukan</div>;

  const renderDokumenItem = (namaDokumen, status) => {
    if (status !== 'Sudah') return null;
    return (
      <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem', background: '#F9FAFB', borderRadius: '8px'}}>
        <div style={{display: 'flex', alignItems: 'center', gap: '1rem'}}>
          <FileText size={24} color="#3B82F6" />
          <div>
            <div style={{fontWeight: 600}}>{namaDokumen}</div>
            <div style={{fontSize: '0.8rem', color: 'var(--text-muted)'}}>Status: Terunggah</div>
          </div>
        </div>
        <button style={{background: 'none', border: 'none', color: 'var(--primary)', cursor: 'pointer', fontWeight: 600}}>Lihat</button>
      </div>
    );
  };

  return (
    <div>
      <h1 className="page-title">Profil Saya (FR-5.1.5)</h1>
      
      <div className="dashboard-grid">
        <div className="glass-card">
          <div style={{display: 'flex', alignItems: 'center', gap: '1.5rem', marginBottom: '2rem'}}>
            <div style={{width: '100px', height: '100px', borderRadius: '50%', background: 'var(--primary)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2.5rem', fontWeight: 'bold'}}>
              {siswa.namaDepan.charAt(0)}{siswa.namaBelakang ? siswa.namaBelakang.charAt(0) : ''}
            </div>
            <div>
              <h2 style={{margin: '0 0 0.5rem 0'}}>{siswa.namaLengkap}</h2>
              <p style={{margin: 0, color: 'var(--text-muted)'}}>Siswa Program {siswa.program}</p>
              <span className={`badge ${siswa.status === 'AKTIF' ? 'badge-success' : 'badge-warning'}`} style={{marginTop: '0.5rem', display: 'inline-block'}}>Status {siswa.status}</span>
            </div>
          </div>

          <h3 style={{borderBottom: '1px solid #eee', paddingBottom: '0.5rem'}}>Informasi Pribadi</h3>
          <div style={{display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '1rem'}}>
            <div style={{display: 'flex', alignItems: 'center', gap: '1rem'}}>
              <User size={18} color="var(--text-muted)" />
              <span style={{fontWeight: 500, width: '120px'}}>No. Siswa (NIS)</span>
              <span>{siswa.noSiswa}</span>
            </div>
            <div style={{display: 'flex', alignItems: 'center', gap: '1rem'}}>
              <Phone size={18} color="var(--text-muted)" />
              <span style={{fontWeight: 500, width: '120px'}}>No. Orang Tua</span>
              <span>{siswa.noIbu} (Ibu)</span>
            </div>
            <div style={{display: 'flex', alignItems: 'center', gap: '1rem'}}>
              <Mail size={18} color="var(--text-muted)" />
              <span style={{fontWeight: 500, width: '120px'}}>Tanggal Lahir</span>
              <span>{siswa.tanggalLahir}</span>
            </div>
            <div style={{display: 'flex', alignItems: 'center', gap: '1rem'}}>
              <MapPin size={18} color="var(--text-muted)" />
              <span style={{fontWeight: 500, width: '120px'}}>Alamat Lengkap</span>
              <span>{siswa.alamat}</span>
            </div>
          </div>
          
          <button style={{marginTop: '2rem', background: '#F3F4F6', color: 'var(--text-main)', border: '1px solid #D1D5DB', padding: '0.75rem 1.5rem', borderRadius: '8px', cursor: 'pointer', fontWeight: 600}}>
            Edit Profil
          </button>
        </div>

        <div className="glass-card">
          <h3 style={{marginTop: 0, borderBottom: '1px solid #eee', paddingBottom: '0.5rem'}}>Arsip Dokumen Pribadi & Admission</h3>
          
          <div style={{display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '1rem'}}>
            {siswa.dokumen && (
              <>
                {renderDokumenItem('Scan KTP.pdf', siswa.dokumen.ktp)}
                {renderDokumenItem('Curriculum Vitae (CV).pdf', siswa.dokumen.cv)}
                {renderDokumenItem('Motivationsschreiben.pdf', siswa.dokumen.motivationLetter)}
                {renderDokumenItem('Ijazah Terakhir.pdf', siswa.dokumen.ijazah)}
                {renderDokumenItem('Paspor.pdf', siswa.dokumen.paspor)}
                {renderDokumenItem('Pas Foto.jpg', siswa.dokumen.pasFoto)}
              </>
            )}
            
            {(!siswa.dokumen || Object.values(siswa.dokumen).every(v => v !== 'Sudah')) && (
              <div style={{padding: '1rem', background: '#FEF3C7', color: '#92400E', borderRadius: '8px'}}>
                Belum ada dokumen yang diunggah atau disetujui.
              </div>
            )}
          </div>
          
          <button style={{marginTop: '2rem', width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.5rem', background: 'var(--primary)', color: 'white', border: 'none', padding: '0.75rem 1.5rem', borderRadius: '8px', cursor: 'pointer', fontWeight: 600}}>
            <UploadCloud size={18} /> Unggah Dokumen Baru
          </button>
        </div>
      </div>
    </div>
  );
};

export default SiswaProfil;
