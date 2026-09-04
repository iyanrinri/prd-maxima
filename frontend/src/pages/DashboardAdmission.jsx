import React from 'react';

const DashboardAdmission = () => {
  return (
    <div>
      <h1 className="page-title">Dashboard Overview Admission</h1>
      
      <div className="dashboard-grid grid-3">
        <div className="glass-card">
          <div className="metric-label">Sedang Diproses (Partner)</div>
          <div className="metric-value">38</div>
          <div style={{color: '#F59E0B', fontSize: '0.9rem'}}>Tahap Wawancara / Dokumen</div>
        </div>
        
        <div className="glass-card">
          <div className="metric-label">Visa Granted (Jerman)</div>
          <div className="metric-value">124</div>
          <div style={{color: '#10B981', fontSize: '0.9rem'}}>Total Berangkat Tahun Ini</div>
        </div>

        <div className="glass-card">
          <div className="metric-label">Menunggu Ujian</div>
          <div className="metric-value">15</div>
          <div style={{color: '#6B7280', fontSize: '0.9rem'}}>Target Sertifikasi B1/B2</div>
        </div>
      </div>
      
      <div style={{marginTop: '2rem', padding: '2rem', background: 'white', borderRadius: '8px', textAlign: 'center'}}>
        <h2>Selamat Datang di Modul Admission</h2>
        <p style={{color: 'var(--text-muted)'}}>Silakan gunakan menu navigasi di sebelah kiri untuk mengelola Database Siswa, Ujian & Sertifikat, serta Layanan Partner.</p>
      </div>
    </div>
  );
};

export default DashboardAdmission;
