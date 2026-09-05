import React, { useState } from 'react';
import { TabelSiswa } from '../data/mockDatabase';

const MarketingLeads = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <div>
      <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem'}}>
        <h1 className="page-title" style={{margin: 0}}>Database Siswa (Marketing / CRM)</h1>
        <button 
          onClick={() => setShowModal(true)}
          style={{background: 'var(--primary)', color: 'white', border: 'none', padding: '0.75rem 1.5rem', borderRadius: '8px', cursor: 'pointer', fontWeight: 600}}>
          + Tambah Siswa Baru
        </button>
      </div>

      <div className="table-container">
        <h3 className="table-title">Data Master Siswa</h3>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ whiteSpace: 'nowrap' }}>
            <thead>
              <tr>
                <th>No Kontrak</th>
                <th>Nama Calon Siswa</th>
                <th>Cabang</th>
                <th>Program</th>
                <th>Konsultan</th>
                <th>No Siswa</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {TabelSiswa.map(siswa => (
                <tr key={siswa.id}>
                  <td style={{fontWeight: 600}}>{siswa.noKontrak}</td>
                  <td>{siswa.namaLengkap}</td>
                  <td>{siswa.cabang}</td>
                  <td>{siswa.program}</td>
                  <td>{siswa.konsultan}</td>
                  <td>{siswa.noSiswa}</td>
                  <td>
                    <span className={`badge ${siswa.status === 'AKTIF' ? 'badge-success' : 'badge-warning'}`}>
                      {siswa.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Mock Modal */}
      {showModal && (
        <div style={{position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 100}}>
          <div className="glass-card" style={{background: 'white', width: '400px'}}>
            <h3 style={{marginTop: 0}}>Input Siswa Baru</h3>
            <div style={{display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '1rem'}}>
              <input type="text" placeholder="Nama Lengkap" style={{padding: '0.5rem'}} />
              <input type="text" placeholder="No. Kontrak" style={{padding: '0.5rem'}} />
              <select style={{padding: '0.5rem'}}>
                <option>Pilih Program...</option>
                <option>AUSBILDUNG</option>
                <option>AU PAIR</option>
                <option>FSJ</option>
              </select>
              <select style={{padding: '0.5rem'}}>
                <option>Cabang...</option>
                <option>BANDUNG</option>
                <option>TASIKMALAYA</option>
                <option>BATAM</option>
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
