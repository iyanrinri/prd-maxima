import React from 'react';
import { User, Mail, Phone, MapPin, FileText, UploadCloud } from 'lucide-react';

const SiswaProfil = () => {
  return (
    <div>
      <h1 className="page-title">Profil Saya (FR-5.1.5)</h1>
      
      <div className="dashboard-grid">
        <div className="glass-card">
          <div style={{display: 'flex', alignItems: 'center', gap: '1.5rem', marginBottom: '2rem'}}>
            <div style={{width: '100px', height: '100px', borderRadius: '50%', background: 'var(--primary)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2.5rem', fontWeight: 'bold'}}>
              SJ
            </div>
            <div>
              <h2 style={{margin: '0 0 0.5rem 0'}}>Sarah Jenkins</h2>
              <p style={{margin: 0, color: 'var(--text-muted)'}}>Siswa Program Ausbildung</p>
              <span className="badge badge-success" style={{marginTop: '0.5rem', display: 'inline-block'}}>Status Aktif</span>
            </div>
          </div>

          <h3 style={{borderBottom: '1px solid #eee', paddingBottom: '0.5rem'}}>Informasi Pribadi</h3>
          <div style={{display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '1rem'}}>
            <div style={{display: 'flex', alignItems: 'center', gap: '1rem'}}>
              <User size={18} color="var(--text-muted)" />
              <span style={{fontWeight: 500, width: '120px'}}>No. KTP</span>
              <span>3171234567890001</span>
            </div>
            <div style={{display: 'flex', alignItems: 'center', gap: '1rem'}}>
              <Mail size={18} color="var(--text-muted)" />
              <span style={{fontWeight: 500, width: '120px'}}>Email</span>
              <span>sarah.jenkins@example.com</span>
            </div>
            <div style={{display: 'flex', alignItems: 'center', gap: '1rem'}}>
              <Phone size={18} color="var(--text-muted)" />
              <span style={{fontWeight: 500, width: '120px'}}>No. Handphone</span>
              <span>+62 812-3456-7890</span>
            </div>
            <div style={{display: 'flex', alignItems: 'center', gap: '1rem'}}>
              <MapPin size={18} color="var(--text-muted)" />
              <span style={{fontWeight: 500, width: '120px'}}>Alamat Lengkap</span>
              <span>Jl. Sudirman No. 45, Jakarta Selatan</span>
            </div>
          </div>
          
          <button style={{marginTop: '2rem', background: '#F3F4F6', color: 'var(--text-main)', border: '1px solid #D1D5DB', padding: '0.75rem 1.5rem', borderRadius: '8px', cursor: 'pointer', fontWeight: 600}}>
            Edit Profil
          </button>
        </div>

        <div className="glass-card">
          <h3 style={{marginTop: 0, borderBottom: '1px solid #eee', paddingBottom: '0.5rem'}}>Arsip Dokumen Pribadi</h3>
          
          <div style={{display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '1rem'}}>
            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem', background: '#F9FAFB', borderRadius: '8px'}}>
              <div style={{display: 'flex', alignItems: 'center', gap: '1rem'}}>
                <FileText size={24} color="#3B82F6" />
                <div>
                  <div style={{fontWeight: 600}}>Scan KTP.pdf</div>
                  <div style={{fontSize: '0.8rem', color: 'var(--text-muted)'}}>Diunggah: 12 Ags 2023</div>
                </div>
              </div>
              <button style={{background: 'none', border: 'none', color: 'var(--primary)', cursor: 'pointer', fontWeight: 600}}>Lihat</button>
            </div>

            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem', background: '#F9FAFB', borderRadius: '8px'}}>
              <div style={{display: 'flex', alignItems: 'center', gap: '1rem'}}>
                <FileText size={24} color="#3B82F6" />
                <div>
                  <div style={{fontWeight: 600}}>Curriculum Vitae (CV).pdf</div>
                  <div style={{fontSize: '0.8rem', color: 'var(--text-muted)'}}>Diunggah: 15 Ags 2023</div>
                </div>
              </div>
              <button style={{background: 'none', border: 'none', color: 'var(--primary)', cursor: 'pointer', fontWeight: 600}}>Lihat</button>
            </div>
            
            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem', background: '#F9FAFB', borderRadius: '8px'}}>
              <div style={{display: 'flex', alignItems: 'center', gap: '1rem'}}>
                <FileText size={24} color="#3B82F6" />
                <div>
                  <div style={{fontWeight: 600}}>Ijazah Terakhir.pdf</div>
                  <div style={{fontSize: '0.8rem', color: 'var(--text-muted)'}}>Diunggah: 15 Ags 2023</div>
                </div>
              </div>
              <button style={{background: 'none', border: 'none', color: 'var(--primary)', cursor: 'pointer', fontWeight: 600}}>Lihat</button>
            </div>
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
