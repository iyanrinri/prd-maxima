import React from 'react';
import { DollarSign, CheckCircle, Info } from 'lucide-react';
import { getFullSiswaData } from '../data/mockDatabase';

const DashboardSiswa = () => {
  // Simulasi login sebagai Siswa ID 1 (Riska)
  const siswa = getFullSiswaData().find(s => s.id === 1);

  if (!siswa) return <div>Data tidak ditemukan</div>;

  return (
    <div>
      <h1 className="page-title">Welcome back, {siswa.namaDepan}!</h1>
      
      <div className="dashboard-grid">
        <div className="glass-card">
          <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start'}}>
            <div>
              <div className="metric-label">Sisa Tagihan ({siswa.program})</div>
              <div className="metric-value">Rp {siswa.kekuranganIDR.toLocaleString('id-ID')}</div>
              <div style={{color: siswa.statusPembayaran === 'Lunas' ? '#10B981' : '#EF4444', fontWeight: 500}}>
                Status: {siswa.statusPembayaran}
              </div>
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
              <div className="metric-label">Kehadiran Kelas</div>
              <div className="metric-value">{siswa.akademik?.kehadiran || '0%'}</div>
              <div style={{color: 'var(--text-muted)'}}>Nilai A1: {siswa.akademik?.tingkatA1}</div>
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
              <div className="progress-fill" style={{width: siswa.akademik?.kehadiran || '0%', backgroundColor: '#10B981'}}></div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="glass-card" style={{marginTop: '2rem'}}>
        <h3 style={{marginTop: 0, borderBottom: '1px solid #eee', paddingBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem'}}>
          <Info size={18} color="var(--primary)" /> Profil Singkat (FR-5.1.5)
        </h3>
        <div style={{display: 'flex', gap: '2rem', marginTop: '1rem'}}>
          <div style={{flex: 1}}>
            <p><strong>Nama Lengkap:</strong> {siswa.namaLengkap}</p>
            <p><strong>Program:</strong> {siswa.program} {siswa.jurusanProgram !== '-' && `(${siswa.jurusanProgram})`}</p>
            <p><strong>Cabang:</strong> {siswa.cabang}</p>
            <p><strong>Status Siswa:</strong> <span className={`badge ${siswa.status === 'AKTIF' ? 'badge-success' : 'badge-warning'}`}>{siswa.status}</span></p>
          </div>
          <div style={{flex: 1}}>
            <p><strong>No Kontrak:</strong> {siswa.noKontrak}</p>
            <p><strong>Tahun Masuk:</strong> {siswa.tahunMasuk}</p>
            <p><strong>PIC Konsultan:</strong> {siswa.konsultan}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardSiswa;
