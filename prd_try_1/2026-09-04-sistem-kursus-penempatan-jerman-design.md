# Sistem Manajemen Kursus & Penempatan Kerja Jerman — Dokumen Desain

**Klien:** PT. Maxima Sinergi Indonesia Jerman (Maxima Stiftung)
**Tanggal:** 4 September 2026
**Status:** Desain disetujui, siap masuk tahap rencana implementasi

---

## 1. Ringkasan

Satu sistem, sembilan pintu masuk, di atas satu tulang punggung data. Menggantikan enam berkas spreadsheet berisi 50 tab yang saling menyalin lewat `IMPORTRANGE`.

### Masalah yang diselesaikan

Ditetapkan dari dua jawaban pengarah di awal diskusi:

1. Masalah terbesar hari ini adalah **staf kewalahan** — semua manual, tiap divisi punya spreadsheet sendiri.
2. Pekerjaan manual yang paling makan jam adalah **rekap laporan** dari beberapa berkas.

### Prinsip perancangan

**Dirancang mundur dari laporan.** Ditentukan dulu angka apa yang harus keluar tiap minggu, lalu diturunkan ke belakang: data minimum apa yang wajib dicatat, siapa mencatatnya, kapan. Kolom yang tidak menyumbang ke satu pun laporan atau keputusan dibuang.

**Pemilik data tunggal.** Setiap data punya satu layar tempat ia boleh diubah. Layar lain hanya menampilkan.

**Angka turunan tidak pernah diketik.** Semua yang bisa dihitung, dihitung.

### Batasan yang diterima

- Laporan otomatis hanya sebagus disiplin pencatatan harian. Entri data menjadi kewajiban, bukan pilihan.
- Angka konversi lead tidak dapat dihitung, karena calon siswa yang batal tidak pernah masuk sistem.

---

## 2. Konteks: temuan dari data lama

Enam berkas, 50 tab, dibaca seluruhnya termasuk rumusnya.

| Temuan | Angka |
|---|---|
| Siswa unik di keenam berkas | **733** |
| Siswa yang berada di luar DATABASE_PUSAT | **0** |
| Tab berisi 733 baris yang sama | 10 |
| Kolom identitas yang berulang di hampir semua tab | 8 |
| Total tab | 50 (1 tersembunyi: Daftar Partner) |

**Tidak ada data yatim dan tidak ada versi yang bertengkar.** Database_Marketing hanya memuat 557 dari 733 siswa — itu ketertinggalan, bukan simpangan. Migrasi karena itu jauh lebih ringan dari perkiraan awal.

### Yang sudah dibangun klien sendiri

Berkas Finance dan Admission penuh `IMPORTRANGE`, `QUERY`, `FILTER`, `XLOOKUP`, dan `MAP/LAMBDA` yang menarik data antar-berkas. Klien sudah membangun basis data terdistribusi secara manual. Masalahnya bukan ketiadaan sistem, melainkan kerapuhannya: satu tab dipindah, seluruh rantai putus.

### Bukti rekap manual meleset

Sheet "Data Cepat" di DATABASE_PUSAT menghitung total tiga kali dengan tiga hasil berbeda: **735, 733, 998.**

### Aset paling berharga

Sheet "Kontrak Siswa" di berkas Finance: matriks 16 paket × 9 ambang nominal layanan, plus dana talang Indonesia dan Jerman. Aturan gerbang layanan sudah lengkap datanya dan tidak perlu ditanyakan lagi ke klien.

### Kelengkapan data (733 siswa)

| Kolom | Kosong |
|---|---|
| Status, Cabang, Program | 0% |
| No Siswa (kontak) | 46% |
| Konsultan / PIC | 61% |
| Pendidikan | 63% |
| Jurusan Program, Alamat | 68% |
| Tanggal Pembayaran | 78% |
| Harga Layanan (ada di berkas Finance) | 89% |
| Tanggal Lahir | 93% |
| Mulai Les Bahasa | 94% |

Nilai dan absensi **hanya ada untuk cabang Bandung** (172 siswa). 561 siswa di sepuluh cabang lain tidak punya riwayat akademik sama sekali.

---

## 3. Tulang punggung data — 21 tabel

### Rumpun Identitas

1. **Siswa** — identitas, kontak, alamat, pendidikan, pengalaman kerja, cabang, program, jurusan, status, sumber lead, PIC Konsultan
2. **Pengguna & Peran** — akun, peran, cakupan cabang
3. **Master Data** — cabang, program, jurusan program, level, jenis dokumen, jenis sertifikat

