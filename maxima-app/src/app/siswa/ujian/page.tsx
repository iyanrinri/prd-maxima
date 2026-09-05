import { getSession } from '@/lib/auth';
import { redirect } from 'next/navigation';

export default async function SiswaUjianPage() {
  const session = await getSession();
  if (!session || session.role !== 'siswa') redirect('/');

  // const siswa = await prisma.siswa.findFirst({
  //   where: { email: session.email }, // Mock lookup, sebenarnya by noKontrak/id
  //   include: {
  //     ujians: true
  //   }
  // });
  
  // Mock data untuk MVP UI
  const siswa = {
    ujians: [
      { id: 1, tanggal: new Date(), namaUjian: 'Goethe Zertifikat A1', nilai: 85, lulus: true }
    ]
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Ujian Sertifikasi</h1>
        <p className="text-gray-500 mt-1">Kelola dan input hasil ujian resmi sertifikasi bahasa Anda.</p>
      </div>

      <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Input Hasil Ujian Baru</h3>
        <form className="space-y-4 max-w-xl">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Nama Sertifikasi</label>
            <select className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-blue-500 focus:border-blue-500">
              <option>Goethe Zertifikat A1</option>
              <option>Goethe Zertifikat A2</option>
              <option>Goethe Zertifikat B1</option>
              <option>Goethe Zertifikat B2</option>
            </select>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Total Nilai</label>
              <input type="number" placeholder="Contoh: 85" className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-blue-500 focus:border-blue-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Status Kelulusan</label>
              <select className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-blue-500 focus:border-blue-500">
                <option>Lulus</option>
                <option>Tidak Lulus</option>
              </select>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Upload Bukti Sertifikat</label>
            <input type="file" className="w-full border border-gray-300 rounded-lg px-4 py-2 bg-gray-50 text-gray-600 cursor-not-allowed" disabled />
            <p className="text-xs text-gray-500 mt-1">*(Fitur upload dokumen belum tersedia di versi MVP)*</p>
          </div>
          <div className="pt-2">
            <button type="button" className="bg-blue-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-700 transition">
              Simpan Data Ujian
            </button>
          </div>
        </form>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden mt-8">
        <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
          <h3 className="font-semibold text-gray-900">Riwayat Ujian Anda</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-white text-gray-500 border-b">
              <tr>
                <th className="px-6 py-3 font-medium">Tanggal Input</th>
                <th className="px-6 py-3 font-medium">Nama Ujian</th>
                <th className="px-6 py-3 font-medium">Nilai</th>
                <th className="px-6 py-3 font-medium">Status</th>
                <th className="px-6 py-3 font-medium">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              <tr className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 text-gray-500">10 Sept 2026</td>
                <td className="px-6 py-4 font-medium text-gray-900">Goethe Zertifikat A1</td>
                <td className="px-6 py-4 font-bold text-gray-700">85</td>
                <td className="px-6 py-4">
                  <span className="px-2.5 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full">Lulus</span>
                </td>
                <td className="px-6 py-4">
                  <button className="text-blue-600 hover:text-blue-800 font-medium">Detail</button>
                </td>
              </tr>
              {(!siswa || (siswa.ujians && siswa.ujians.length === 0)) && (
                <tr className="hidden">
                  <td colSpan={5} className="px-6 py-8 text-center text-gray-500">
                    Belum ada riwayat ujian yang diinput.
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
