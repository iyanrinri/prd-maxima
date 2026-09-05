# PRD — POV Admin (Semua Divisi)

**Sistem Manajemen Kursus & Penempatan Kerja Jerman — Maxima Stiftung**
Versi 1.0 · 4 September 2026

---

## Ringkasan

**20 halaman.** Turun dari 47 pada rancangan sebelumnya. Sebagian besar pengurangan berasal dari satu perubahan cara pandang: yang dulu dihitung sebagai layar terpisah ternyata bagian dari halaman yang sama, dan yang dulu digandakan per peran ternyata halaman yang sama dengan izin berbeda.

### Empat divisi, tujuh peran

| Divisi | Peran | Cakupan |
|---|---|---|
| **Admission** | Admin | Semua data, semua divisi, plus pengaturan |
| **Marketing** | Konsultan | Siswa yang ia jadi PIC-nya |
| | Kepala Marketing | Semua cabang, baca |
| **Akademik** | Pengajar | Kelas yang ia ampu |
| | Kepala Pengajar | Satu cabang |
| **Finance** | Staf Finance | Satu cabang |
| | Manajer Finance | Semua cabang |

### Admission sebagai super admin

Admission membaca dan mengubah data semua divisi, serta memegang halaman Pengaturan.

Dua pengaman yang menyertainya:

**Log aktivitas wajib.** Setiap perubahan Admission di luar wilayahnya sendiri dicatat dan ditandai — siapa, kapan, dari nilai apa ke apa. Ini satu-satunya cara menelusuri selisih uang atau nilai janggal.

**Pemilik data tunggal tetap berlaku sebagai alur normal.** Finance yang mencatat pembayaran, Pengajar yang mengisi nilai. Wewenang Admission adalah jalur perbaikan, bukan cara kerja sehari-hari. Kalau dipakai rutin, sistemnya kembali jadi satu orang mengetik ulang pekerjaan orang lain.

### Yang digabung dan alasannya

| Sebelum | Sesudah | Alasan |
|---|---|---|
| Dashboard terpisah untuk tiap peran (5) | **Beranda** (1) | Kerangkanya sama, isinya menyesuaikan peran |
| Siswa Saya + Detail Siswa + Database Admission (4) | **Siswa** (1) | Satu daftar, satu detail. Isi menyesuaikan peran |
| Input Tunai + Pengesahan + Cetak Kwitansi + Dana Talang (4) | **Pembayaran** (1) | Satu berkas transaksi dengan langkah berbeda menurut peran |
| Piutang + Reminder + Status Cabang (3) | **Tagihan & Piutang** (1) | Ketiganya tampilan atas satu hitungan yang sama |
| Absensi + Progres Materi (2) | **Sesi Kelas** (1) | Diisi pengajar dalam satu duduk, untuk pertemuan yang sama |
| Input Nilai + Sikap & Catatan (2) | **Penilaian** (1) | Sama-sama bahan raport, diisi pada periode yang sama |
| Monitoring Kelas + Monitoring Pengajar + Siswa Berisiko (3) | **Monitoring Akademik** (1) | Tiga sudut pandang atas kumpulan angka yang sama |
| Master Partner + Pengajuan + Latihan Wawancara (3) | **Partner** (1) | Satu alur berurutan |
| Proses Visa + Penempatan & Alumni (2) | **Visa & Penempatan** (1) | Berurutan, dikerjakan orang yang sama |
| Pengguna + Master Data + Template + Log (4) | **Pengaturan** (1) | Semuanya jarang disentuh |

### Prinsip yang dipegang

**Halaman ditentukan oleh pekerjaan, bukan oleh peran.** Halaman yang sama dipakai beberapa peran dengan izin dan cakupan berbeda. Menggandakan halaman per peran adalah cara sistem membengkak.

**Satu angka punya satu tempat lahir.** Tidak ada halaman yang menghitung ulang angka yang sudah dihitung di tempat lain.

**Yang bisa dihitung tidak pernah punya kolom isian.** Status layanan, kekurangan, funnel, persentase kehadiran, performa konsultan — semuanya turunan.

---

## Peta akses