### Rumpun Uang

4. **Paket** — 16 paket: harga Rupiah & Euro, sembilan ambang layanan (Rupiah dan Euro), dana talang Indonesia & Jerman
5. **Kontrak Siswa** — siswa × paket, potongan, harga akhir, tanggal DP
6. **Pembayaran** — satu baris satu transaksi: jalur, tanggal, nominal, cicilan ke-N, metode, penerima, pengesah, status

### Rumpun Belajar

7. **Kelas** — nama, level, cabang, pengajar, jadwal
8. **Pendaftaran Kelas** — siswa × kelas × level
9. **Kehadiran** — satu baris satu siswa satu pertemuan
10. **Nilai** — siswa × level × komponen: Kapitel 1–12, Punkte, Großtest, Endtest 4 modul, Simulasi 1–3
11. **Progres KBM** — siswa × bulan: posisi kurikulum
12. **Raport** — siswa × level × periode
13. **Penilaian Sikap** — siswa × level × periode × 10 aspek
14. **Sertifikat** — siswa × jenis × level: 4 modul, masa berlaku per modul, keterangan per modul, tanggal ujian ulang

### Rumpun Berkas & Layanan

15. **Dokumen** — siswa × jenis, empat rumpun
16. **Layanan Siswa** — siswa × sembilan layanan: status gerbang, progres, hasil

### Rumpun Penempatan

17. **Partner** — ID, nama, status, kategori, PIC
18. **Pengajuan ke Partner** — siswa × partner × posisi, 11 status progres, catatan partner & admission
19. **Latihan Wawancara** — siswa × posisi × tanggal × wawancara ke-N
20. **Penempatan** — perusahaan, jenis visa, kota/Bundesland, tanggal, berkas
21. **Pengajuan Cuti** — siswa, kelas saat ini, level & bab terakhir, alasan, tanggal mulai, tanggal rencana masuk, tujuh persetujuan ketentuan, berkas tanda tangan, verifikasi Finance, pelaksanaan Admission

> Tabel **Lead** yang sempat dirancang dihapus. Sumber lead menjadi kolom pada tabel Siswa, diisi siswa saat pendaftaran. Sebagai gantinya **Penilaian Sikap** (13) dipisah dari Raport, karena sepuluh aspeknya diisi per periode dan selama ini hilang begitu template raport dipakai ulang.

### Peta pemilik data

| Data | Diubah di | Ditampilkan di |
|---|---|---|
| Identitas siswa | Pendaftaran (Konsultan) | semua peran |
| Status siswa | Ubah Status Siswa (Admission) | semua peran |
| Pengajuan cuti | Pengajuan Cuti (Siswa) → Verifikasi (Manajer Finance) → Ubah Status (Admission) | Siswa, Finance, Admission, Akademik |
| Pembayaran Rupiah | Payment gateway (otomatis) | Siswa, Finance, dashboard |
| Pembayaran Euro | Input Tunai (Staf Finance) → Pengesahan (Manajer Finance) | Siswa, Finance |
| Status 9 layanan | *tidak diketik siapa pun* — dihitung | Finance, Admission, Siswa |
| Kehadiran & nilai | Absensi, Input Nilai (Pengajar) | Kepala Pengajar, Raport, Siswa |
| Sikap & catatan | Sikap & Catatan (Pengajar) | Raport, Siswa |
| Sertifikat | Sertifikat (Kepala Pengajar) | Admission, Siswa |
| Dokumen | Verifikasi Dokumen (Admission) | Siswa |
| Progres partner | Pengajuan ke Partner (Admission) | Siswa, dashboard |
| Penempatan | Penempatan & Alumni (Admission) | Marketing, Siswa |

### Struktur dokumen — empat rumpun

| Rumpun | Isi | Asal |
|---|---|---|
| **1. Pribadi** | Akta Lahir, Kartu Keluarga, KTP, Ijazah terakhir, Transkrip terakhir, Pas Foto | Siswa unggah di awal, syarat pendaftaran |
| **2. Hasil Layanan** | Paspor, Terjemah Akta Lahir, Terjemah Ijazah & Transkrip, Apostille Akta Lahir, Apostille Ijazah | Maxima produksi, terbuka lewat gerbang pembayaran |
| **3. Bewerbung** | Sertifikat B1, Lebenslauf, Motivationsschreiben, Video Perkenalan | Disiapkan saat siswa siap diajukan ke partner |
| **4. Dari Betrieb** | Vertrag, Krankenversicherung, IHK, Rahmenplan, dan lainnya | Datang dari Jerman setelah dapat kontrak |

