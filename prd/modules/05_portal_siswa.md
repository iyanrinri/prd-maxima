# PRD: Modul 5 - Portal Siswa (Student Dashboard)

## 1. Overview & Objective
*   **Latar belakang:** Berdasarkan catatan kebutuhan fitur klien, siswa memerlukan visibilitas penuh atas perjalanan mereka dari awal daftar hingga disalurkan. Saat ini informasi tersebut masih tersebar.
*   **Tujuan:** Membangun satu portal terpadu khusus untuk **POV (Point of View) Siswa**, di mana mereka bisa memantau tagihan, jadwal kelas, raport, hingga progres admission/wawancara secara mandiri.
*   **Metrik sukses:** Penurunan drastis jumlah pesan/pertanyaan dari siswa ke tim admin/marketing terkait status tagihan, jadwal, atau kelengkapan dokumen.

## 2. User Persona & Hak Akses
*   **Siswa (Main User):** Mengakses seluruh halaman portal untuk melihat progres dan melakukan aksi (bayar, *download invoice*, *upload* dokumen layanan).

## 3. User Flow (Alur Navigasi Utama - POV Siswa)
1. Siswa *login* ke dalam portal.
2. Mendarat di **Page Dashboard**: Melihat ringkasan informasi (Nama, Program, PIC Konsultan), *Tab* Sisa Pembayaran & Kehadiran, serta Progres Level Bahasa (A1, A2, dst).
3. Navigasi ke **Page Profile**: Mengecek kelengkapan Data Diri dan Dokumen Pribadi.
4. Navigasi ke **Menu Pembayaran**: Melihat rincian Harga Paket, DP, Sisa Bayar, Jatuh Tempo, dan melakukan pembayaran via *Payment Gateway*.
5. Navigasi ke **Menu Akademik (Pembelajaran & Jadwal)**: Memantau jadwal kelas harian, ujian, rincian kehadiran, dan nilai raport per level.
6. Menjelang kelulusan, navigasi ke **Menu Admission & Layanan**: Memantau progres dokumen (Paspor, Terjemah), jadwal Latihan Wawancara, dan status Partner perusahaan yang dituju.

## 4. Functional Requirements (Fitur & Aturan Bisnis)

| ID | Fitur (Halaman/Menu) | Keterangan / Logic (Sub-fitur berdasar catatan klien) | Prioritas |
| :--- | :--- | :--- | :--- |
| FR-01 | Dashboard Overview | Menampilkan Nama, Program, Cabang, Status Siswa (Aktif/Cuti/Mengundurkan Diri), PIC Konsultan, dan status layanan penyaluran. | P0 |
| FR-02 | Profil & Dokumen | Halaman Data Diri Lengkap dan *upload* Dokumen Pribadi. | P0 |
| FR-03 | Penagihan & PAyment | Rincian Harga Paket, Diskon, DP, Sisa Pembayaran, Jadwal Jatuh Tempo, dan integrasi *Payment Gateway*. | P0 |
| FR-04 | Riwayat Pembayaran | Tabel (Tanggal, Keterangan, Nominal, Metode, Status) dan tombol *Download Invoice*. | P1 |
| FR-05 | Pembelajaran & Jadwal | List jadwal Kelas, Ujian, *Vorbereitung* (Persiapan), beserta data Pengajar dan Progres KBM (bab). | P0 |
| FR-06 | Rekap Kehadiran & Raport | *Tracking* status kehadiran (Hadir/Sakit/Izin/Alfa) per tanggal, dan nilai Raport per level bahasa. | P0 |
| FR-07 | Sertifikat Bahasa (View) | Menampilkan rincian nilai (*Lesen, Hören, Sprechen, Schreiben*), masa berlaku, dan opsi unduh PDF Sertifikat (maks 5 MB). | P1 |
| FR-08 | Progres Layanan & Admission | Status pembuatan Paspor/Terjemah/Apostille. *Tracking* jumlah wawancara partner, posisi/jurusan, dan catatan Admission. | P0 |
| FR-09 | Alumni | Formulir khusus bagi siswa yang sudah berstatus Alumni. | P2 |

## 5. Non-Functional Requirements
*   **UI/UX Responsif (Mobile-First):** Karena ini portal siswa, desain harus optimal diakses via *smartphone*.
*   **Keamanan Sesi:** Otomatis *logout* jika tidak ada aktivitas selama waktu tertentu untuk melindungi privasi nilai dan data diri.

## 6. Out of Scope (Tidak Dikerjakan di Versi Ini)
*   Sistem *booking* mandiri untuk jadwal Latihan Wawancara (Siswa hanya bisa melihat jadwal yang telah ditentukan admin).