| Halaman | Konsultan | Kep. Marketing | Pengajar | Kep. Pengajar | Staf Finance | Man. Finance | Admission |
|---|:--:|:--:|:--:|:--:|:--:|:--:|:--:|
| 1. Beranda | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| 2. Siswa | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✎ |
| 3. Pendaftaran Siswa | ✎ | — | — | — | — | — | ✎ |
| 4. Performa Marketing | — | ✓ | — | — | — | — | ✓ |
| 5. Pembayaran | — | — | — | — | ✎ | ✎ | ✎ |
| 6. Tagihan & Piutang | — | — | — | — | ✓ | ✓ | ✓ |
| 7. Master Paket & Promo | — | — | — | — | — | ✎ | ✎ |
| 8. Laporan Finance | — | — | — | — | — | ✓ | ✓ |
| 9. Pengajuan Cuti | — | — | — | ✓ | — | ✎ | ✎ |
| 10. Kelas & Jadwal | — | — | ✓ | ✎ | — | — | ✎ |
| 11. Sesi Kelas | — | — | ✎ | ✓ | — | — | ✎ |
| 12. Penilaian | — | — | ✎ | ✓ | — | — | ✎ |
| 13. Monitoring Akademik | — | — | — | ✓ | — | — | ✓ |
| 14. Ujian & Sertifikat | — | — | — | ✎ | — | — | ✎ |
| 15. Raport | — | — | ✓ | ✎ | — | — | ✎ |
| 16. Dokumen | ✓ | — | — | — | — | — | ✎ |
| 17. Layanan | ✓ | — | — | — | ✓ | ✓ | ✎ |
| 18. Partner | — | — | — | — | — | — | ✎ |
| 19. Visa & Penempatan | — | — | — | — | — | — | ✎ |
| 20. Pengaturan | — | — | — | — | — | — | ✎ |

✎ mengubah · ✓ hanya membaca · — tidak tampil di menu

Jumlah halaman di menu tiap peran: Konsultan 5 · Kepala Marketing 3 · Pengajar 6 · Kepala Pengajar 9 · Staf Finance 5 · Manajer Finance 8 · Admission 20.

---

# Halaman 1 — Beranda

**Tujuan.** Menjawab "apa yang harus saya kerjakan hari ini".

Kerangkanya sama untuk semua peran: satu bagian **antrian pekerjaan** di atas, satu bagian **angka ringkas** di bawah. Isinya berbeda.

| Peran | Antrian pekerjaan | Angka ringkas |
|---|---|---|
| Konsultan | Siswa yang dokumennya belum lengkap · pendaftaran belum selesai | Siswa saya, aktif, cuti |
| Kepala Marketing | — | Siswa aktif, cuti, mengundurkan diri, sebaran cabang & program |
| Pengajar | Kelas hari ini · absensi belum diisi · nilai belum diisi | Kelas saya, jumlah siswa |
| Kepala Pengajar | Pengajar dengan absensi tertunggak · raport menunggu pengesahan · siswa berisiko | Siswa, kelas, pengajar aktif, rata-rata kehadiran & nilai |
| Staf Finance | Pembayaran tunai belum disahkan · siswa jatuh tempo di cabangnya | Diterima bulan ini, kekurangan cabang |
| Manajer Finance | Pembayaran tunai menunggu pengesahan · pengajuan cuti menunggu verifikasi | KPI Rupiah & Euro: tagihan, diterima, kekurangan, lunas, jatuh tempo |
| Admission | Dokumen menunggu verifikasi · layanan belum dikerjakan · pengajuan cuti siap dieksekusi · pengajuan partner tanpa kabar | Funnel sembilan tahap |

### Aturan

- Antrian pekerjaan berisi tautan langsung ke barisnya, bukan sekadar angka. Beranda yang hanya menampilkan angka akan diabaikan setelah minggu pertama.
- Angka yang sama tidak muncul di dua peran dengan definisi berbeda.

---

# Halaman 2 — Siswa

**Tujuan.** Menemukan satu siswa dan melihat seluruh keadaannya. Menggantikan sheet "Pencarian" yang selama ini dibuat manual di dalam spreadsheet.

### Bagian

**2.1 Daftar**
Pencarian menurut nama, No Kontrak, atau nomor kontak. Saringan: cabang, program, jurusan, status, level, paket, PIC, kelengkapan data.

Cakupan daftar mengikuti peran: Konsultan melihat siswanya, Pengajar melihat kelasnya, Kepala Pengajar dan Staf Finance melihat cabangnya, sisanya semua cabang.

**2.2 Detail siswa**
Satu halaman dengan bagian yang muncul menurut izin peran:

