# Master Data Schema: Basis Data Utama (Siswa & Finance)

## 1. Overview
Dokumen ini mendefinisikan skema data utama (Master Data) untuk entitas Siswa dan entitas relasional lainnya yang terhubung, seperti Paket Layanan, Histori Transaksi, dan Sistem Reminder. Struktur data ini merujuk pada format *database* historis (Excel) dan akan digunakan sebagai standar arsitektur *database* sistem (*backend*).

## 2. Struktur Tabel Entitas Utama

### 2.1. Data Dictionary: Tabel Siswa (Data Master)
Tabel ini memuat semua informasi terpusat mengenai profil dan status akademik/administratif siswa.

| No | Kolom (Header) | Tipe Data | Keterangan / Modul Terkait |
| :--- | :--- | :--- | :--- |
| 1 | Panggilan | String (Enum) | Herr, Frau |
| 2 | Nama Depan & Belakang | String | Data Pribadi Siswa |
| 3 | Nama Lengkap | String | Digunakan untuk sertifikat dan dokumen resmi |
| 4 | No Kontrak | String | Nomor unik (contoh: 008-000-BDG-2019) |
| 5 | Status | String (Enum) | ALUMNI, AKTIF, MENGUNDURKAN DIRI, dll |
| 6 | Tahun Masuk | Integer | Kohort pendaftaran |
| 7 | Cabang | String (Enum) | BANDUNG, BLITAR, BATAM, TASIKMALAYA, dll |
| 8 | Program | String | AUSBILDUNG, AU PAIR, dll |
| 9 | Jurusan Program | String | Spesialisasi jurusan (jika ada) |
| 10 | No Siswa | String | Nomor Induk Siswa (NIS) |
| 11 | No Ibu & Ayah | String | Nomor kontak orang tua / darurat |
| 12 | Alamat Lengkap | Text | Alamat domisili/KTP siswa |
| 13 | Konsultan | String | Nama staf Marketing PIC |
| 14 | Paket | String | Foreign Key ke Tabel Paket (contoh: ADM - 15) |
| 15 | Harga Layanan (IDR & EUR) | Currency | Total tagihan siswa |
| 16 | Tanggal DP | Date | Tanggal pembayaran pertama |
| 17 | IDR/EUR Sudah Dibayar | Currency | Akumulasi total yang telah dibayar |
| 18 | Kekurangan (IDR/EUR) | Currency | Sisa Piutang |
| 19 | Potongan | Currency | Diskon/potongan harga khusus |
| 20 | Status Pembayaran | String (Enum) | Lunas / Belum Lunas |
| 21 | Jumlah Transaksi | Integer | Frekuensi/total kali pembayaran |
| 22 | Pendidikan & Kampus | String | Jenjang pendidikan terakhir siswa (SMA, S1, dll) |
| 23 | Jurusan & Lulusan Tahun | String/Int | Latar belakang pendidikan |
| 24 | Tanggal Lahir | Date | Data Pribadi Siswa |
| 25 | Drive Siswa | URL | Tautan ke *folder* Google Drive Dokumen |
| 26 | Milestone / Kursus (A2, B1, B2) | Currency/Bool | *Tracking* alokasi biaya/status penyelesaian kelas |
| 27 | Milestone Layanan Lainnya | Currency/Bool | Passport, Ujian, Workshop, Pencarian Kontrak, Visa |

---

### 2.2. Tabel Histori Transaksi Pembayaran
Mencatat *log* pembayaran per individu setiap kali mereka melakukan setoran atau *transfer*.

| Kolom | Tipe Data | Keterangan |
| :--- | :--- | :--- |
| ID Transaksi | UUID | Primary Key |
| No Kontrak | String | Foreign Key (Relasi ke Siswa) |
| Nominal Rupiah | Currency | Jumlah uang yang disetorkan (IDR) |
| Nominal Euro | Currency | Jumlah uang yang disetorkan (EUR, opsional) |
| Keterangan Pembayaran | String | Contoh: "Pembayaran DP", "Pembayaran Ke - 1" |
| Tanggal Pembayaran | Date | Tanggal transaksi disahkan (e.g. 31 July 2026) |

