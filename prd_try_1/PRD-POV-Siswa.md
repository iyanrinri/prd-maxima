# PRD — POV Siswa

**Sistem Manajemen Kursus & Penempatan Kerja Jerman — Maxima Stiftung**
Versi 1.0 · 4 September 2026

---

## Ringkasan

**5 halaman.** Turun dari 8 pada rancangan sebelumnya setelah penggabungan.

| # | Halaman | Sifat |
|---|---|---|
| 1 | Beranda | Menampilkan |
| 2 | Profil & Dokumen | Siswa mengisi & mengunggah |
| 3 | Pembayaran | Siswa membayar |
| 4 | Pembelajaran | Menampilkan + aksi Ajukan Cuti |
| 5 | Proses ke Jerman | Menampilkan + form alumni |

### Yang digabung dan alasannya

| Sebelum | Sesudah | Alasan |
|---|---|---|
| Profil + Dokumen Saya | **Profil & Dokumen** | Keduanya "data saya". Siswa tidak membedakan kolom isian dari berkas unggahan |
| Progres Layanan + Progres Penempatan | **Proses ke Jerman** | Sembilan layanan dan proses partner adalah satu pipa berurutan, bukan dua perjalanan |
| Pengajuan Cuti sebagai halaman | **Aksi di dalam Pembelajaran** | Sekali seumur menjadi siswa. Menempatkannya di menu utama berarti 99% siswa melihat pintu yang tidak pernah mereka buka |

### Prinsip yang dipegang

**Satu halaman menjawab satu pertanyaan siswa.** Beranda menjawab "saya di mana", Pembayaran menjawab "saya harus bayar berapa", Pembelajaran menjawab "bagaimana belajar saya", Proses ke Jerman menjawab "sudah sampai mana urusan keberangkatan saya".

**Tidak ada angka yang muncul dua kali dengan cara berbeda.** Sisa pembayaran hanya punya satu bentuk tampilan, dipakai ulang di Beranda dan Pembayaran.

**Setiap penolakan menyebutkan jalan keluarnya.** Layanan yang belum terbuka menampilkan berapa lagi yang harus dibayar, bukan sekadar keterangan terkunci.

---

## Yang siswa tidak boleh lakukan

- **Tidak mengetik nilai apa pun** — bukan nilai kelas, bukan nilai sertifikat. Sertifikat B1 adalah syarat masuk tahap penempatan, jadi angkanya tidak boleh berasal dari pihak yang berkepentingan. Siswa mengunggah berkas; Kepala Pengajar mengisi nilainya.
- **Tidak mengubah statusnya sendiri.**
- **Tidak menghapus berkas yang sudah diverifikasi.** Mengganti berkas terverifikasi membatalkan verifikasinya dan mengembalikannya ke antrian.
- **Tidak melihat catatan internal** — catatan partner, catatan admission, evaluasi pengajar, catatan konsultan.

---

# Halaman 1 — Beranda

**Tujuan.** Menjawab "saya sedang di mana, dan apa yang harus saya lakukan berikutnya" dalam satu layar tanpa menggulir jauh.

### Bagian

**1.1 Kartu identitas**
Nama, foto, program, jurusan, cabang, No Kontrak, status siswa, nama PIC Konsultan beserta tombol hubungi.

**1.2 Langkah berikutnya**
Satu kalimat yang dihitung sistem dari keadaan siswa, dengan satu tombol menuju halaman terkait.

| Keadaan | Kalimat | Tombol |
|---|---|---|
| Dokumen pribadi belum lengkap | "Lengkapi 3 dokumen pribadi" | Profil & Dokumen |
| Layanan berikutnya belum terbuka | "Bayar Rp 2.000.000 lagi untuk membuka layanan Paspor" | Pembayaran |
| Sertifikat belum diunggah | "Unggah berkas sertifikat B1 Anda" | Profil & Dokumen |
| Sedang diproses partner | "Menunggu hasil wawancara dengan [Partner]" | Proses ke Jerman |
| Visa terbit | "Lengkapi form alumni" | Proses ke Jerman |

Ini pengganti pertanyaan yang selama ini dikirim lewat WhatsApp ke konsultan.

**1.3 Tiga ringkasan berdampingan**
Sisa pembayaran (Rupiah dan Euro terpisah) · Level dan bab berjalan · Persentase kehadiran.

Ketiganya dapat diklik menuju halaman lengkapnya.

**1.4 Jadwal terdekat**
Tiga entri berikutnya: kelas, ujian, wawancara, atau jatuh tempo pembayaran.

### Aturan

- Siswa berstatus Cuti melihat kartu berbeda: tanggal mulai cuti, batas 6 bulan, sisa waktu, dan tanggal rencana masuk kelas. Bagian kehadiran disembunyikan.
- Siswa berstatus Alumni melihat ringkasan penempatan, bukan langkah berikutnya.

### Keadaan kosong