Rumpun 4 berupa **daftar bebas** — penambah berkas memberi label sendiri. Jumlah dan jenisnya berbeda tiap betrieb, jadi tidak boleh dibuat sebagai kolom tetap.

Berkas sertifikat B1 menempel pada data Sertifikat, bukan menjadi dokumen terpisah.

---

## 4. Mesin hitung

Seluruh isi bagian ini tidak diketik siapa pun.

### 4.1 Gerbang layanan

Untuk tiap siswa, total pembayaran Rupiah yang masuk dibandingkan dengan ambang layanan pada paketnya. Lewat ambang, layanan terbuka.

Contoh paket Ausbildung - 36:

| Layanan | Ambang |
|---|---|
| Kursus A2 | Rp 10.000.000 |
| Kursus B1 | Rp 15.000.000 |
| Paspor | Rp 21.000.000 |
| Ujian | Rp 25.000.000 |
| Workshop | Rp 28.000.000 |
| Pemberkasan | Rp 30.000.000 |
| Pencarian Kontrak | Rp 33.000.000 |
| Aplikasi Visa | Rp 36.000.000 |

Paket berdana talang memakai kurva berbeda. Ausbildung Dantal - 36 menaruh enam layanan terakhir seluruhnya di Rp 25.000.000 karena sisanya ditalangi.

**Nilai 0 tidak sama dengan sel kosong.**

- `0` → layanan termasuk paket dan langsung terbuka
- kosong → layanan **tidak termasuk** paket itu

Contoh: paket ADM - 7 menaruh Ujian pada 0 (termasuk, langsung terbuka) sementara Pencarian Kontrak dan Aplikasi Visa dikosongkan (tidak termasuk). Jika keduanya diperlakukan sama, siswa Admission Only akan melihat layanan yang tidak pernah mereka beli.

### 4.2 Dua jalur pembayaran

| | Jalur Rupiah | Jalur Euro |
|---|---|---|
| Cara bayar | Payment gateway (VA, transfer, QRIS) | Tunai ke Staf Finance cabang |
| Cicilan | Ya, DP + ke-1 hingga ke-14 | Belum diketahui |
| Pencatatan | Otomatis dari gateway | Diketik Staf Finance |
| Pengesahan | Tidak perlu | Wajib, oleh Manajer Finance |
| Berlaku sejak | Transaksi berhasil | Manajer menyetujui |
| Menggerakkan gerbang | Ya | Tidak (lihat asumsi terbuka) |

Status pembayaran Euro: **dicatat → disahkan → berlaku.** Penolakan ditandai batal beserta alasan, tidak dihapus — yang dihapus tidak bisa diaudit.

**Dua saldo berjalan paralel dan tidak pernah dijumlahkan.** Tidak ada kurs di dalam sistem; konversi otomatis akan membuat angka historis berubah setiap kurs bergerak.

Sebagai pengganti pengesahan pada jalur Rupiah: setiap pencatatan terekam di log aktivitas.

### 4.3 Angka turunan

| Angka | Dihitung dari |
|---|---|
| Sudah dibayar Rp / € | jumlah semua pembayaran sah |
| Kekurangan | harga setelah potongan − sudah dibayar |
| Status pembayaran | Lunas bila kekurangan ≤ 0 |
| Jumlah transaksi, pembayaran terakhir | hitung dan tanggal terbesar |
| Status 9 layanan | pembayaran vs ambang paket |
| Kehadiran % | hadir ÷ seharusnya (masa cuti tidak menambah "seharusnya") |
| Punkte per level | rata-rata Kapitel |
| Status Belajar | Lulus / Mengulang terhadap KKM 80 |
| Jumlah diproses, jumlah gagal | hitung baris Pengajuan Partner |
| Partner & progres terakhir | pengajuan terbaru |
| Funnel Admission 9 tahap | hitung siswa per status |
| Kelengkapan dokumen per rumpun | terverifikasi ÷ wajib |
| Performa konsultan | hitung siswa per PIC |
| Status Alumni | menyala saat tanggal keberangkatan terisi |

