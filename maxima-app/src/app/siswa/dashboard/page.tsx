import { getSession } from '@/lib/auth';
import { prisma } from '@/lib/db';
import { redirect } from 'next/navigation';

export default async function SiswaDashboardPage() {
  const session = await getSession();
  if (!session) redirect('/');

  // Ambil data siswa (berdasarkan email dummy login)
  // Di sistem nyata, login menggunakan noKontrak atau email siswa
  // Untuk MVP, karena di seeder kita tidak menyimpan email di tabel Siswa, kita ambil siswa pertama saja
  // Jika ini sistem nyata, field email harus ada di tabel Siswa.
  const siswa = await prisma.siswa.findFirst({
    include: {
      paket: true,
      pembayarans: true,
    }
  });

  if (!siswa) {
    return <div>Data siswa tidak ditemukan.</div>;
  }

  // Hitung total pembayaran Rupiah
  const totalDibayar = siswa.pembayarans.reduce((sum, p) => sum + p.nominalRupiah, 0);
  const persentase = Math.min(100, Math.round((totalDibayar / siswa.paket.hargaRupiah) * 100));

  // Hitung Gatekeeper (Ambang Batas)
  const isA2Open = true; // Anggap gratis bawaan
  const isB1Open = true; // Anggap gratis bawaan
  const isPasporOpen = siswa.paket.ambangPaspor ? totalDibayar >= siswa.paket.ambangPaspor : false;
  const isUjianOpen = siswa.paket.ambangUjian ? totalDibayar >= siswa.paket.ambangUjian : false;
  const isBerkasOpen = siswa.paket.ambangPemberkasan ? totalDibayar >= siswa.paket.ambangPemberkasan : false;
  const isKontrakOpen = siswa.paket.ambangKontrak ? totalDibayar >= siswa.paket.ambangKontrak : false;

  const formatRp = (angka: number) => new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(angka);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Beranda Siswa</h1>
        <p className="text-gray-500 mt-1">Ringkasan status kursus dan penempatan Anda.</p>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {/* Profil Singkat Siswa */}
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold text-gray-900">{siswa.namaLengkap}</h2>
            <p className="text-gray-500 text-sm mt-1">{siswa.noKontrak}</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-sm">
            <div>
              <p className="text-gray-500 mb-1">Program</p>
              <p className="font-semibold text-gray-900">{siswa.program}</p>
            </div>
            <div>
              <p className="text-gray-500 mb-1">Cabang</p>
              <p className="font-semibold text-gray-900">{siswa.cabang}</p>
            </div>
            <div>
              <p className="text-gray-500 mb-1">Status</p>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                {siswa.status}
              </span>
            </div>
            <div>
              <p className="text-gray-500 mb-1">PIC Konsultan</p>
              <p className="font-semibold text-gray-900">Admin Maxima</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
          <h3 className="text-sm font-medium text-gray-500">Status Pembayaran</h3>
          <p className="text-xl font-bold text-gray-900 mt-2">{formatRp(totalDibayar)} / {formatRp(siswa.paket.hargaRupiah)}</p>
          <div className="w-full bg-gray-200 rounded-full h-2 mt-4">
            <div className="bg-blue-600 h-2 rounded-full transition-all" style={{ width: `${persentase}%` }}></div>
          </div>
          <p className="text-xs text-gray-500 mt-2">Anda telah melunasi {persentase}% biaya {siswa.paket.nama}.</p>
        </div>
        
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
          <h3 className="text-sm font-medium text-gray-500">Progres Layanan (Gatekeeper)</h3>
          <ul className="mt-4 space-y-3">
            <li className="flex items-center text-sm">
              <span className={`w-4 h-4 rounded-full mr-3 ${isA2Open ? 'bg-green-500' : 'bg-gray-200'}`}></span>
              Kursus A2 {isA2Open ? '(Terbuka)' : '(Terkunci)'}
            </li>
            <li className="flex items-center text-sm">
              <span className={`w-4 h-4 rounded-full mr-3 ${isB1Open ? 'bg-green-500' : 'bg-gray-200'}`}></span>
              Kursus B1 {isB1Open ? '(Terbuka)' : '(Terkunci)'}
            </li>
            <li className={`flex items-center text-sm ${isPasporOpen ? 'text-gray-900' : 'text-gray-400'}`}>
              <span className={`w-4 h-4 rounded-full mr-3 ${isPasporOpen ? 'bg-green-500' : 'bg-gray-200'}`}></span>
              Paspor {isPasporOpen ? '(Terbuka)' : `(Terkunci, Butuh ${formatRp(siswa.paket.ambangPaspor || 0)})`}
            </li>
            <li className={`flex items-center text-sm ${isUjianOpen ? 'text-gray-900' : 'text-gray-400'}`}>
              <span className={`w-4 h-4 rounded-full mr-3 ${isUjianOpen ? 'bg-green-500' : 'bg-gray-200'}`}></span>
              Ujian Sertifikasi {isUjianOpen ? '(Terbuka)' : `(Terkunci, Butuh ${formatRp(siswa.paket.ambangUjian || 0)})`}
            </li>
            <li className={`flex items-center text-sm ${isKontrakOpen ? 'text-gray-900' : 'text-gray-400'}`}>
              <span className={`w-4 h-4 rounded-full mr-3 ${isKontrakOpen ? 'bg-green-500' : 'bg-gray-200'}`}></span>
              Pencarian Kontrak {isKontrakOpen ? '(Terbuka)' : `(Terkunci, Butuh ${formatRp(siswa.paket.ambangKontrak || 0)})`}
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