| Bagian | Terlihat oleh |
|---|---|
| Identitas, kontak, alamat, pendidikan, PIC | Semua |
| Paket, pembayaran, kekurangan, riwayat transaksi | Finance, Admission, Konsultan |
| Kelas, kehadiran, nilai, raport, sertifikat | Akademik, Admission |
| Kelengkapan dokumen empat rumpun | Admission, Konsultan |
| Sembilan layanan beserta status gerbang | Finance, Admission, Konsultan |
| Partner, pengajuan, wawancara, visa, penempatan | Admission |
| Catatan konsultan | Konsultan, Admission |
| Catatan partner & catatan admission | Admission |
| Riwayat perubahan status | Admission |

**2.3 Ubah status** ✎ — Admission
Status baru, tanggal berlaku, alasan, berkas pendukung. Semua perubahan masuk log.

Status: Aktif · Cuti · Alumni · Mengundurkan Diri · Selesai Kursus.

Status **Alumni menyala otomatis** saat tanggal keberangkatan terisi di halaman Visa & Penempatan — tidak diketik terpisah.

### Aturan

- Penanda "perlu dilengkapi" tampil pada siswa lama yang datanya kosong, dengan daftar kolom yang kurang.
- Ekspor daftar tersedia untuk semua peran, terbatas pada cakupannya.

---

# Halaman 3 — Pendaftaran Siswa ✎

**Tujuan.** Memasukkan siswa baru. Pemilik data identitas.

### Bagian

**3.1 Data diri**
Nama lengkap, nama panggilan, tempat & tanggal lahir, jenis kelamin, alamat, kontak siswa, kontak orang tua, pendidikan terakhir, pengalaman kerja.

**3.2 Program**
Cabang, program, jurusan program, PIC Konsultan, sumber lead.

**3.3 Paket & kontrak**
Paket, kode promo, potongan, harga akhir, No Kontrak.

**3.4 Dokumen pribadi**
Enam berkas wajib: Akta Lahir, Kartu Keluarga, KTP, Ijazah terakhir, Transkrip terakhir, Pas Foto.

### Aturan

- **Dokumen pribadi wajib lengkap dan sesuai format** sebelum pendaftaran dapat diselesaikan.
- **PIC wajib diisi.** Di data lama 61% siswa tidak punya PIC; itu tidak boleh terulang.
- Kewajiban isian hanya berlaku untuk siswa baru. 733 siswa lama masuk apa adanya lewat migrasi.
- No Kontrak dibuat sistem mengikuti format seragam. ID internal jadi kunci penghubung, bukan No Kontrak.

---

# Halaman 4 — Performa Marketing

**Tujuan.** Menilai konsultan dan memahami dari mana siswa datang.

### Bagian

**4.1 Performa konsultan**
Per PIC: jumlah siswa, kontrak, DP masuk, siswa aktif, siswa mengundurkan diri.

**4.2 Sumber lead**
Sebaran sumber: media sosial, teman, alumni, referral, kontak langsung.

**4.3 Program & demografi**
Sebaran program, jurusan, cabang, domisili, usia, pendidikan terakhir.

### Aturan

- **Bukan alat ukur konversi.** Calon siswa yang batal tidak pernah masuk sistem, jadi halaman ini menjawab "berapa siswa kita datang dari Instagram", bukan "berapa persen lead Instagram jadi siswa".
- **Cakupan awal hanya 39% siswa** karena 61% data lama tidak punya PIC. Ditampilkan sebagai keterangan di kepala halaman, bukan dibiarkan terbaca sebagai kegagalan sistem.

---

# Halaman 5 — Pembayaran ✎

**Tujuan.** Mencatat, mengesahkan, dan mencetak seluruh penerimaan uang.

### Bagian

**5.1 Daftar transaksi**
Tanggal, siswa, cabang, jalur, nominal, cicilan ke-N, metode, penerima, status.

Saringan menurut jalur, status, cabang, rentang tanggal.

**5.2 Catat pembayaran tunai** ✎ — Staf Finance
Hanya untuk jalur Euro dan dana talang. Isian: siswa, tanggal, nominal, jenis, penerima, cabang.

Berstatus **dicatat**, belum berlaku.

**5.3 Pengesahan** ✎ — Manajer Finance
Antrian pembayaran tunai yang menunggu. Disahkan atau ditolak beserta alasan.

**Penolakan tidak menghapus catatan.** Yang dihapus tidak bisa diaudit.