### 4.4 Aturan cuti

Cuti punya gerbangnya sendiri, terpisah dari sembilan gerbang layanan.

**Gerbang pengajuan:** total pembayaran harus mencapai **Batas Minimum** pada paket siswa. Kolom ini sudah ada di matriks paket tetapi **kosong di seluruh 16 paket** — harus diisi Finance sebelum modul cuti dapat berjalan.

**Aturan yang dijaga sistem:**

| Aturan | Penerapan |
|---|---|
| Maksimal 6 bulan | Batas dihitung dari tanggal mulai; sistem menandai bila terlampaui |
| Hanya satu kali selama menjadi siswa | Pengajuan kedua ditolak |
| Lewat 6 bulan tanpa kembali | Ditandai "cuti lewat batas"; Admission memutuskan, sistem tidak mengubah status diam-diam |
| Penempatan saat kembali | Level terakhir diambil dari Progres KBM |
| Turun level saat kembali | Ditandai "perlu tagihan selisih" untuk Finance |

Tujuh butir ketentuan dan pernyataan persetujuan disimpan sebagai bagian pengajuan, beserta berkas tanda tangan, agar persetujuan siswa terekam pada saat pengajuan — bukan hanya di formulir yang terpisah dari sistem.

### 4.5 Reminder pembayaran

Terbit otomatis tanggal 20, hari-H tanggal 29, dan tujuh hari sesudahnya, ke nomor siswa dan orang tua. Dua rangkaian terpisah untuk Rupiah dan Euro. **Dihentikan selama siswa berstatus Cuti.**

---

## 5. Peran dan cakupan

Sembilan peran. Tiga divisi masing-masing punya staf dan kepala.

| Peran | Inti pekerjaan | Cakupan |
|---|---|---|
| **Siswa** | Mengisi data, mengunggah berkas, membayar, memantau | Dirinya sendiri |
| **Konsultan** | Mendaftarkan siswa, mendampingi sebagai PIC tunggal | Siswa yang ia jadi PIC-nya |
| **Kepala Marketing** | Performa konsultan, sumber lead, sebaran program | Semua cabang |
| **Staf Finance** | Terima tunai Euro, cetak kwitansi, pantau cabang | Satu cabang |
| **Manajer Finance** | Paket & ambang, sahkan tunai, piutang, laporan | Semua cabang |
| **Pengajar** | Absensi, nilai, sikap, catatan, progres materi | Kelas yang ia ampu |
| **Kepala Pengajar** | Kelas & jadwal, monitoring, raport, sertifikat | Satu cabang |
| **Admission** | Dokumen, layanan, partner, wawancara, visa, penempatan, status siswa | Semua cabang |
| **Super Admin** | Pengguna, master data, template cetak, log | Semua |

Sebelas cabang: Bandung, Cirebon, Tasikmalaya, Batam, Lampung, Lombok, Blitar, Surabaya, Yogyakarta, Tasikmalaya-Bima, Pusat.

**Tidak ada peran Kepala Cabang terpisah.** Kepala Pengajar sudah bercakupan satu cabang dan seluruh laporan "per cabang" dihasilkan dari filter yang sama.

### Rantai perpindahan tanggung jawab

Konsultan mendaftarkan → **oper ke** Finance saat pembayaran pertama masuk → **oper ke** Pengajar saat siswa masuk kelas → **oper ke** Kepala Pengajar saat sertifikat terbit → **oper ke** Admission untuk berkas, partner, dan visa → **kembali ke** Marketing sebagai data alumni.

Dua aturan yang harus dinyatakan terang:

- **Marketing tidak menyentuh rantai operasional setelah pendaftaran.** Konsultan tetap PIC dan pendamping, tapi tidak memegang langkah kerja apa pun. Kepala Marketing hanya membaca laporan.
- **Finance tidak meneruskan ke siapa-siapa.** Gerbang sembilan layanan terbuka sendiri dari nominal yang masuk.

### Status siswa

Daftar status: **Aktif, Cuti, Alumni, Mengundurkan Diri, Selesai Kursus.**

Status "TIDAK ADA INFORMASI" dihapus — itu penanda data belum lengkap, bukan keadaan siswa, dan mencemari laporan status. Diganti penanda kelengkapan data terpisah.

