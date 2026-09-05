# Wireframe Guide: POV Admin (Semua Divisi)

Berdasarkan arsitektur terbaru **PRD Versi 1.0 (20 Halaman Unified)**, struktur UI Figma tidak lagi dipisah berdasarkan dasbor per divisi (Marketing/Finance/dsb), melainkan **berdasarkan pekerjaan (Tasks)**. Satu halaman dapat diakses oleh beberapa peran dengan cakupan data yang berbeda.

## 1. Tata Letak Dasar (Global Layout)
*   **Sidebar (Kiri - Tetap, 240px width):** 
    *   Logo Perusahaan (Maxima).
    *   **Menu Navigasi (Menyesuaikan Izin Peran):**
        *   Beranda
        *   Siswa & Pendaftaran (Siswa, Pendaftaran Siswa, Performa Marketing)
        *   Keuangan (Pembayaran, Tagihan & Piutang, Laporan Finance)
        *   Akademik (Kelas & Jadwal, Sesi Kelas, Penilaian, Raport, Ujian, Monitoring)
        *   Layanan Jerman (Dokumen, Layanan, Partner, Visa & Penempatan)
        *   Sistem (Master Paket, Pengajuan Cuti, Pengaturan)
*   **Header (Atas - Tetap, 64px height):**
    *   Pencarian Global (Nama/No Kontrak).
    *   Ikon Notifikasi (Bell) & Profil (Misal: *Admin Admission* atau *Manajer Finance*).

---

## 2. Struktur 20 Halaman Inti (Figma Screens)

*(Desainer harus merancang 20 komponen halaman ini. Elemen yang muncul bergantung pada hak akses)*

### 1. Beranda
*   **Antrian Pekerjaan (Atas):** Tautan langsung ke aksi (Contoh untuk Finance: "5 Pembayaran Euro belum disahkan").
*   **Angka Ringkas (Bawah):** Metrik sesuai peran (Contoh untuk Admission: Funnel 9 tahap).

### 2. Siswa (Single Source of Truth)
*   **Daftar Siswa:** Pencarian dan saringan (Cabang, Status).
*   **Detail Siswa (Satu Halaman Penuh):** Dibagi menjadi beberapa blok (Identitas, Paket & Tagihan, Akademik, Kelengkapan Dokumen, Partner). Akses blok bergantung pada peran.
*   **Aksi (Khusus Admission):** Tombol "Ubah Status" (Aktif, Cuti, Alumni, Selesai).

### 3. Pendaftaran Siswa
*   Formulir input panjang (Data diri, Program, Paket).
*   **Syarat Sistem:** Wajib upload 6 dokumen pribadi (KTP, Ijazah, dsb) sebelum tombol "Simpan" bisa diklik.

### 4. Performa Marketing
*   Tabel jumlah siswa, jumlah DP, jumlah kontrak per PIC Konsultan.
*   Pie chart sumber *lead*.

### 5. Pembayaran
*   **Daftar Transaksi:** Tanggal, nominal, jalur bayar.
*   **Input Tunai (Staf Finance):** Form khusus Euro / Dana talang.
*   **Pengesahan (Manajer Finance):** Tombol *Approve / Reject*.
*   **Aksi:** Tombol Cetak Kwitansi.

### 6. Tagihan & Piutang
*   **Tabel Piutang:** Kolom IDR dan EUR dipisah tegas (tidak dijumlahkan).
*   **Tabel Jatuh Tempo:** Diurutkan berdasarkan batas waktu.
*   **Riwayat Reminder:** Status pengiriman pesan tagihan WA/Email otomatis.

### 7. Master Paket & Promo
*   **Matriks Ambang Layanan:** Tabel krusial berisi 9 layanan (Kursus A2 hingga Aplikasi Visa) dan nominal Rupiah yang harus dilunasi agar layanan terbuka.

### 8. Laporan Finance
*   Tabel rekap otomatis harian/bulanan. (Tanpa input manual).

### 9. Pengajuan Cuti
*   **Alur 3 Langkah:** Tabel Antrian -> Verifikasi Finance -> Eksekusi Admission.
*   Status Cuti berjalan beserta *countdown* batas 6 bulan.

### 10-15. Modul Akademik
*   **10. Kelas & Jadwal:** Pembuatan master kelas & penugasan siswa.
*   **11. Sesi Kelas (Harian):** Form Absensi & Progres Materi. (Diisi sekali duduk).
*   **12. Penilaian:** Form nilai (Großtest, dsb) & Evaluasi Sikap 10 aspek (Sopan Santun, dsb).
*   **13. Monitoring Akademik:** Tabel pengajar/siswa berisiko (absensi rendah/tunggakan nilai).
*   **14. Ujian & Sertifikat:** Form pendaftaran Goethe/ÖSD dan hasil sertifikat asli.
*   **15. Raport:** Halaman *generate* PDF raport berdasarkan data absensi & nilai. Tombol "Sahkan Kenaikan Level".

### 16. Dokumen
*   Halaman kerja berat Admission. 
*   **4 Rumpun Dokumen:** Pribadi, Hasil Layanan, Bewerbung, Dari Betrieb.
*   **Aksi:** Tombol "Verifikasi" atau "Tolak" (dengan input alasan).

### 17. Layanan
*   **Papan Sembilan Layanan (Matriks):** Sel tabel (Siswa × Layanan) dengan visualisasi: Belum terbuka (Terkunci / Abu-abu), Terbuka, Dikerjakan, Selesai.
*   **Logic Gate:** Hanya terbuka jika syarat di Halaman 7 terpenuhi.

### 18. Partner
*   **Master Partner:** Database RS/Perusahaan Jerman.
*   **Tabel Pengajuan (Bewerbung):** Siswa diajukan ke partner mana. Status (11 tahapan).
*   **Tabel Wawancara & Tracking.**

### 19. Visa & Penempatan
*   Form input tanggal wawancara kedutaan & penerbitan visa.
*   Penempatan (Tanggal terbang, Kota, Kontrak). *Catatan: Mengisi tanggal keberangkatan otomatis mengubah status siswa jadi Alumni.*

### 20. Pengaturan
*   Manajemen Hak Akses, Template PDF, dan **Log Aktivitas (Audit Trail)**.