**5.4 Kwitansi**
Cetak kwitansi biasa atau kwitansi dana talang, dikunci No Kontrak dan cicilan ke-N.

### Aturan

| | Jalur Rupiah | Jalur Euro |
|---|---|---|
| Masuk lewat | Payment gateway, otomatis | Halaman ini, diketik Staf Finance |
| Pengesahan | Tidak perlu | Wajib, oleh Manajer Finance |
| Berlaku sejak | Transaksi berhasil | Manajer menyetujui |
| Menggerakkan gerbang layanan | Ya | Tidak |

- **Yang menerima uang bukan yang menyetujui penerimaannya.** Itu sebabnya Staf dan Manajer dipisah.
- Jalur Rupiah tidak melewati halaman ini sama sekali; hanya tampil di daftar.
- Rupiah dan Euro tidak pernah dijumlahkan. Tidak ada kurs di dalam sistem — konversi otomatis membuat angka historis berubah setiap kurs bergerak.

---

# Halaman 6 — Tagihan & Piutang

**Tujuan.** Melihat siapa berutang berapa, dan siapa yang harus ditagih minggu ini.

### Bagian

**6.1 Piutang**
Per siswa: paket, harga akhir, sudah dibayar, kekurangan, pembayaran terakhir, jumlah transaksi, status. Rupiah dan Euro dalam kolom terpisah.

**6.2 Jatuh tempo**
Siswa yang masuk jadwal penagihan, diurutkan menurut kedekatan tanggal.

**6.3 Riwayat reminder**
Reminder yang sudah terkirim beserta tanggapannya.

### Aturan

- Reminder terbit otomatis **tanggal 20**, **hari-H tanggal 29**, dan **H+7**, ke nomor siswa dan orang tua.
- Rangkaian Rupiah dan Euro terpisah — menagih dua kewajiban berbeda adalah dua percakapan berbeda.
- **Siswa berstatus Cuti dikeluarkan dari penagihan.** Tetap tampil di piutang, tidak tampil di jatuh tempo.
- Seluruh isi halaman hitungan. Tidak ada kolom isian.

---

# Halaman 7 — Master Paket & Promo ✎

**Tujuan.** Mengatur mesin gerbang. Halaman paling berpengaruh di seluruh sistem.

### Bagian

**7.1 Paket**
Per paket: nama, harga Rupiah, harga Euro, dana talang Indonesia, dana talang Jerman.

**7.2 Matriks ambang layanan**
Sembilan kolom: Kursus A2 · Kursus B1 · Kursus B2 · Paspor · Ujian Bahasa · Workshop · Pemberkasan · Pencarian Kontrak · Aplikasi Visa.

Tiap sel diisi ambang Rupiah, dengan kolom ambang Euro di sampingnya.

**7.3 Batas Minimum**
Ambang pelunasan yang harus dicapai siswa sebelum boleh mengajukan cuti.

**7.4 Promo**
Kode, nominal potongan, masa berlaku, riwayat pemakaian.

### Aturan

Tiga hal yang harus dipahami saat mengisi matriks:

- **Nilai 0 berarti layanan termasuk paket dan langsung terbuka.** Sel dikosongkan berarti layanan **tidak termasuk paket itu sama sekali** dan tidak akan ditampilkan ke siswa. Antarmuka harus membedakan keduanya secara jelas, bukan membiarkan sel kosong terbaca sebagai nol.
- **Ambang Euro tersedia tapi dikosongkan** sesuai keputusan sekarang. Kalau ternyata €800 menahan keberangkatan, Finance tinggal mengisi angkanya tanpa memanggil developer.
- **Batas Minimum kosong di seluruh 16 paket.** Modul cuti tidak dapat berjalan sebelum diisi. Halaman menampilkan peringatan selama masih kosong.

Kekurangan selalu dihitung dari harga **setelah** potongan.

Setiap perubahan di halaman ini masuk log aktivitas — mengubah satu ambang bisa membuka layanan bagi ratusan siswa sekaligus.

---

# Halaman 8 — Laporan Finance

**Tujuan.** Menggantikan rekap manual yang selama ini paling banyak memakan jam staf.

### Bagian

Harian · Bulanan · Per program · Per paket · Per cabang · Per konsultan.

Tiap laporan menampilkan: tagihan, diterima, kekurangan, jumlah transaksi, jumlah siswa lunas dan belum lunas. Rupiah dan Euro terpisah.