Saat berstatus **Cuti**: siswa keluar dari daftar kelas, kehadiran berhenti dihitung, tagihan dan reminder ditunda. Posisi kurikulum terakhir tersimpan di Progres KBM sebagai dasar penempatan saat kembali. Aturan cuti selengkapnya di bagian 4.4.

---

## 6. Modul dan sub-modul

### Siswa

| Modul | Sub-modul |
|---|---|
| Dashboard | Ringkasan status · Langkah berikutnya · PIC saya |
| Profil & Dokumen | Data diri · Unggah dokumen · Status verifikasi per berkas |
| Pembayaran | Ringkasan tagihan Rp & € · Riwayat & kwitansi · Bayar via gateway |
| Pembelajaran | Kelas & jadwal · Kehadiran · Nilai per Kapitel · Raport per level |
| Sertifikat Bahasa | Lihat nilai 4 modul & masa berlaku · Unggah berkas |
| Progres Layanan | 9 layanan dengan status gerbang · Unduh hasil |
| Progres Penempatan | Ringkasan partner · Jadwal latihan wawancara · Form alumni |

Siswa tidak mengetik nilai apa pun — bukan nilai kelas, bukan nilai sertifikat.

### Akademik — Kepala Pengajar

| Modul | Sub-modul |
|---|---|
| Dashboard Akademik | Total siswa/kelas/pengajar · Rata-rata kehadiran & nilai |
| Kelas & Jadwal | Master kelas · Jadwal mingguan |
| Kalender Akademik | Ujian · Remedial · Placement test · Libur · Pergantian pengajar |
| Monitoring Kelas | Progres materi · Kehadiran · Rata-rata nilai |
| Monitoring Pengajar | Kelas ditangani · Kelengkapan absensi & nilai · Evaluasi |
| Siswa Berisiko | Kehadiran rendah · Nilai rendah · Progres tertinggal · Berpotensi gagal B1/B2 |
| Ujian & Rekomendasi | Rekomendasi B1/B2 · Jadwal & pendaftaran ujian · Input hasil |
| Sertifikat | Verifikasi 4 modul · Masa berlaku · Tanggal ujian ulang |
| Raport & Kenaikan Level | Terbitkan raport · Sahkan kelulusan level |

### Akademik — Pengajar

| Modul | Sub-modul |
|---|---|
| Kelas Hari Ini | Jam, kelas, materi, status |
| Absensi | Hadir / Izin / Sakit / Alpha / Terlambat per pertemuan |
| Input Nilai | Nilai Bab (Kapitel 1–12) · Ujian Internal (Großtest, Endtest 4 modul, Simulasi 1–3) |
| Sikap & Catatan | 10 aspek skala BS/B/C/PB · Deskripsi belajar · Catatan pengajar |
| Progres Materi | Kapitel berjalan per kelas · Status Belajar · Status Bab |

### Marketing

**Kepala Marketing:** Dashboard · Performa Konsultan · Analisis Sumber Lead, Program & Demografi

**Konsultan:** Pendaftaran Siswa (form, kontrak, paket, kode promo) · Siswa Saya · Detail Siswa

### Finance

| Modul | Sub-modul |
|---|---|
| Dashboard KPI | Rupiah + Euro · Total tagihan, diterima, kekurangan · Lunas vs belum · Jatuh tempo |
| Master Paket | Harga Rp & € · Matriks 9 ambang · Dana talang ID & DE |
| Promo & Potongan | Kode promo · Nominal · Riwayat pemakaian |
| Tagihan Siswa | Kontrak · Cicilan ke-N · Jatuh tempo · Status |
| Input Pembayaran | Tunai Euro (Staf) · Pengesahan (Manajer) · Kwitansi otomatis |
| Reminder | Tanggal 20 · Hari-H 29 · H+7 · Ke siswa & orang tua |
| Dana Talang | Talangan Indonesia · Talangan Jerman · Kwitansi terpisah |
| Piutang | Per siswa: paket, dibayar, kekurangan, pembayaran terakhir |
| Laporan | Harian · Bulanan · Per program · Per paket · Per cabang |

Cash flow (cash in/out, refund, operasional) di luar lingkup inti — itu akuntansi, bukan operasional siswa.

### Admission

