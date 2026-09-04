import React from 'react';

const DashboardMarketing = () => {
  return (
    <div>
      <h1 className="page-title">Dashboard Marketing & CRM</h1>
      
      <div className="dashboard-grid grid-3">
        <div className="glass-card">
          <div className="metric-label">Total Leads Bulan Ini</div>
          <div className="metric-value">245</div>
          <div style={{color: '#10B981', fontSize: '0.9rem'}}>↑ 12% dari bulan lalu</div>
        </div>
        <div className="glass-card">
          <div className="metric-label">Kontrak Ditandatangani</div>
          <div className="metric-value">68</div>
          <div style={{color: '#10B981', fontSize: '0.9rem'}}>↑ 5% dari bulan lalu</div>
        </div>
        <div className="glass-card">
          <div className="metric-label">Total Siswa Aktif Baru</div>
          <div className="metric-value">52</div>
          <div style={{color: '#F59E0B', fontSize: '0.9rem'}}>Menunggu DP: 16</div>
        </div>
      </div>
      
      <div className="dashboard-grid">
        <div className="glass-card">
          <h3 style={{marginTop: 0}}>Performa Tim (FR-1.1.1)</h3>
          <table style={{width: '100%', marginTop: '1rem'}}>
            <thead>
              <tr>
                <th style={{padding: '0.5rem 0', textAlign: 'left', borderBottom: '1px solid #eee'}}>Nama Konsultan</th>
                <th style={{padding: '0.5rem 0', textAlign: 'left', borderBottom: '1px solid #eee'}}>Leads Masuk</th>
                <th style={{padding: '0.5rem 0', textAlign: 'left', borderBottom: '1px solid #eee'}}>Closing Kontrak</th>
              </tr>
            </thead>
            <tbody>
              <tr><td style={{padding: '0.75rem 0'}}>Budi Santoso</td><td>45</td><td>12</td></tr>
              <tr><td style={{padding: '0.75rem 0'}}>Siti Aminah</td><td>52</td><td>18</td></tr>
              <tr><td style={{padding: '0.75rem 0'}}>Andi Wijaya</td><td>38</td><td>9</td></tr>
            </tbody>
          </table>
        </div>
        
        <div className="glass-card">
          <h3 style={{marginTop: 0}}>Sumber Lead (FR-1.1.2)</h3>
          <div style={{display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '1rem'}}>
            <div>
              <div style={{display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem'}}>
                <span>Instagram / Tiktok</span><span>65%</span>
              </div>
              <div className="progress-bar"><div className="progress-fill" style={{width: '65%'}}></div></div>
            </div>
            <div>
              <div style={{display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem'}}>
                <span>Rekomendasi Alumni</span><span>25%</span>
              </div>
              <div className="progress-bar"><div className="progress-fill" style={{width: '25%', backgroundColor: '#F59E0B'}}></div></div>
            </div>
            <div>
              <div style={{display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem'}}>
                <span>Walk-in / Event</span><span>10%</span>
              </div>
              <div className="progress-bar"><div className="progress-fill" style={{width: '10%', backgroundColor: '#10B981'}}></div></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardMarketing;