### Aturan

- **Seluruhnya hitungan.** Tidak ada yang diketik, tidak ada yang disalin.
- Ekspor tersedia dalam bentuk berkas untuk keperluan di luar sistem.
- Cash flow — kas masuk dan keluar, refund, biaya operasional — **di luar lingkup**. Itu akuntansi, bukan operasional siswa.

---

# Halaman 9 — Pengajuan Cuti ✎

**Tujuan.** Menjalankan alur cuti tiga langkah. Menggantikan Google Form dan percakapan WhatsApp yang selama ini menjadi langkah verifikasi.

### Bagian

**9.1 Antrian**
Pengajuan menurut tahapnya: menunggu verifikasi Finance · menunggu eksekusi Admission · berjalan · lewat batas · selesai.

**9.2 Detail pengajuan**
Siswa, kelas saat ini, level dan bab terakhir, alasan, tanggal mulai, tanggal rencana masuk, tujuh butir persetujuan, berkas tanda tangan.

Di sampingnya: total pembayaran siswa terhadap Batas Minimum paketnya.

**9.3 Verifikasi** ✎ — Manajer Finance
Meloloskan atau menolak berdasarkan pemenuhan Batas Minimum.

**9.4 Eksekusi** ✎ — Admission
Mengubah status menjadi Cuti dengan tanggal berlaku.

**9.5 Pemantauan**
Cuti berjalan beserta sisa waktu terhadap batas 6 bulan. Yang terlampaui ditandai.

### Aturan

| Aturan | Penerapan |
|---|---|
| Pembayaran mencapai Batas Minimum | Dijaga sistem sebelum pengajuan diterima |
| Hanya satu kali selama menjadi siswa | Pengajuan kedua ditolak |
| Maksimal 6 bulan | Batas dihitung dari tanggal mulai |
| Lewat batas tanpa kembali | Ditandai "cuti lewat batas". **Admission memutuskan; sistem tidak mengubah status diam-diam** |
| Penempatan saat kembali | Level terakhir diambil dari Progres KBM |
| Turun level saat kembali | Ditandai "perlu tagihan selisih" untuk Finance |

Besaran selisih belum ada aturannya di dokumen klien mana pun. Untuk sekarang Finance menghitung manual. Bila nanti ada rumusnya, itu jadi kolom baru di Master Paket.

---

# Halaman 10 — Kelas & Jadwal ✎

**Tujuan.** Menyusun kelas, jadwal, dan kalender akademik satu cabang.

### Bagian

**10.1 Master kelas**
Nama kelas, level, cabang, pengajar, kapasitas, jadwal mingguan, tanggal mulai dan selesai.

**10.2 Anggota kelas**
Siswa per kelas. Penambahan, pemindahan, pengeluaran.

**10.3 Kalender akademik**
Ujian, remedial, placement test, libur, pergantian pengajar, pembukaan kelas baru.

### Aturan

- Siswa berstatus Cuti otomatis keluar dari anggota kelas. Posisi kurikulum terakhir tersimpan di Progres KBM sebagai dasar penempatan saat kembali.
- Level yang tersedia: A1 · A2 · B1 · Kelas Persiapan Ujian B1 · B2.
- **Nilai wajib terhubung ke kelas.** Di data lama kolom kelas pada sheet nilai kosong seluruhnya, sehingga monitoring kelas tidak pernah bisa dihitung. Itu tidak boleh terulang.

---

# Halaman 11 — Sesi Kelas ✎

**Tujuan.** Yang pengajar buka setiap kali mengajar. Satu pertemuan, satu duduk.

### Bagian

**11.1 Pertemuan hari ini**
Jam, kelas, level, materi, jumlah siswa.

**11.2 Absensi** ✎
Per siswa: Hadir · Izin · Sakit · Alpha · Terlambat.

**11.3 Progres materi** ✎
Kapitel yang diselesaikan pada pertemuan ini, Status Belajar, Status Bab.

**11.4 Catatan pertemuan** ✎
Catatan bebas untuk pertemuan itu.

### Aturan

- Satu baris satu siswa satu pertemuan. **Bukan** satu baris per siswa per bulan dengan kolom tanggal 1–31 seperti di spreadsheet lama — bentuk itu membuat pergantian bulan berarti pergantian struktur tabel.
- **Kelengkapan absensi diawasi** di halaman Monitoring Akademik, dan **raport tidak dapat terbit bila absensi periode itu belum lengkap** karena persentase kehadiran ikut tercetak.
- Persentase kehadiran dihitung dari hadir dibagi seharusnya. Masa cuti tidak menambah "seharusnya", sehingga kehadiran siswa cuti berhenti, bukan jatuh.

