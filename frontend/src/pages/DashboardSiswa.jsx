import React from 'react';
import { DollarSign, CheckCircle } from 'lucide-react';

const DashboardSiswa = () => {
  return (
    <div>
      <h1 className="page-title">Welcome back, Sarah Jenkins!</h1>
      
      <div className="dashboard-grid">
        <div className="glass-card">
          <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start'}}>
            <div>
              <div className="metric-label">Sisa Tagihan (Ausbildung)</div>
              <div className="metric-value">Rp 12.450.000</div>
              <div style={{color: '#F59E0B', fontWeight: 500}}>Status: Sebagian (Jatuh Tempo: 15 Nov)</div>
            </div>
            <div style={{padding: '10px', background: '#DBEAFE', borderRadius: '50%', color: '#1D4ED8'}}>
              <DollarSign size={24} />
            </div>
          </div>
          <button style={{marginTop: '1.5rem', width: '100%', padding: '0.75rem', background: 'var(--primary)', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 600}}>
            Ke Pembayaran
          </button>
        </div>

        <div className="glass-card">
          <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start'}}>
            <div>
              <div className="metric-label">Kehadiran Kelas (B1)</div>
              <div className="metric-value">94%</div>
              <div style={{color: 'var(--text-muted)'}}>31 dari 33 Hari</div>
            </div>
            <div style={{padding: '10px', background: '#D1FAE5', borderRadius: '50%', color: '#047857'}}>
              <CheckCircle size={24} />
            </div>
          </div>
          <div style={{marginTop: '1.5rem'}}>
            <div style={{display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem'}}>
              <span>Target Minimal</span>
              <span style={{fontWeight: 600}}>80%</span>
            </div>
            <div className="progress-bar">
              <div className="progress-fill" style={{width: '94%', backgroundColor: '#10B981'}}></div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="glass-card" style={{marginTop: '2rem'}}>
        <h3 style={{marginTop: 0, borderBottom: '1px solid #eee', paddingBottom: '1rem'}}>Profil Singkat (FR-5.1.5 & FR-5.1.6)</h3>
        <div style={{display: 'flex', gap: '2rem', marginTop: '1rem'}}>
          <div style={{flex: 1}}>
            <p><strong>Nama Lengkap:</strong> Sarah Jenkins</p>
            <p><strong>Program:</strong> Ausbildung (Jerman)</p>
            <p><strong>Cabang:</strong> Jakarta Selatan</p>
            <p><strong>Status Siswa:</strong> <span className="badge badge-success">Aktif Berjalan</span></p>
          </div>
          <div style={{flex: 1}}>
            <p><strong>PIC Konsultan:</strong> Siti Aminah</p>
            <p><strong>Tim Admission:</strong> Belum Ter-assign</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardSiswa;
