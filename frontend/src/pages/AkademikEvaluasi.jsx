import React from 'react';

const AkademikEvaluasi = () => {
  return (
    <div>
      <h1 className="page-title">Evaluasi Kelas & Kinerja Pengajar</h1>
      <div className="table-container">
        <h3 className="table-title">Evaluasi Kelas Rutin (FR-3.1.5)</h3>
        <table>
          <thead>
            <tr>
              <th>Nama Kelas</th>
              <th>Pengajar</th>
              <th>Rata-rata Nilai</th>
              <th>Kehadiran Kelas</th>
              <th>Kendala Belajar</th>
              <th>Aksi Evaluasi</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Berlin Pagi</td>
              <td>Herr Thomas</td>
              <td>82 (Baik)</td>
              <td>95%</td>
              <td>-</td>
              <td><button style={{border:'none', background:'none', color:'var(--primary)', cursor:'pointer'}}>Lihat Detail</button></td>
            </tr>
            <tr>
              <td>Hamburg Siang</td>
              <td>Herr Muller</td>
              <td>68 (Cukup)</td>
              <td>80%</td>
              <td><span className="badge badge-warning">Materi terlalu cepat</span></td>
              <td><button style={{border:'none', background:'var(--primary)', color:'white', padding:'4px 8px', borderRadius:'4px', cursor:'pointer'}}>Tegur Pengajar</button></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AkademikEvaluasi;