| Modul | Sub-modul |
|---|---|
| Dashboard Funnel | Belum diproses → diproses → interview → Vertrag → visa → berangkat → alumni |
| Verifikasi Dokumen | Rumpun Pribadi · Hasil Layanan · Bewerbung · Dari Betrieb |
| Layanan Siswa | 9 layanan · Status gerbang · Progres · Hasil |
| Master Partner | ID, nama, status, kategori, PIC |
| Pengajuan ke Partner | 11 status progres · Posisi · Catatan partner & admission |
| Latihan Wawancara | Tanggal, posisi, wawancara ke-N, catatan |
| Tracking Siswa | Turunan otomatis |
| Proses Visa | Pengajuan · Wawancara kedutaan · Terbit · Masa berlaku |
| Penempatan & Alumni | Perusahaan, kota/Bundesland, tanggal, berkas |
| Ubah Status Siswa | Status baru · Tanggal berlaku · Alasan · Unggah form |

**Sebelas status progres partner:** Masih Dicarikan Betrieb · Proses Bewerbung · Unterlagen Masuk · Unterlagen Pernah Masuk · Interview Partner · Menunggu Hasil Interview · Gagal Interview - Partner · Interview Betrieb · Gagal Interview - Betrieb · Dapat Vertrag · Tidak Lanjut Proses

### Super Admin

Pengguna & Hak Akses · Master Data · Template Cetak · Log Aktivitas

---

## 7. Daftar layar — 55

Tanda ✎ berarti layar itu pemilik data. **32 dari 55 layar menulis; 23 sisanya hanya menampilkan.**

| Peran | Layar |
|---|---|
| **Siswa** (8) | Dashboard · Profil ✎ · Dokumen Saya ✎ · Pembayaran ✎ · Pembelajaran · Progres Layanan · Progres Penempatan ✎ · Pengajuan Cuti ✎ |
| **Konsultan** (3) | Pendaftaran Siswa ✎ · Siswa Saya · Detail Siswa |
| **Kepala Marketing** (3) | Dashboard · Performa Konsultan · Analisis Sumber & Program |
| **Staf Finance** (4) | Input Pembayaran Tunai ✎ · Status Pembayaran Cabang · Cetak Kwitansi · Reminder Cabang |
| **Manajer Finance** (8) | Dashboard KPI · Master Paket & Ambang ✎ · Promo ✎ · Pengesahan Pembayaran Tunai ✎ · Verifikasi Pengajuan Cuti ✎ · Piutang · Dana Talang ✎ · Laporan Finance |
| **Pengajar** (5) | Kelas Hari Ini · Absensi ✎ · Input Nilai ✎ · Sikap & Catatan ✎ · Progres Materi ✎ |
| **Kepala Pengajar** (9) | Dashboard Akademik · Kelas & Jadwal ✎ · Kalender Akademik ✎ · Monitoring Kelas · Monitoring Pengajar · Siswa Berisiko · Rekomendasi & Jadwal Ujian ✎ · Sertifikat ✎ · Raport & Kenaikan Level ✎ |
| **Admission** (11) | Dashboard Funnel · Verifikasi Dokumen ✎ · Layanan Siswa ✎ · Master Partner ✎ · Pengajuan ke Partner ✎ · Latihan Wawancara ✎ · Tracking Siswa · Proses Visa ✎ · Penempatan & Alumni ✎ · Ubah Status Siswa ✎ · Detail Siswa |
| **Super Admin** (4) | Pengguna & Hak Akses ✎ · Master Data ✎ · Template Cetak ✎ · Log Aktivitas |

**Detail Siswa hanya satu layar**, isinya menyesuaikan peran — Konsultan tidak melihat catatan partner, Admission tidak melihat catatan konsultan. Ini pengganti sheet "Pencarian" yang dibuat manual di berkas Admission.

### Template cetak

Dikelola di satu layar Super Admin: **Kwitansi**, **Kwitansi Dana Talang**, dan **Raport**.

Susunan Raport, mengikuti bentuk yang sekarang dipakai:

- Identitas, pengajar, periode, tempat belajar
- **Nilai Bab** — Kapitel 1–12 terhadap KKM 80
- **Nilai Ujian Internal** — Großtest, Endtest Lesen/Hören/Schreiben/Sprechen terhadap KKM 80
- **Perkembangan Sikap dan Karakter** — Disiplin, Tanggung Jawab, Keaktifan, Kemandirian, Kerja Sama, Komunikasi, Sopan Santun, Motivasi Belajar, Kejujuran, Percaya Diri (skala BS / B / C / PB)
- **Presensi** — persentase kehadiran
- Deskripsi belajar dan catatan pengajar