---

# Halaman 12 — Penilaian ✎

**Tujuan.** Semua bahan raport, diisi pengajar pada periode yang sama.

### Bagian

**12.1 Nilai Bab** ✎
Kapitel 1 sampai 12, Punkte. Terhadap KKM 80.

**12.2 Ujian Internal** ✎
Großtest · Endtest Lesen · Endtest Hören · Endtest Schreiben · Endtest Sprechen. Untuk B1 dan B2 memakai Simulasi 1–3. Terhadap KKM 80.

**12.3 Sikap & Karakter** ✎
Sepuluh aspek dengan skala BS / B / C / PB: Disiplin · Tanggung Jawab · Keaktifan · Kemandirian · Kerja Sama · Komunikasi · Sopan Santun · Motivasi Belajar · Kejujuran · Percaya Diri.

**12.4 Deskripsi & Catatan** ✎
Deskripsi belajar siswa selama periode, dan catatan dari pengajar.

### Aturan

- **Bagian 12.3 dan 12.4 adalah yang selama ini hilang.** Di sistem lama keduanya diketik langsung ke template raport lalu tertimpa saat template dipakai untuk siswa berikutnya. Riwayat sikap seorang siswa selama empat level tidak pernah bisa ditelusuri.
- **Ujian internal berbeda dari ujian sertifikasi.** Yang pertama syarat naik level dan masuk raport; yang kedua diselenggarakan Goethe/ÖSD/ECL, punya masa berlaku, dan menjadi syarat masuk tahap penempatan. Keduanya tidak boleh tercampur.
- Empat level disimpan dalam satu tabel dengan kolom level, bukan empat sheet terpisah.

---

# Halaman 13 — Monitoring Akademik

**Tujuan.** Menemukan yang tertinggal — kelas, pengajar, maupun siswa.

### Bagian

**13.1 Kelas**
Per kelas: progres materi, kehadiran, rata-rata nilai, jumlah siswa.

**13.2 Pengajar**
Per pengajar: kelas yang ditangani, jumlah siswa, progres materi, **kelengkapan absensi dan nilai**, hasil evaluasi.

Kelengkapan absensi adalah tuas paling berguna di halaman ini, karena raport bergantung padanya.

**13.3 Siswa berisiko**
Kehadiran rendah · nilai rendah · progres tertinggal · gagal evaluasi · berpotensi tidak mencapai target B1/B2.

### Aturan

- Siswa berstatus Cuti tidak muncul di 13.3.
- Seluruhnya hitungan.
- **Tidak dapat dihitung untuk data lama.** Nilai lama tidak terhubung ke kelas mana pun. Halaman ini baru bermakna untuk data yang masuk lewat sistem, dan itu harus disampaikan ke klien sebelum go-live.

---

# Halaman 14 — Ujian & Sertifikat ✎

**Tujuan.** Mengurus ujian sertifikasi dari rekomendasi sampai nilai terverifikasi.

### Bagian

**14.1 Rekomendasi ujian** ✎
Siswa yang direkomendasikan mengikuti ujian B1 atau B2, beserta dasar rekomendasinya.

**14.2 Jadwal & pendaftaran** ✎
Tanggal ujian, tempat, peserta, status pendaftaran.

**14.3 Sertifikat** ✎
Jenis (Goethe, ÖSD, ECL), level, nilai empat modul, masa berlaku per modul, keterangan per modul, tanggal ujian ulang.

### Aturan

- **Pemilik nilai sertifikat adalah halaman ini, bukan siswa.** Siswa mengunggah berkasnya di portalnya; nilainya diisi dan diverifikasi di sini. Sertifikat B1 adalah syarat masuk tahap penempatan, jadi angkanya tidak boleh berasal dari pihak yang berkepentingan.
- Masa berlaku ditandai bila mendekati kedaluwarsa. Sertifikat kedaluwarsa menahan tahap penempatan.
- Berkas sertifikat menempel pada data sertifikat, bukan menjadi dokumen terpisah.

---

# Halaman 15 — Raport ✎

**Tujuan.** Menerbitkan raport dan mengesahkan kenaikan level.

### Bagian