Siswa lama yang datanya belum lengkap tetap melihat Beranda utuh. Bagian yang datanya tidak ada diganti ajakan melengkapi, bukan dikosongkan begitu saja.

---

# Halaman 2 — Profil & Dokumen

**Tujuan.** Satu tempat untuk semua yang siswa berikan tentang dirinya.

### Bagian

**2.1 Data diri** ✎
Nama lengkap, nama panggilan, tempat & tanggal lahir, jenis kelamin, alamat, kontak, kontak orang tua, pendidikan terakhir, pengalaman kerja, sumber lead.

Data inti — program, cabang, paket, No Kontrak — ditampilkan tapi tidak dapat diubah. Perubahannya milik Konsultan dan Finance.

**2.2 Berkas** ✎
Empat kelompok, ditampilkan berurutan sesuai perjalanan siswa:

| Kelompok | Isi | Peran siswa |
|---|---|---|
| Pribadi | Akta Lahir, Kartu Keluarga, KTP, Ijazah terakhir, Transkrip terakhir, Pas Foto | Mengunggah — wajib saat pendaftaran |
| Hasil Layanan | Paspor, Terjemah Akta Lahir, Terjemah Ijazah & Transkrip, Apostille Akta Lahir, Apostille Ijazah | Hanya mengunduh — Maxima yang memproduksi |
| Bewerbung | Sertifikat B1, Lebenslauf, Motivationsschreiben, Video Perkenalan | Mengunggah |
| Dari Betrieb | Vertrag, Krankenversicherung, IHK, Rahmenplan, dan lainnya | Mengunggah dengan label bebas |

Tiap berkas menampilkan statusnya: belum diunggah · menunggu verifikasi · terverifikasi · ditolak beserta alasannya.

Persentase kelengkapan per kelompok ditampilkan di kepala tiap kelompok.

### Aksi

Unggah · Ganti · Unduh · Tambah berkas Betrieb (khusus kelompok keempat)

### Aturan

- Kelompok Hasil Layanan tidak punya tombol unggah. Berkasnya muncul sendiri saat Admission menyelesaikan layanan.
- Kelompok Dari Betrieb baru tampil setelah siswa berstatus Dapat Vertrag.
- Mengganti berkas terverifikasi mengembalikannya ke status menunggu verifikasi, dengan peringatan sebelum tindakan.
- Berkas ditolak menampilkan alasan dari Admission dan tombol unggah ulang.

### Keadaan kosong

733 siswa lama masuk dengan banyak kolom kosong — 93% tanpa tanggal lahir, 68% tanpa alamat. Halaman ini menampilkan bilah kelengkapan dan mengajak melengkapi bertahap. **Tidak menghalangi akses ke halaman lain.**

---

# Halaman 3 — Pembayaran

**Tujuan.** Menjawab "berapa yang harus saya bayar, kapan, dan apa yang saya dapat setelahnya".

### Bagian

**3.1 Ringkasan**
Harga paket, potongan, harga akhir, sudah dibayar, sisa. Rupiah dan Euro berdampingan.

**Rupiah dan Euro tidak pernah dijumlahkan.** Keduanya kewajiban terpisah dengan cara bayar berbeda.

**3.2 Yang terbuka berikutnya**
Layanan berikutnya beserta selisih nominal yang dibutuhkan. Inilah yang membuat mekanisme gerbang terasa masuk akal, bukan penolakan sepihak.

**3.3 Bayar** ✎
Hanya untuk jalur Rupiah, lewat payment gateway: VA, transfer, QRIS. Berlaku seketika, invoice masuk email otomatis.

Euro tidak punya tombol bayar. Yang tampil hanya sisanya beserta keterangan bahwa pelunasan dilakukan tunai di kantor cabang.

**3.4 Riwayat**
Tanggal, keterangan cicilan (DP, ke-1 sampai ke-14), nominal, metode, status, unduh kwitansi.

Pembayaran Euro yang belum disahkan Manajer Finance tampil sebagai "menunggu pengesahan".

### Aturan

- Reminder pembayaran terbit otomatis tanggal 20, hari-H tanggal 29, dan H+7, ke nomor siswa dan orang tua.
- Selama berstatus Cuti, tagihan dan reminder ditunda. Halaman tetap dapat dibuka.

---

# Halaman 4 — Pembelajaran

**Tujuan.** Menjawab "bagaimana belajar saya berjalan".

### Bagian

**4.1 Ringkasan**
Level saat ini, kelas, pengajar, kapitel berjalan, progres per level.

**4.2 Jadwal**
Kelas mingguan, jadwal ujian, kelas persiapan ujian, evaluasi level.

**4.3 Kehadiran**
Tanggal, kelas, status: Hadir · Izin · Sakit · Alpha · Terlambat. Persentase kehadiran ditampilkan di kepala bagian.

**4.4 Nilai**
Kapitel 1–12, Punkte, ujian internal (Großtest, Endtest Lesen/Hören/Schreiben/Sprechen, Simulasi 1–3 untuk B1 dan B2), terhadap KKM 80.