Kunci raport: **siswa × level × periode.** Penamaan berkas otomatis mengikuti pola "Bulan - Tahun - Raport - Nama Siswa".

**Raport tidak dapat terbit bila absensi periode itu belum lengkap**, karena persentase kehadiran ikut tercetak.

### Dua makna kata "Ujian"

| | Ujian Internal | Ujian Sertifikasi |
|---|---|---|
| Isi | Großtest + 4 Endtest | Lesen, Hören, Schreiben, Sprechen |
| Penyelenggara | Maxima | Goethe / ÖSD / ECL |
| Masa berlaku | Tidak | Ya, per modul |
| Gunanya | Syarat naik level, masuk raport | Syarat masuk tahap penempatan |

---

## 8. Migrasi

### Induk data per kolom

| Data | Diambil dari |
|---|---|
| Identitas, status, cabang, program | DATABASE_PUSAT |
| Paket, harga, potongan, pembayaran | Database_Finance |
| Dokumen & sertifikat | Database_Admission |
| Nilai, absensi, progres KBM | Data_Pengajaran_Bandung |
| Partner, penempatan, alumni | Database_Admission |
| Kontak & alamat | gabungan mana pun yang terisi |

### Yang dibawa

733 siswa · 811 transaksi pembayaran · 16 paket beserta matriks ambang · 38 partner · 170 pengajuan partner · 89 penempatan alumni · 100 sertifikat · nilai A1/A2/B1 Bandung · absensi Bandung · 184 baris progres KBM · status dokumen 733 siswa.

### Yang tidak dibawa — nol data hilang

Tujuh tab cabang · Status Pembelajaran (Finance) · Tracking Siswa · Data Cepat · Reminder Pembayaran · Pencarian · kolom Drive Siswa & Drive Admission. Semuanya salinan atau hasil hitungan, dan lahir kembali sendiri di sistem.

Berkas yang kini tersimpan di Google Drive perlu ditarik masuk sebagai unggahan.

### Yang dibereskan saat migrasi

- **Kunci utama** menjadi ID internal. No Kontrak tetap ada, tetap unik, tetap tercetak, tapi bukan kunci penghubung — formatnya mengandung cabang dan tahun sehingga siswa yang pindah cabang akan kehilangan riwayatnya.
- **39 No Kontrak** memakai kode cabang empat huruf (LMBK) sementara sisanya tiga huruf. Diseragamkan. Format kedua di Kwitansi Dana Talang (`114 - LMBK - 021 - 2026`) ikut diseragamkan.
- **Absensi** dibalik dari bentuk melebar (kolom tanggal 1–31) menjadi memanjang (satu baris satu pertemuan).
- **Nilai A1/A2/B1/B2** disatukan dari empat sheet menjadi satu tabel dengan kolom level.
- **Progres KBM** memakai tanggal, bukan nama bulan sebagai kolom — memperbaiki hilangnya kolom Oktober.
- **Status "TIDAK ADA INFORMASI"** (19 siswa) dipindahkan ke penanda kelengkapan.

### Kebijakan data lama

Data lama dibawa **apa adanya**. Kolom kosong dibiarkan dan diberi penanda "perlu dilengkapi".

Kewajiban isian hanya berlaku untuk data baru. Akibat yang harus disampaikan ke klien sebelum go-live:

- Laporan Performa Konsultan awalnya hanya mencakup **39% siswa** — sisanya belum punya PIC.
- Laporan akademik untuk sepuluh cabang selain Bandung akan **kosong**, karena datanya memang tidak pernah ada. Bukan kegagalan sistem.

---

## 9. Urutan pembangunan

Pendekatan: tulang punggung dulu, lalu peran satu per satu, mengikuti ketergantungan.

| Fase | Isi | Alasan urutan |
|---|---|---|
| 1 | Tulang punggung, Super Admin, master data, hak akses, satu layar Pendaftaran sederhana | Semua peran duduk di atasnya. Pendaftaran ditarik maju karena tanpanya tidak ada siswa baru yang bisa masuk |
| 2 | Finance | Sembilan gerbang layanan bergantung pada mesin uang |
| 3 | Akademik | Sertifikat yang dibutuhkan Admission lahir di sini |
| 4 | Admission | Bergantung pada layanan (fase 2) dan sertifikat (fase 3) |
| 5 | Marketing | Pendaftaran lengkap, dashboard, performa konsultan |
| 6 | Portal Siswa | Hampir seluruhnya baca dari yang sudah jadi |

