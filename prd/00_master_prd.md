# Master PRD: Sistem Informasi Manajemen Siswa & Penyaluran Partner

## 1. Ringkasan Eksekutif
Dokumen ini adalah *Master Document* (Tier 1) yang mendefinisikan kebutuhan sistem tingkat tinggi untuk mendigitalisasi alur pendaftaran, manajemen pembelajaran, hingga proses penyaluran siswa ke partner. Tujuannya adalah menyederhanakan alur kerja yang manual, menghindari data tercecer, dan memastikan proses berjalan sesuai aturan (validasi antar departemen).

## 2. Struktur Dokumen (Modul Sistem)
Untuk memudahkan *development*, PRD ini dibagi menjadi 4 modul utama. *(Catatan: File untuk Tier 2 akan dibuat dan dihubungkan ke sini nanti)*:
1. **Modul 1: Pendaftaran & CRM** -> Fokus pada alur Marketing dan Calon Siswa (Registrasi).
2. **Modul 2: Penagihan & Keuangan** -> Fokus pada alur Finance (Invoice & Validasi Pembayaran).
3. **Modul 3: Manajemen Akademik** -> Fokus pada alur Pengajaran (Jadwal, Absensi, Nilai).
4. **Modul 4: Kelulusan & Penyaluran Partner** -> Fokus pada alur Admission (Sertifikat & Penyaluran).
5. **Modul 5: Portal Siswa (Dashboard)** -> Fokus pada *User Interface* POV Siswa (Tagihan, Jadwal, Nilai, Progres Admission).

## 3. Pengguna Sistem (User Roles)
Sistem memiliki 5 peran utama:
1. **Siswa/Calon Siswa**: *End-user* yang mendaftar, membayar, belajar, dan menerima sertifikat.
2. **Marketing**: Mengelola konsultasi, pencatatan *lead*, dan *tracking* tanda tangan kontrak.
3. **Finance**: Memverifikasi pembayaran awal/akhir, mengelola promo, dan memberikan otorisasi status "Aktif".
4. **Tim Pengajaran**: Mengelola jadwal kelas berdasarkan paket, menginput absensi, dan nilai ujian siswa.
5. **Admission**: Memverifikasi bundel dokumen akhir dan menyalurkan siswa ke pihak Partner.

## 4. Alur Kerja Utama (High-Level Business Flow)
Berdasarkan kebutuhan bisnis, siklus utamanya adalah:
1. **Pra-Pendaftaran**: Calon siswa mendapat info, lalu konsultasi dengan Marketing sampai tahap tanda tangan kontrak.
2. **Registrasi**: Siswa mengisi form *online* dan wajib melampirkan dokumen pribadi.
3. **Penagihan**: Sistem otomatis mengirimkan *Invoice* ke email.
4. **Aktivasi**: Siswa membayar -> Finance memvalidasi -> Sistem menerbitkan NIS dan status siswa menjadi **Aktif**.
5. **Pembelajaran**: Pengajar membuat jadwal -> Pembelajaran dimulai -> Input nilai harian dan ujian bahasa.
6. **Pasca-Pembelajaran**: Siswa mendapat E-Certificate.
7. **Penyaluran**: Finance cek lunas tahap akhir -> Admission memproses dokumen lengkap siswa ke Partner.