---

### 2.3. Tabel Master Paket Layanan
Menyimpan referensi standar harga, *milestone*, dan fasilitas per paket yang ditawarkan.

| Kolom | Tipe Data | Contoh Data / Keterangan |
| :--- | :--- | :--- |
| Nama Paket | String (PK) | ADM - 15, Ausbildung Batam Dantal - 40 |
| Program | String | Admission Only, Ausbildung |
| Harga Layanan Rupiah | Currency | Rp36.000.000 |
| Harga Layanan Euro | Currency | €800.00 |
| Harga / Syarat Kursus | Currency | Alokasi untuk Kursus A2, B1, B2 |
| Harga / Syarat Layanan | Currency | Passport, Ujian, Workshop, Pemberkasan, Visa |
| Batas Minimum | Currency | Batas minimal masuk pembayaran (e.g. Rp8.000.000) |
| Dana Talang di Indonesia | Currency | Fasilitas pinjaman/talangan (jika ada) |
| Dana Talang di Jerman | Currency | Fasilitas pinjaman/talangan (jika ada) |

---

### 2.4. Tabel Penagihan & Reminder (Sistem Piutang)
Tabel terderivasi dari data Siswa, dikhususkan untuk *trigger* otomatis penagihan (Modul Finance).

| Kolom | Tipe Data | Keterangan |
| :--- | :--- | :--- |
| Pesan | Text | *Template text* pengingat WA yang otomatis ter-generate |
| Whatsapp Ke Siswa | URL/String | Link WhatsApp API untuk langsung *chat* ke siswa |
| Whatsapp Ke Orang Tua | URL/String | Link WhatsApp API untuk *chat* ke wali murid |
| Tanggal 20 Setiap Bulan | Boolean/Date | Jadwal *reminder* awal |
| Hari H (Tanggal 29) | Boolean/Date | Jadwal *reminder* saat jatuh tempo |
| 7 Hari Setelah | Boolean/Date | *Follow up reminder* jika masih *overdue* |

---

### 2.5. Tabel Progres Akademik & Ujian (Modul Pengajaran)
Tabel ini dikhususkan untuk mencatat progres pembelajaran level bahasa dan kesiapan ujian siswa (Modul Akademik).

| Kolom | Tipe Data | Keterangan |
| :--- | :--- | :--- |
| Kehadiran | String/Persentase | Tingkat rekap absensi kelas siswa |
| Tingkat A1 | String (Enum) | Status Kelulusan (contoh: Lulus, Mengulang) |
| Tingkat A2 | String (Enum) | Status Kelulusan (contoh: Lulus, Mengulang) |
| Tingkat B1 | String (Enum) | Status Kelulusan (contoh: Lulus, Mengulang) |
| Tingkat B2 | String (Enum) | Status Kelulusan (contoh: Lulus, Mengulang) |
| Rekomendasi Ujian B1 | String (Enum) | Status rekomendasi pengajar (Direkomendasikan / Tidak Direkomendasikan) |
| Rekomendasi Ujian B2 | String (Enum) | Status rekomendasi pengajar (Direkomendasikan / Tidak Direkomendasikan) |
| Ujian B1 | String/Date | Hasil / Jadwal Ujian Resmi B1 |
| Ujian B2 | String/Date | Hasil / Jadwal Ujian Resmi B2 |
| No HP Pribadi | String | Sinkronisasi dari *No Siswa* untuk mempermudah PIC Akademik menghubungi |
| No HP Orang Tua/Wali | String | Sinkronisasi dari *No Ibu/Ayah* untuk kebutuhan pelaporan progres |

---

