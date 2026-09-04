import React from 'react';

const DashboardFinance = () => {
  return (
    <div>
      <h1 className="page-title">Dashboard Finance & Penagihan</h1>
      
      <div className="dashboard-grid grid-3">
        <div className="glass-card">
          <div className="metric-label">Pembayaran Bulan Ini</div>
          <div className="metric-value">Rp 145M</div>
          <div style={{color: '#10B981', fontSize: '0.9rem'}}>Total Diterima</div>
        </div>
        <div className="glass-card">
          <div className="metric-label">Total Piutang Berjalan</div>
          <div className="metric-value">Rp 32M</div>
          <div style={{color: '#EF4444', fontSize: '0.9rem'}}>Dari 45 Siswa Belum Lunas</div>
        </div>
        <div className="glass-card">
          <div className="metric-label">Tagihan Jatuh Tempo</div>
          <div className="metric-value">12</div>
          <div style={{color: '#F59E0B', fontSize: '0.9rem'}}>Reminder Otomatis H-7 Aktif</div>
        </div>
      </div>
    </div>
  );
};

export default DashboardFinance;
