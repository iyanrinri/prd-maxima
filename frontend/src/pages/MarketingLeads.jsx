import React, { useState } from 'react';

const MarketingLeads = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <div>
      <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem'}}>
        <h1 className="page-title" style={{margin: 0}}>Manajemen Leads (CRM)</h1>
        <button 
          onClick={() => setShowModal(true)}
          style={{background: 'var(--primary)', color: 'white', border: 'none', padding: '0.75rem 1.5rem', borderRadius: '8px', cursor: 'pointer', fontWeight: 600}}>
          + Tambah Lead Baru
        </button>
      </div>

      <div className="table-container">
        <h3 className="table-title">Daftar Prospek (FR-1.3.1)</h3>
        <table>
          <thead>
            <tr>
              <th>Tanggal Masuk</th>
              <th>Nama Calon Siswa</th>
              <th>No. WhatsApp</th>
              <th>Minat Program</th>
              <th>Sumber</th>
              <th>Status Follow Up</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>02 Nov 2023</td>
              <td>Ayu Lestari</td>
              <td>081234567</td>
              <td>Ausbildung</td>
              <td>Instagram</td>
              <td><span className="badge badge-success">Selesai (Hot)</span></td>
            </tr>
            <tr>
              <td>03 Nov 2023</td>
              <td>Riko Kurniawan</td>
              <td>081987654</td>
              <td>Au Pair</td>
              <td>Referral</td>
              <td><span className="badge badge-warning">Proses Follow Up 1</span></td>
            </tr>
            <tr>
              <td>04 Nov 2023</td>
              <td>Dimas Anggara</td>
              <td>085612345</td>
              <td>FSJ</td>
              <td>Event Kampus</td>
              <td><span className="badge badge-danger">Belum Dihubungi</span></td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Mock Modal */}
      {showModal && (
        <div style={{position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 100}}>
          <div className="glass-card" style={{background: 'white', width: '400px'}}>
            <h3 style={{marginTop: 0}}>Input Lead Baru</h3>
            <div style={{display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '1rem'}}>
              <input type="text" placeholder="Nama Lengkap" style={{padding: '0.5rem'}} />
              <input type="text" placeholder="No. WhatsApp" style={{padding: '0.5rem'}} />
              <select style={{padding: '0.5rem'}}>
                <option>Pilih Program...</option>
                <option>Ausbildung</option>
                <option>Au Pair</option>
                <option>FSJ</option>
              </select>
              <select style={{padding: '0.5rem'}}>
                <option>Sumber Lead...</option>
                <option>Instagram</option>
                <option>Tiktok</option>
                <option>Referral</option>
              </select>
            </div>
            <div style={{display: 'flex', gap: '1rem', marginTop: '2rem'}}>
              <button onClick={() => setShowModal(false)} style={{flex: 1, padding: '0.5rem', cursor: 'pointer'}}>Batal</button>
              <button onClick={() => setShowModal(false)} style={{flex: 1, padding: '0.5rem', background: 'var(--primary)', color: 'white', border: 'none', cursor: 'pointer'}}>Simpan</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MarketingLeads;
