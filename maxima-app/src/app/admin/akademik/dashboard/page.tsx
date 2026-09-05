import { getSession } from '@/lib/auth';
import { prisma } from '@/lib/db';
import { redirect } from 'next/navigation';
import Link from 'next/link';

export default async function AkademikDashboardPage({
  searchParams
}: {
  searchParams?: { cabang?: string }
}) {
  const session = await getSession();
  if (!session || (session.role !== 'admin' && session.role !== 'kepala_akademik')) redirect('/');

  const cabangFilter = searchParams?.cabang || 'Semua Cabang';
  const isFiltered = cabangFilter !== 'Semua Cabang';

  const totalSiswa = await prisma.siswa.count({ where: isFiltered ? { cabang: cabangFilter } : undefined });
  const totalKelas = await prisma.kelas.count();
  const totalPengajar = await prisma.pengajar.count();

  const semuaSiswa = await prisma.siswa.findMany({
    where: isFiltered ? { cabang: cabangFilter } : undefined,
    include: {
      kehadirans: true,
      nilais: true,
      kelas: true,
      tugas: true,
      ujians: true
    }
  });

  const jadwalGlobal = await prisma.jadwalAkademik.findMany({
    include: { kelas: true },
    orderBy: { tanggal: 'asc' },
    take: 5
  });

  // Calculate Rata-rata global
  const totalHadir = semuaSiswa.reduce((acc, s) => acc + s.kehadirans.filter(k => k.status === 'Hadir').length, 0);
  const totalKehadiranRecord = semuaSiswa.reduce((acc, s) => acc + s.kehadirans.length, 0);
  
  const totalNilai = semuaSiswa.reduce((acc, s) => {
    if (s.nilais.length > 0) {
      const n = s.nilais[0];
      return acc + (n.lesen + n.horen + n.schreiben + n.sprechen + n.grammatik + n.wortschatz) / 6;
    }
    return acc;
  }, 0);
  
  const totalNilaiRecord = semuaSiswa.filter(s => s.nilais.length > 0).length;

  const currentMonth = new Date().getMonth();
  const currentYear = new Date().getFullYear();
  const siswaMasukBulanIni = semuaSiswa.filter(s => s.createdAt.getMonth() === currentMonth && s.createdAt.getFullYear() === currentYear).length;
  
  const siswaSelesaiLevel = semuaSiswa.filter(s => s.kelas?.status === 'Selesai' || s.status === 'Lulus').length;

  const siswaBerisiko = semuaSiswa.filter(s => {
    const hadir = s.kehadirans.filter(k => k.status === 'Hadir').length;
    const totalK = s.kehadirans.length;
    const persenHadir = totalK > 0 ? (hadir / totalK) * 100 : 100;

    let avgNilai = 100;
    if (s.nilais.length > 0) {
      const n = s.nilais[0];
      avgNilai = (n.lesen + n.horen + n.schreiben + n.sprechen + n.grammatik + n.wortschatz) / 6;
    }

    const tugasTidakSelesai = s.tugas.filter(t => !t.selesai).length;
    const ujianGagal = s.ujians.filter(u => !u.lulus).length;
    
    const progressTertinggal = (s.kelas?.bab || 0) > 2 && s.tugas.length === 0;

    return persenHadir < 70 || avgNilai < 60 || tugasTidakSelesai > 3 || ujianGagal > 0 || progressTertinggal;
  });

  const rataKehadiran = totalKehadiranRecord > 0 ? Math.round((totalHadir / totalKehadiranRecord) * 100) : 0;
  const rataNilai = totalNilaiRecord > 0 ? Math.round(totalNilai / totalNilaiRecord) : 0;

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard Kepala Akademik</h1>
          <p className="text-gray-500 mt-1">Ringkasan performa siswa, kelas, dan pengajar.</p>
        </div>
        
        <div className="flex items-center space-x-2 bg-white rounded-lg border border-gray-200 px-3 py-2">
          <span className="text-sm font-medium text-gray-500">Filter Cabang:</span>
          <select 
            className="text-sm font-bold text-gray-900 bg-transparent border-none focus:ring-0 cursor-pointer"
            defaultValue={cabangFilter}
            // in a real app, this would use a Client Component router.push. for now it's just visually there for MVP
          >
            <option value="Semua Cabang">Semua Cabang</option>
            <option value="Pusat">Pusat (Jakarta)</option>
            <option value="Bandung">Cabang Bandung</option>
          </select>
        </div>
      </div>

      {/* TOP KPI */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
        <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
          <h3 className="text-xs font-medium text-gray-500 leading-tight h-8">Total Siswa</h3>
          <p className="text-2xl font-bold text-blue-600 mt-1">{totalSiswa}</p>
        </div>
        <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
          <h3 className="text-xs font-medium text-gray-500 leading-tight h-8">Siswa Baru (Bulan Ini)</h3>
          <p className="text-2xl font-bold text-teal-600 mt-1">+{siswaMasukBulanIni}</p>
        </div>
        <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
          <h3 className="text-xs font-medium text-gray-500 leading-tight h-8">Selesai Level</h3>
          <p className="text-2xl font-bold text-emerald-600 mt-1">{siswaSelesaiLevel}</p>
        </div>
        <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
          <h3 className="text-xs font-medium text-gray-500 leading-tight h-8">Total Kelas</h3>
          <p className="text-2xl font-bold text-gray-900 mt-1">{totalKelas}</p>
        </div>
        <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
          <h3 className="text-xs font-medium text-gray-500 leading-tight h-8">Pengajar Aktif</h3>
          <p className="text-2xl font-bold text-gray-900 mt-1">{totalPengajar}</p>
        </div>
        <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
          <h3 className="text-xs font-medium text-gray-500 leading-tight h-8">Rata-rata Kehadiran</h3>
          <p className="text-2xl font-bold text-green-600 mt-1">{rataKehadiran}%</p>
        </div>
        <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
          <h3 className="text-xs font-medium text-gray-500 leading-tight h-8">Rata-rata Nilai</h3>
          <p className="text-2xl font-bold text-indigo-600 mt-1">{rataNilai}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Progress Level (Demografi) */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 lg:col-span-1">
          <h3 className="font-semibold text-gray-900 mb-4">Progress Level (Demografi)</h3>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="font-medium">Level A1</span>
                <span>{semuaSiswa.filter(s => s.kelas?.level === 'A1').length} Siswa</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2"><div className="bg-blue-600 h-2 rounded-full" style={{width: '60%'}}></div></div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="font-medium">Level A2</span>
                <span>{semuaSiswa.filter(s => s.kelas?.level === 'A2').length} Siswa</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2"><div className="bg-indigo-600 h-2 rounded-full" style={{width: '20%'}}></div></div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="font-medium">Level B1</span>
                <span>{semuaSiswa.filter(s => s.kelas?.level === 'B1').length} Siswa</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2"><div className="bg-emerald-600 h-2 rounded-full" style={{width: '10%'}}></div></div>
            </div>
          </div>
        </div>

        {/* Jadwal Akademik Global */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 lg:col-span-2">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-semibold text-gray-900">Jadwal Akademik Terdekat</h3>
            <Link href="/admin/akademik/kalender" className="text-sm text-blue-600 hover:underline">Lihat Semua</Link>
          </div>
          <div className="space-y-3">
            {jadwalGlobal.map(j => (
              <div key={j.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-100">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-white rounded-lg border border-gray-200 flex flex-col items-center justify-center">
                    <span className="text-xs text-red-500 font-bold">{j.tanggal.toLocaleDateString('id-ID', { month: 'short' })}</span>
                    <span className="text-lg font-bold text-gray-900 leading-none">{j.tanggal.getDate()}</span>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">{j.jenis} - {j.kelas?.nama || 'Global'}</h4>
                    <p className="text-xs text-gray-500">{j.keterangan} • {j.jamMulai} - {j.jamSelesai}</p>
                  </div>
                </div>
                <span className="px-2.5 py-1 text-xs font-medium bg-amber-100 text-amber-800 rounded-full">{j.status}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Tabel Siswa Berisiko Lengkap */}
      <div className="bg-white rounded-xl border border-red-200 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-red-200 bg-red-50 flex justify-between items-center">
          <h3 className="font-semibold text-red-900">Peringatan Dini: Siswa Berisiko Tinggi</h3>
          <span className="px-3 py-1 bg-red-600 text-white text-xs font-bold rounded-full">{siswaBerisiko.length} Siswa</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-white text-gray-500 border-b">
              <tr>
                <th className="px-6 py-3 font-medium">Siswa & Kelas</th>
                <th className="px-6 py-3 font-medium">Kehadiran</th>
                <th className="px-6 py-3 font-medium">Nilai</th>
                <th className="px-6 py-3 font-medium">Alasan Berisiko (Sistem)</th>
                <th className="px-6 py-3 font-medium text-center">Tindakan</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {siswaBerisiko.map((s) => {
                const hadir = s.kehadirans.filter(k => k.status === 'Hadir').length;
                const totalK = s.kehadirans.length;
                const persenHadir = totalK > 0 ? Math.round((hadir / totalK) * 100) : 0;
                
                let avgNilai = 0;
                if (s.nilais.length > 0) {
                  const n = s.nilais[0];
                  avgNilai = Math.round((n.lesen + n.horen + n.schreiben + n.sprechen + n.grammatik + n.wortschatz) / 6);
                }

                const tugasTidakSelesai = s.tugas.filter(t => !t.selesai).length;
                const ujianGagal = s.ujians.filter(u => !u.lulus).length;
                const progressTertinggal = (s.kelas?.bab || 0) > 2 && s.tugas.length === 0;

                const alasan = [];
                if (persenHadir < 70) alasan.push('Kehadiran Rendah');
                if (avgNilai > 0 && avgNilai < 60) alasan.push('Nilai Merosot');
                if (tugasTidakSelesai > 0) alasan.push(`${tugasTidakSelesai} Tugas Bolong`);
                if (ujianGagal > 0) alasan.push('Gagal Ujian');
                if (progressTertinggal) alasan.push('Progress Tertinggal');
                if ((avgNilai > 0 && avgNilai < 60) && persenHadir < 70) alasan.push('Berisiko Tidak Capai B1/B2');

                return (
                  <tr key={s.id} className="hover:bg-red-50/50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="font-medium text-gray-900">{s.namaLengkap}</div>
                      <div className="text-gray-500 text-xs">{s.kelas?.nama || 'Belum ada kelas'}</div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`font-semibold ${persenHadir < 70 ? 'text-red-600' : 'text-green-600'}`}>{persenHadir}%</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`font-semibold ${avgNilai < 60 && avgNilai > 0 ? 'text-red-600' : 'text-green-600'}`}>{avgNilai || '-'}</span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-wrap gap-1">
                        {alasan.map((al, i) => (
                          <span key={i} className={`px-2 py-0.5 text-xs rounded-md border ${al === 'Berisiko Tidak Capai B1/B2' ? 'bg-red-600 text-white font-bold border-red-700' : 'bg-red-100 text-red-700 border-red-200'}`}>{al}</span>
                        ))}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <button className="text-xs px-3 py-1.5 bg-gray-900 text-white rounded-md hover:bg-gray-800 transition">Intervensi</button>
                    </td>
                  </tr>
                );
              })}
              {siswaBerisiko.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-6 py-8 text-center text-gray-500">
                    Semua siswa dalam kondisi aman.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
