import React from 'react';

const SiswaAkademik = () => {
  return (
    <div>
      <h1 className="page-title">Akademik & Pembelajaran (FR-5.3)</h1>
      
      <div className="glass-card" style={{marginBottom: '2rem'}}>
        <h3 style={{marginTop: 0, marginBottom: '1.5rem'}}>Progres Pembelajaran Bahasa (Jerman)</h3>
        <div style={{marginBottom: '1.5rem'}}>
          <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: '0.25rem'}}>
            <span style={{fontWeight: 600}}>Level A1</span>
            <span style={{color: 'var(--text-muted)'}}>Selesai (Nilai Akhir: 88)</span>
          </div>
          <div className="progress-bar"><div className="progress-fill" style={{width: '100%', backgroundColor: '#10B981'}}></div></div>
        </div>
        <div style={{marginBottom: '1.5rem'}}>
          <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: '0.25rem'}}>
            <span style={{fontWeight: 600}}>Level A2</span>
            <span style={{color: 'var(--text-muted)'}}>Selesai (Nilai Akhir: 82)</span>
          </div>
          <div className="progress-bar"><div className="progress-fill" style={{width: '100%', backgroundColor: '#10B981'}}></div></div>
        </div>
        <div>
          <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: '0.25rem'}}>
            <span style={{fontWeight: 600}}>Level B1</span>
            <span style={{color: '#F59E0B', fontWeight: 500}}>Sedang Berjalan (45%) - Bab 4</span>
          </div>
          <div className="progress-bar"><div className="progress-fill" style={{width: '45%', backgroundColor: '#F59E0B'}}></div></div>
        </div>
      </div>

      <div className="table-container">
        <h3 className="table-title">Detail Nilai Sertifikat (FR-5.3.5)</h3>
        <table>
          <thead>
            <tr>
              <th>Jenis Ujian</th>
              <th>Level</th>
              <th>Lesen</th>
              <th>Hören</th>
              <th>Schreiben</th>
              <th>Sprechen</th>
              <th>Status Kelulusan</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Goethe Zertifikat</td>
              <td>A2</td>
              <td>85</td>
              <td>90</td>
              <td>78</td>
              <td>82</td>
              <td><span className="badge badge-success">Lulus</span></td>
            </tr>
            <tr>
              <td>ÖSD</td>
              <td>B1</td>
              <td>-</td>
              <td>-</td>
              <td>-</td>
              <td>-</td>
              <td><span className="badge badge-warning">Belum Ujian</span></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SiswaAkademik;
