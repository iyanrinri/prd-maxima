import React from 'react';

const MarketingKontrak = () => {
  return (
    <div>
      <h1 className="page-title">Kontrak & Pendaftaran</h1>
      
      <div className="table-container">
        <h3 className="table-title">Status Kontrak Prospek (FR-1.3.2) & Form Daftar (FR-1.4)</h3>
        <div style={{padding: '1rem', background: '#DBEAFE', color: '#1E40AF', fontSize: '0.9rem', borderBottom:'1px solid #E5E7EB'}}>
          Generate Link Pendaftaran hanya bisa dilakukan jika status Kontrak sudah <strong>Tanda Tangan (Selesai)</strong>.
        </div>
        <table>
          <thead>
            <tr>
              <th>Nama Calon Siswa</th>
              <th>Program</th>
              <th>PIC Konsultan</th>
              <th>Status Kontrak</th>
              <th>Aksi Pendaftaran (FR-1.4)</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Ayu Lestari</td>
              <td>Ausbildung</td>
              <td>Siti Aminah</td>
              <td><span className="badge badge-success">Selesai TTD</span></td>
              <td>
                <button 
                  onClick={() => alert('Link Pendaftaran Online: https://maxima.id/register/ayu-123\n\nLink berhasil dicopy untuk dikirimkan ke calon siswa.')}
                  style={{border:'none', background:'var(--primary)', color:'white', padding:'6px 12px', borderRadius:'4px', cursor:'pointer', fontWeight: 600}}
                >
                  Generate Link Daftar
                </button>
              </td>
            </tr>
            <tr>
              <td>Riko Kurniawan</td>
              <td>Au Pair</td>
              <td>Budi Santoso</td>
              <td><span className="badge badge-warning">Draft Dikirim</span></td>
              <td>
                <button disabled style={{border:'none', background:'#ccc', color:'white', padding:'6px 12px', borderRadius:'4px', cursor:'not-allowed'}}>
                  Terkunci (Belum TTD)
                </button>
              </td>
            </tr>
            <tr>
              <td>Dimas Anggara</td>
              <td>FSJ</td>
              <td>Andi Wijaya</td>
              <td><span className="badge badge-danger">Belum Dibuat</span></td>
              <td>
                <button style={{border:'none', background:'none', color:'var(--primary)', cursor:'pointer', fontWeight: 600}}>
                  Buat Draft Kontrak
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MarketingKontrak;