Kelemahan yang diterima: fitur yang paling terlihat oleh klien — portal siswa — datang paling akhir.

---

## 10. Keputusan yang sudah diambil

| # | Keputusan |
|---|---|
| 1 | Satu sistem dengan sembilan pintu masuk, bukan dua sistem terpisah |
| 2 | Dirancang mundur dari laporan |
| 3 | Tabel Lead dihapus; sumber lead jadi kolom di pendaftaran, diisi siswa. Angka konversi tidak dapat dihitung |
| 4 | Satu PIC per siswa: Konsultan. PIC Admission dihapus |
| 5 | Tautan Google Drive dihapus, diganti unggahan berkas asli |
| 6 | Kunci utama ID internal; No Kontrak tetap sebagai nomor resmi |
| 7 | Status "TIDAK ADA INFORMASI" dihapus dari daftar status |
| 8 | Pembayaran Rupiah lewat gateway, berlaku seketika, tanpa pengesahan |
| 9 | Pembayaran Euro tunai, wajib disahkan Manajer Finance |
| 10 | Dua saldo paralel, tanpa kurs di dalam sistem |
| 11 | Ambang layanan sebagai pengaturan, bukan kode; kolom ambang Euro disediakan tapi dikosongkan |
| 12 | Kekurangan dihitung dari harga setelah potongan |
| 13 | KKM 80 seragam di semua level |
| 14 | Nilai 0 dan sel kosong pada matriks ambang bermakna berbeda |
| 15 | Tidak ada peran Kepala Cabang terpisah |
| 16 | Finance dipecah dua: Staf (cabang) dan Manajer (semua cabang) |
| 17 | Pengajuan cuti masuk sistem (menggantikan Google Form). Alur tiga langkah: Siswa ajukan → Manajer Finance verifikasi Batas Minimum → Admission ubah status. Tanda tangan berupa unggahan gambar |
| 17b | Batas Minimum menjadi gerbang kesepuluh, diisi Finance per paket |
| 17c | Level "Kelas Persiapan Ujian B1" ditambahkan ke master level |
| 18 | Status Alumni menyala otomatis dari tanggal keberangkatan |
| 19 | Cuti: keluar dari kelas, kehadiran berhenti, tagihan ditunda |
| 20 | Dokumen dalam empat rumpun; rumpun Betrieb berupa daftar bebas |
| 21 | Pas Foto masuk rumpun Pribadi; Paspor masuk rumpun Hasil Layanan |
| 22 | Terjemah Ijazah & Transkrip sebagai satu berkas |
| 23 | Detail Siswa satu layar, isinya menyesuaikan peran |
| 24 | Cash flow di luar lingkup inti |
| 25 | Data lama dibawa apa adanya; kewajiban isian hanya untuk data baru |
| 26 | Tab yang datanya kosong tetap dibangun modulnya; tab yang merupakan salinan tidak |

---

## 11. Asumsi terbuka — perlu dikonfirmasi ke klien

| # | Asumsi | Dampak bila salah |
|---|---|---|
| 1 | €800 terkait keberangkatan dan tidak menahan tahap apa pun | Perlu mengisi ambang Euro pada master paket. Sudah diantisipasi lewat pengaturan, tidak perlu perubahan kode |
| 2 | Pembayaran Euro tidak dicicil | Perlu riwayat cicilan Euro seperti jalur Rupiah |
| 3 | Kepala Cabang bukan orang berbeda dari Kepala Pengajar | Perlu peran kesepuluh beserta daftar hak aksesnya |
| 4 | Jumlah kelas, pengajar, dan jadwal aktif belum terbaca dari data | Kapasitas modul kelas dan jadwal belum teruji terhadap volume sesungguhnya |
| 5 | Berkas siswa di Google Drive dapat ditarik ke sistem saat migrasi | Migrasi berkas jadi pekerjaan manual terpisah |
| 6 | Siswa Mengundurkan Diri (172 orang) tetap dihitung dalam piutang | Perlu aturan penghapusan piutang dan refund |
| 7 | **Batas Minimum kosong di 16 paket.** Angkanya harus ditetapkan Finance | Modul cuti tidak dapat berjalan sebelum diisi |
| 8 | Besaran selisih saat siswa turun level belum ada aturannya | Tagihan selisih dihitung manual oleh Finance |