### 2.6. Tabel Sertifikasi & Nilai Ujian Bahasa
Tabel ini digunakan untuk melacak kepemilikan sertifikat bahasa resmi yang menjadi syarat utama keberangkatan (Admission). Data ini mencatat detail skor (*Lesen, Hören, Schreiben, Sprechen*) beserta masa berlakunya.

| Kolom | Tipe Data | Keterangan |
| :--- | :--- | :--- |
| Keterangan Ujian | String (Enum) | Status kepemilikan sertifikat (contoh: Sudah Punya) |
| Jenis Sertifikat | String (Enum) | Lembaga penerbit sertifikat (contoh: Goethe, ÖSD, Telc) |
| Level Sertifikat | String (Enum) | Level bahasa sertifikat (A1, A2, B1, B2) |
| Skor Lesen | Integer/Float | Nilai kemampuan membaca |
| Lesen Expired | Date | Tanggal kedaluwarsa skor Lesen |
| Skor Hören | Integer/Float | Nilai kemampuan mendengar |
| Hören Expired | Date | Tanggal kedaluwarsa skor Hören |
| Skor Schreiben | Integer/Float | Nilai kemampuan menulis |
| Schreiben Expired | Date | Tanggal kedaluwarsa skor Schreiben |
| Skor Sprechen | Integer/Float | Nilai kemampuan berbicara |
| Sprechen Expired | Date | Tanggal kedaluwarsa skor Sprechen |

---

### 2.7. Tabel Kelengkapan Dokumen (Admission & Pemberkasan)
Tabel ini digunakan untuk melacak pengumpulan dokumen fisik maupun digital (Bewerbung) sebagai prasyarat proses Admission/keberangkatan.

| Kolom | Tipe Data | Keterangan |
| :--- | :--- | :--- |
| **Dokumen Pribadi Dasar** | | |
| Pas Foto | String (Enum) | Status pengumpulan (Sudah / Belum) |
| Akta Kelahiran | String (Enum) | Status pengumpulan (Sudah / Belum) |
| Kartu Keluarga | String (Enum) | Status pengumpulan (Sudah / Belum) |
| KTP | String (Enum) | Status pengumpulan (Sudah / Belum) |
| Ijazah | String (Enum) | Status pengumpulan (Sudah / Belum) |
| Transkrip Nilai | String (Enum) | Status pengumpulan (Sudah / Belum) |
| Catatan / Keterangan Dok Pribadi| Text | Catatan tambahan terkait dokumen pribadi siswa |
| **Dokumen Keberangkatan & Legalisasi** | | |
| Paspor | String (Enum) | Status pembuatan paspor (Sudah / Belum) |
| Akta Lahir Terjemah | String (Enum) | Status terjemahan (Sudah / Belum) |
| Akta Lahir Apostille | String (Enum) | Status legalisasi apostille (Sudah / Belum) |
| Ijazah Terjemah | String (Enum) | Status terjemahan (Sudah / Belum) |
| Ijazah Apostille | String (Enum) | Status legalisasi apostille (Sudah / Belum) |
| Transkrip Terjemah | String (Enum) | Status terjemahan (Sudah / Belum) |
| Catatan / Keterangan Dok Admission| Text | Catatan terkait legalisasi/terjemahan |
| **Dokumen Aplikasi (Bewerbung)** | | |
| Lebenslauf (CV) | String (Enum) | Status pengerjaan CV bahasa Jerman (Sudah / Belum) |
| Motivationsschreiben | String (Enum) | Surat motivasi (Sudah / Belum) |
| Video Perkenalan | String (Enum) | Video *introduction* (Sudah / Belum) |
| Catatan / Keterangan Bewerbung | Text | Evaluasi/catatan *review* dokumen aplikasi |
| **Akses Berkas Digital** | | |
| Drive Siswa | URL | Tautan G-Drive *folder* arsip siswa |
| Drive Admission | URL | Tautan G-Drive *folder* khusus dokumen keberangkatan |
| Email / Password | String | Kredensial untuk akses portal / aplikasi eksternal (jika ada) |

