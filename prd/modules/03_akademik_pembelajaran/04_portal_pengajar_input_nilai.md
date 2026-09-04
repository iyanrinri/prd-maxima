# Tier 3 - PRD Fitur: Portal Pengajar (Teacher Dashboard)
**Modul:** Modul 3 (Manajemen Akademik)

## 1. Overview & Objective
Ruang kerja *digital* sehari-hari khusus untuk para Pengajar. Di sini mereka bisa melihat jadwal mengajar hari ini dan melakukan kewajiban *data entry* absensi serta nilai dengan format *assessment* bahasa yang lengkap.

## 2. Functional Requirements
| ID | Fitur | Keterangan / Logic | Prioritas |
| :--- | :--- | :--- | :--- |
| FR-3.4.1 | Dashboard Mengajar Hari Ini | Saat *login*, pengajar melihat list "Kelas Hari Ini": Jam, Kelas, Materi, Daftar Siswa, dan Status KBM (Akan Dimulai, Sedang Berjalan, Selesai). | P0 |
| FR-3.4.2 | Input Kehadiran & Progres | Form absensi (Hadir, Izin, Sakit, Alpha, Terlambat). Pengajar juga wajib update progres materi (Misal: "Kelas Berlin sudah sampai Bab 1 Level A1"). | P0 |
| FR-3.4.3 | Detail Siswa Saya | Daftar seluruh siswa yang berada di bawah asuhannya beserta ringkasan Kehadiran, Nilai, Progres, dan Status Belajar per siswa. | P1 |
| FR-3.4.4 | Form Assesment Bahasa (A1-B2) | Form *input* nilai terperinci untuk komponen bahasa: *Lesen, Hören, Schreiben, Sprechen, Grammatik, Wortschatz*. Sistem akan merekapnya menjadi Nilai Per Bab dan Nilai Per Level. | P0 |
| FR-3.4.5 | Generator Raport Akhir Level | Form untuk men-generate Raport setelah level selesai, dilengkapi *field* khusus "Catatan Siswa" (*feedback* deskriptif dari guru). | P0 |
| FR-3.4.6 | Nilai Ujian (Approval) | Memonitor/memvalidasi Nilai Ujian Akhir (karena nilai dan file PDF-nya diinput secara mandiri oleh Siswa lewat Portal Siswa). | P2 |
