import React from 'react';

const DashboardAkademik = () => {
  return (
    <div>
      <h1 className="page-title">Dashboard Kepala Akademik</h1>
      
      <div className="dashboard-grid">
        <div className="glass-card">
          <div className="metric-label">Total Siswa Aktif</div>
          <div className="metric-value">450</div>
          <div style={{color: '#10B981', fontSize: '0.9rem'}}>Tersebar di 3 Cabang</div>
        </div>
        <div className="glass-card">
          <div className="metric-label">Kelas Aktif Berjalan</div>
          <div className="metric-value">24</div>
          <div style={{color: '#6B7280', fontSize: '0.9rem'}}>Pengajar Aktif: 12 Orang</div>
        </div>
      </div>
      
      <div className="glass-card">
        <h3 style={{marginTop: 0}}>Funnel Progres Level Bahasa (FR-3.1.4)</h3>
        <div style={{marginTop: '1rem'}}>
          <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: '0.25rem'}}>
            <span>A1 (Dasar)</span><span style={{fontWeight: 600}}>210 Siswa</span>
          </div>
          <div className="progress-bar"><div className="progress-fill" style={{width: '100%'}}></div></div>
        </div>
        <div style={{marginTop: '1rem'}}>
          <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: '0.25rem'}}>
            <span>A2 (Menengah)</span><span style={{fontWeight: 600}}>145 Siswa</span>
          </div>
          <div className="progress-bar"><div className="progress-fill" style={{width: '69%', backgroundColor: '#F59E0B'}}></div></div>
        </div>
        <div style={{marginTop: '1rem'}}>
          <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: '0.25rem'}}>
            <span>B1 (Lanjut)</span><span style={{fontWeight: 600}}>95 Siswa</span>
          </div>
          <div className="progress-bar"><div className="progress-fill" style={{width: '45%', backgroundColor: '#10B981'}}></div></div>
        </div>
      </div>
    </div>
  );
};

export default DashboardAkademik;