---

### 2.8. Tabel Tracking Partner & Latihan Wawancara (Admission)
Tabel ini digunakan oleh tim Admission untuk merekam histori pengiriman dokumen ke *Partner* (perusahaan/lembaga di Jerman) dan progres latihan wawancara.

| Kolom | Tipe Data | Keterangan |
| :--- | :--- | :--- |
| **Latihan Wawancara** | | |
| Posisi yang Dilamar | String | Bidang yang diminati (contoh: Restaurantfachfrau) |
| Wawancara Ke | Integer | Frekuensi latihan wawancara (contoh: 1, 2, 3) |
| Tanggal Latihan Wawancara | Date | Tanggal pelaksanaan simulasi wawancara |
| Catatan Latihan Wawancara | Text | *Feedback* performa bahasa dan *skill* wawancara |
| **Proses Partner (Tracking)** | | |
| Partner Diproses | String/List | Daftar perusahaan (*Partner*) yang sedang/telah dikirim CV |
| Jumlah Diproses | Integer | Total lamaran yang dikirim |
| Jumlah Gagal | Integer | Total lamaran yang ditolak |
| Partner Terakhir | String | *Partner* terakhir yang merespon atau sedang memproses |
| Progres Terakhir | String (Enum) | Status aplikasi (contoh: *Unterlagen Masuk*, *Gagal Interview*, *Proses Bewerbung*) |
| Update Terakhir | Date | Tanggal pembaruan status terakhir |
| Status Tracking | String (Enum) | Kesimpulan status (contoh: *Sedang Diproses*, *Belum Pernah Diproses*) |
| Catatan Partner | Text | Catatan dari pihak *Partner* / Jerman |
| Catatan Admission | Text | Catatan internal tim Admission terkait proses lamaran |

---

### 2.9. Tabel Keberangkatan & Alumni
Tabel ini merekam data final siswa yang telah berhasil mendapatkan kontrak dan proses visa, hingga mereka berangkat dan berstatus ALUMNI.

| Kolom | Tipe Data | Keterangan |
| :--- | :--- | :--- |
| **Data Keberangkatan & Kontrak** | | |
| Jenis Visa | String (Enum) | Contoh: Ausbildung, Au Pair, FSJ |
| Tanggal Keberangkatan | Date | Tanggal tiket penerbangan / keberangkatan ke Jerman |
| Tanggal Mulai Kontrak | Date | Masa berlaku awal kontrak kerja/program di Jerman |
| Tanggal Selesai Kontrak | Date | Masa berakhirnya kontrak program di Jerman |
| **Detail Institusi / Partner di Jerman** | | |
| Partner | String | Nama *Partner* (Agen/Perusahaan Penyalur) |
| Perusahaan | String | Nama institusi tempat bekerja / *Ausbildungsbetrieb* |
| Alamat Perusahaan | Text | Alamat fisik institusi di Jerman |
| Kota / Bundesland | String | Kota dan negara bagian letak perusahaan |
| Sekolah | String | Nama sekolah vokasi (*Berufsschule*) di Jerman |
| Website | URL | Situs web perusahaan atau sekolah |
| **Proses Visa** | | |
| Tanggal Pengajuan Visa | Date | Tanggal termin/pengajuan berkas ke kedutaan |
| Tanggal Wawancara Visa | Date | Tanggal wawancara visa di kedutaan |
| Tanggal Visa Terbit | Date | Tanggal visa disetujui / diterbitkan |
| Masa Berlaku Visa | Date | Masa tenggang visa yang diberikan |
| **Arsip Final** | | |
| Tautan GDrive Berkas | URL | Link *folder* khusus untuk dokumen visa dan kontrak final |

## 3. Master Referensi (Enum Values)
*(Nilai standar seperti Status Siswa, Cabang, dan Jenjang Pendidikan tetap merujuk pada struktur agregasi sebelumnya)*.