**4.5 Raport**
Per level per periode, dapat diunduh. Memuat nilai bab, nilai ujian internal, sepuluh aspek sikap, presensi, deskripsi belajar, catatan pengajar.

**4.6 Sertifikat bahasa**
Jenis, level, nilai empat modul, masa berlaku per modul. Ditandai bila mendekati kedaluwarsa, karena sertifikat kedaluwarsa menahan tahap penempatan.

Berkas sertifikat diunggah di halaman Profil & Dokumen; di sini hanya nilainya yang ditampilkan.

### Aksi — Ajukan Cuti

Tombol tersembunyi di bagian bawah halaman, bukan di menu utama. Membuka formulir yang menggantikan Google Form yang dipakai sekarang.

**Isian:** kelas saat ini (A1, A2, B1, Kelas Persiapan Ujian B1, B2) · level dan bab terakhir yang ditempuh · alasan · tanggal mulai · tanggal rencana masuk kelas · tujuh butir persetujuan ketentuan · unggahan tanda tangan berupa gambar.

**Yang dijaga sistem sebelum pengajuan diterima:**

| Syarat | Bila tidak terpenuhi |
|---|---|
| Pembayaran mencapai Batas Minimum paket | Tombol tidak aktif, ditampilkan berapa lagi yang harus dibayar |
| Belum pernah cuti | Tombol tidak aktif beserta keterangannya |
| Durasi tidak lebih dari 6 bulan | Tanggal rencana masuk dibatasi |

**Setelah diajukan:** Manajer Finance memverifikasi, lalu Admission mengubah status. Kemajuan pengajuan tampil di bagian ini.

**Yang harus siswa pahami, tertulis di ketentuan:** cuti hanya sekali dan maksimal 6 bulan; lewat dari itu berarti keluar dari manajemen Maxima dan kembali sebagai siswa baru; saat kembali ditempatkan di level yang kira-kira sama, dan bila harus turun level, siswa membayar selisihnya.

### Keadaan kosong

**561 dari 733 siswa lama tidak punya riwayat akademik sama sekali** — nilai dan absensi hanya ada untuk cabang Bandung. Halaman ini akan kosong bagi mereka. Ditampilkan keterangan bahwa pencatatan dimulai sejak sistem berjalan, bukan halaman kosong tanpa penjelasan.

---

# Halaman 5 — Proses ke Jerman

**Tujuan.** Menjawab "sudah sampai mana urusan keberangkatan saya".

### Bagian

**5.1 Garis perjalanan**
Satu garis waktu dari layanan sampai keberangkatan, menandai posisi siswa sekarang.

**5.2 Sembilan layanan**
Kursus A2 · Kursus B1 · Kursus B2 · Paspor · Ujian Bahasa · Workshop · Pemberkasan · Pencarian Kontrak · Aplikasi Visa.

Tiap layanan menunjukkan: sudah terbuka atau belum · progres pengerjaan · hasil bila sudah selesai.

**Layanan yang tidak termasuk paket siswa tidak ditampilkan sama sekali** — bukan ditampilkan dalam keadaan terkunci. Siswa Admission Only tidak perlu melihat layanan kursus yang tidak pernah mereka beli.

Layanan yang belum terbuka menampilkan nominal yang dibutuhkan.

**5.3 Proses partner**
Partner yang sedang memproses, posisi yang dilamar, status terakhir, jumlah pengajuan, jumlah yang gagal.

Ditampilkan apa adanya termasuk kegagalan. Menampilkan progres seolah selalu maju akan menimbulkan harapan yang tidak beralasan.

**5.4 Latihan wawancara**
Tanggal, jam, posisi, wawancara ke-N, status.

**5.5 Proses visa**
Tanggal pengajuan, wawancara kedutaan, visa terbit, masa berlaku.

**5.6 Form alumni** ✎
Muncul setelah visa terbit. Perusahaan, posisi, kota/Bundesland, tanggal mulai dan selesai kontrak, tanggal keberangkatan, unggahan berkas.

Mengisi tanggal keberangkatan memicu status Alumni secara otomatis.

### Aturan

- Catatan Partner dan Catatan Admission tidak ditampilkan.
- Bagian 5.3 sampai 5.5 baru muncul setelah layanan Pemberkasan terbuka. Sebelum itu halaman hanya berisi garis perjalanan dan sembilan layanan.

---

## Catatan pembangunan

Portal siswa berada di **fase 6**, paling akhir. Hampir seluruh isinya membaca data yang dihasilkan lima fase sebelumnya — membangunnya lebih dulu berarti membangun jendela sebelum ada ruangannya.

Dua nada yang harus dijaga sepanjang portal: halaman yang berkaitan dengan uang selalu menjelaskan **berapa lagi**, bukan sekadar belum bisa; halaman yang berkaitan dengan penempatan harus jujur tentang ketidakpastiannya.
