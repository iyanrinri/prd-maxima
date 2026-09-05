# Wireframe Guide: POV Siswa (Portal Klien)

Berdasarkan arsitektur terbaru **PRD Versi 1.0 (5 Halaman Siswa)**, desain portal siswa harus merangkum seluruh pengalaman mereka secara terpusat.

## 1. Konsep Desain Utama
Tampilan siswa harus **bersih (clean), memotivasi, dan informatif**.
Siswa tidak boleh merasa kebingungan mengenai "*Apa yang harus saya lakukan selanjutnya?*"

*   **Tema Warna:** Cerah, bersih, gunakan *Progress Bar* untuk elemen gamifikasi.
*   **Layout Utama:**
    *   **Sidebar / Bottom Nav:** Hanya ada 5 menu utama (Beranda, Profil & Dokumen, Pembayaran, Pembelajaran, Proses ke Jerman).
    *   **Header:** "Halo, Riska Mustikawati!", Notifikasi, Avatar.

---

## 2. Struktur 5 Halaman Inti (Sesuai PRD Baru)

### Halaman 1 — Beranda
*(Fokus: Menjawab "saya di mana & apa selanjutnya" dalam 1 layar tanpa scroll panjang)*
*   **1.1 Kartu Identitas:** Nama, Foto, Program, Cabang, Status, Nama Konsultan PIC (dengan tombol Hubungi).
*   **1.2 "Langkah Berikutnya" (Dynamic Action Card):** Muncul 1 kalimat spesifik dari sistem. Contoh: *"Bayar Rp 2.000.000 lagi untuk membuka layanan Paspor"* (dengan tombol **Pembayaran**).
*   **1.3 Tiga Ringkasan Berdampingan:** 
    1. Sisa Pembayaran (IDR & EUR) 
    2. Level & Bab Berjalan 
    3. % Kehadiran
*   **1.4 Jadwal Terdekat:** 3 kegiatan terdekat (Kelas/Ujian/Jatuh Tempo).

### Halaman 2 — Profil & Dokumen
*(Fokus: Satu tempat untuk semua data & unggahan siswa)*
*   **2.1 Data Diri:** Form Identitas (Alamat, KTP, Pendidikan). *Data Inti (Program, Kontrak) read-only.*
*   **2.2 Manajemen Berkas (4 Kelompok berurutan):**
    1.  **Pribadi:** KTP, Ijazah, Foto (Tombol Unggah aktif).
    2.  **Hasil Layanan:** Paspor, Terjemah (Hanya bisa di-Download, Maxima yang produksi).
    3.  **Bewerbung:** Sertifikat B1, CV, Surat Motivasi.
    4.  **Dari Betrieb:** (Hanya muncul jika siswa sudah *Dapat Vertrag*).
*   **Aksi Dokumen:** Unggah, Ganti, Unduh. Status *Badge* (Menunggu Verifikasi, Terverifikasi, Ditolak).

### Halaman 3 — Pembayaran
*(Fokus: Transparansi Rupiah & Euro tanpa dijumlahkan)*
*   **3.1 Ringkasan:** Harga Paket, Potongan, Total Dibayar, Sisa. (Visual Rupiah dan Euro dipisah jelas).
*   **3.2 Yang Terbuka Berikutnya (Progress Lock):** Menampilkan layanan selanjutnya dan selisih uang yang dibutuhkan untuk membukanya.
*   **3.3 Tombol Bayar:** Integrasi Payment Gateway (VA/QRIS) khusus Rupiah. *Euro hanya menampilkan sisa dan instruksi bayar tunai di cabang.*
*   **3.4 Riwayat:** Tabel transaksi (Keterangan cicilan, Status, Tombol Download Kwitansi).

### Halaman 4 — Pembelajaran
*(Fokus: Perjalanan bahasa dan raport)*
*   **4.1 Ringkasan & Jadwal:** Level saat ini, pengajar, jadwal mingguan.
*   **4.2 Kehadiran & Nilai:** % Kehadiran dan nilai bab 1-12 beserta ujian internal.
*   **4.3 Raport & Sertifikat B1:** List raport per level (PDF). List skor ujian resmi (Hören, Lesen, dsb).
*   **Aksi Tersembunyi - Ajukan Cuti:** Tombol *Ajukan Cuti* yang menampilkan *Gatekeeper* (Hanya bisa diklik jika Batas Minimum Pembayaran terpenuhi).

### Halaman 5 — Proses ke Jerman
*(Fokus: Melacak 9 Layanan dan Penempatan)*
*   **5.1 Garis Perjalanan:** Linimasa visual.
*   **5.2 Papan 9 Layanan (Matriks Pribadi):** Tampilan daftar layanan. Jika terkunci, tampilkan nominal yang kurang. Jika layanan tidak ada di paket, sembunyikan total.
*   **5.3 Proses Partner & Wawancara:** Status lamaran. *Catatan PRD: Harus jujur, tampilkan jumlah gagal interview agar ekspektasi rasional.*
*   **5.4 Proses Visa & Form Alumni:** Linimasa pengurusan visa kedutaan. Jika Visa Terbit, muncul **Form Alumni** (Form input tanggal terbang). Mengisi form ini mengubah status siswa.