**15.1 Antrian penerbitan**
Siswa yang periodenya selesai, beserta kesiapan datanya.

**15.2 Pratinjau raport**
Kunci: **siswa × level × periode**.

Susunan: identitas, pengajar, periode, tempat belajar · nilai bab terhadap KKM 80 · nilai ujian internal terhadap KKM 80 · sepuluh aspek sikap · presensi · deskripsi belajar · catatan pengajar.

**15.3 Kenaikan level** ✎
Mengesahkan kelulusan level dan penempatan level berikutnya.

### Aturan

- **Raport tidak dapat terbit bila absensi periode itu belum lengkap.** Persentase kehadiran ikut tercetak, jadi raport dengan absensi bolong akan mencetak angka yang salah. Ini juga memberi Kepala Pengajar alasan konkret untuk menagih kelengkapan absensi.
- Penamaan berkas otomatis mengikuti pola "Bulan - Tahun - Raport - Nama Siswa".
- Nilai, sikap, presensi, dan deskripsi ditarik otomatis. Tidak ada yang diketik ulang di halaman ini.

---

# Halaman 16 — Dokumen ✎

**Tujuan.** Memverifikasi berkas siswa. Salah satu beban kerja terbesar Admission.

### Bagian

**16.1 Antrian verifikasi**
Berkas yang menunggu, diurutkan menurut lama menunggu. Saringan menurut rumpun, cabang, program.

**16.2 Berkas per siswa**
Empat rumpun:

| Rumpun | Isi |
|---|---|
| Pribadi | Akta Lahir, Kartu Keluarga, KTP, Ijazah terakhir, Transkrip terakhir, Pas Foto |
| Hasil Layanan | Paspor, Terjemah Akta Lahir, Terjemah Ijazah & Transkrip, Apostille Akta Lahir, Apostille Ijazah |
| Bewerbung | Sertifikat B1, Lebenslauf, Motivationsschreiben, Video Perkenalan |
| Dari Betrieb | Vertrag, Krankenversicherung, IHK, Rahmenplan, dan lainnya |

Tiap berkas: pratinjau, verifikasi, tolak beserta alasan, unggah pengganti.

### Aturan

- **Rumpun Dari Betrieb berupa daftar bebas.** Jumlah dan jenisnya berbeda tiap perusahaan Jerman — panduan Maxima sendiri mengakhiri daftarnya dengan "usw". Kolom tetap akan membuat sistem harus ditambal setiap ada jenis dokumen baru.
- Berkas rumpun Hasil Layanan tidak diunggah siswa; muncul saat Admission menyelesaikan layanan terkait di halaman 17.
- Kelengkapan per rumpun dihitung otomatis dan menjadi syarat masuk tahap penempatan.
- **Tautan Google Drive tidak dipakai.** Berkas diunggah langsung agar dapat diverifikasi, dihitung, dan tidak dapat dipindah tanpa jejak.

---

# Halaman 17 — Layanan ✎

**Tujuan.** Mengerjakan sembilan layanan yang gerbangnya dibuka pembayaran.

### Bagian

**17.1 Papan layanan**
Siswa × sembilan layanan. Tiap sel menunjukkan: belum terbuka · terbuka & belum dikerjakan · sedang dikerjakan · selesai.

**17.2 Detail layanan** ✎
Progres pengerjaan, PIC, tanggal, catatan, unggahan hasil.

### Aturan

- **Status gerbang dihitung dari pembayaran, tidak pernah diketik.** Yang Admission isi hanya progres pengerjaan dan hasilnya.
- Layanan yang tidak termasuk paket siswa tidak ditampilkan sama sekali — bukan ditampilkan terkunci.
- Hasil layanan Paspor, Terjemah, dan Apostille otomatis mengisi rumpun Hasil Layanan di halaman 16.
- Finance dapat membaca halaman ini untuk menjawab pertanyaan siswa soal gerbang, tanpa dapat mengubahnya.

---

# Halaman 18 — Partner ✎

**Tujuan.** Mengelola perusahaan Jerman dan pengajuan siswa ke sana.

### Bagian

**18.1 Master partner** ✎
ID partner, nama, status, kategori (Agency · Hotel · Lembaga Kursus), PIC, kontak.

Di sistem lama tab ini **disembunyikan** di dalam spreadsheet. Di sini ia master data yang berdiri sendiri.

**18.2 Pengajuan** ✎
Siswa, partner, posisi, progres, tanggal, catatan partner, catatan admission.

Sebelas status progres: Masih Dicarikan Betrieb · Proses Bewerbung · Unterlagen Masuk · Unterlagen Pernah Masuk · Interview Partner · Menunggu Hasil Interview · Gagal Interview - Partner · Interview Betrieb · Gagal Interview - Betrieb · Dapat Vertrag · Tidak Lanjut Proses

**18.3 Latihan wawancara** ✎
Tanggal, jam, posisi, wawancara ke-N, PIC, catatan.

**18.4 Tracking**
Turunan: partner yang diproses, jumlah diproses, jumlah gagal, partner terakhir, progres terakhir, status tracking. **Tidak ada yang mengetiknya.**

### Aturan

- Satu siswa dapat diajukan ke beberapa partner. Riwayat kegagalan disimpan, tidak ditimpa.
- Pengajuan hanya dapat dibuat bila kelengkapan dokumen rumpun Bewerbung terpenuhi dan sertifikat masih berlaku.
- Status **Dapat Vertrag** membuka rumpun Dari Betrieb di halaman 16.

---

# Halaman 19 — Visa & Penempatan ✎

**Tujuan.** Tahap terakhir, dari pengajuan visa sampai keberangkatan.

### Bagian

**19.1 Proses visa** ✎
Tanggal pengajuan, wawancara kedutaan, visa terbit, jenis visa, masa berlaku.

**19.2 Penempatan** ✎
Perusahaan, jurusan, kota/Bundesland, tanggal mulai dan selesai kontrak, tanggal keberangkatan.

**19.3 Berkas alumni**
Visa, kontrak kerja, Krankenversicherung, Rahmenplan, IHK.

### Aturan

- Layanan Aplikasi Visa harus terbuka sebelum proses visa dapat dimulai.
- **Mengisi tanggal keberangkatan menyalakan status Alumni secara otomatis.** Tidak diketik terpisah — mengetik dua kali hal yang sama adalah cara status dan kenyataan mulai berbeda.
- Data penempatan menyuplai laporan alumni yang dibaca Marketing.

---

# Halaman 20 — Pengaturan ✎

**Tujuan.** Yang jarang disentuh tapi menentukan segalanya. Milik Admission sebagai super admin.

### Bagian

**20.1 Pengguna & hak akses** ✎
Akun, peran, cakupan cabang, status aktif.

**20.2 Master data** ✎
Cabang (11) · program · jurusan program · level (A1, A2, B1, Kelas Persiapan Ujian B1, B2) · jenis dokumen · jenis sertifikat · kategori partner.

**20.3 Template cetak** ✎
Kwitansi · Kwitansi Dana Talang · Raport.

**20.4 Log aktivitas**
Siapa mengubah apa, kapan, dari nilai apa ke nilai apa.

### Aturan

- **Log aktivitas tidak dapat dihapus siapa pun**, termasuk Admission. Log yang bisa dihapus bukan log.
- Perubahan yang dilakukan Admission di luar wilayahnya sendiri — data Finance dan Akademik — **ditandai khusus** di log, karena itu jalur pengecualian dan bukan alur normal.
- Menghapus master data yang sedang dipakai tidak diizinkan; hanya dapat dinonaktifkan.
- Izin halaman ini disimpan sebagai bendera terpisah. Bila kelak klien ingin memisahkan Super Admin dari Admission, cukup mencabut bendera itu tanpa membongkar apa pun.

---

## Urutan pembangunan

| Fase | Halaman |
|---|---|
| 1 | 20 Pengaturan · 3 Pendaftaran (bentuk sederhana) · 2 Siswa |
| 2 | 7 Master Paket · 5 Pembayaran · 6 Tagihan & Piutang · 8 Laporan Finance · 17 Layanan |
| 3 | 10 Kelas & Jadwal · 11 Sesi Kelas · 12 Penilaian · 15 Raport · 14 Ujian & Sertifikat · 13 Monitoring |
| 4 | 16 Dokumen · 18 Partner · 19 Visa & Penempatan · 9 Pengajuan Cuti |
| 5 | 3 Pendaftaran (lengkap) · 4 Performa Marketing · 1 Beranda semua peran |
| 6 | Portal siswa (dokumen terpisah) |

Finance dibangun lebih dulu dari Akademik dan Admission karena sembilan gerbang layanan bergantung pada mesin uangnya.
