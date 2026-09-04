# PRD: Modul 4 - Kelulusan & Penyaluran Partner (Admission)

## 1. Overview & Objective
*   **Latar belakang:** Saat kelulusan, sering terjadi dokumen (KTP, Ijazah, Sertifikat) tercecer, menyulitkan tim Admission saat harus menyalurkan siswa ke pihak *Partner*. Terkadang siswa belum lunas tunggakan akhir tapi sudah diproses.
*   **Tujuan:** Mengotomatisasi E-Certificate, membundel dokumen kelulusan secara rapi, dan memberikan "kunci/gatekeeper" terakhir agar siswa yang nunggak tidak bisa disalurkan.
*   **Metrik sukses:** Pemrosesan dokumen ke Partner kurang dari 24 jam dan 100% siswa yang disalurkan terjamin lunas keuangannya.

## 2. User Persona & Hak Akses
*   **Siswa (Requester):** Mengunduh E-Certificate dan masuk ke tahap *Workshop*/Penyaluran (jika lolos syarat).
*   **Finance (Approver):** Melakukan validasi tahap akhir (Cek Pembayaran Pelunasan Akhir).
*   **Admission (Processor):** Mengecek "Bundel Dokumen" lengkap dan mem-*forward* data siswa ke Partner eksternal.

## 3. User Flow (Alur Pengguna)
1. Masa studi selesai. Sistem men-generate E-Certificate berdasarkan nilai dari Modul 3.
2. Siswa *login* dan mengunduh sertifikatnya.
3. Menjelang tahap layanan lanjutan (Workshop/Penyaluran), Finance membuka *Dashboard Validasi Akhir*.
    *   Finance mencentang "Lunas Tahap 2".
    *   Sistem membuka "gembok" status layanan lanjutan siswa tersebut.
4. Tim Admission membuka *Dashboard Penyaluran*.
5. Admission *hanya* melihat daftar "Siswa yang Sudah Dapat Layanan" (yang sudah dicentang Finance).
6. Admission melihat halaman "Dokumen Lengkap" (gabungan KTP dari pendaftaran & Sertifikat Kelulusan).
7. Admission menekan tombol "Proses ke Partner".

## 4. Functional Requirements (Fitur & Aturan Bisnis)

| ID | Fitur | Keterangan / Logic | Prioritas |
| :--- | :--- | :--- | :--- |
| FR-01 | E-Certificate Generator | Mengeluarkan sertifikat digital otomatis (PDF) yang bisa didownload oleh siswa setelah syarat nilai beres. | P1 (Should have) |
| FR-02 | Gatekeeper Pembayaran Akhir | Validasi lunas (Tahap 2) oleh Finance. Jika belum dicentang, fitur layanan lanjutan (Penyaluran/Workshop) akan terkunci (*disabled*) bagi siswa & admission. | P0 (Must have) |
| FR-03 | Dashboard Admission | Tabel daftar antrean khusus menampilkan siswa berstatus "Bisa Lanjut Layanan" saja. | P0 (Must have) |
| FR-04 | Bundling Dokumen Lengkap | Sistem secara otomatis menggabungkan dokumen Pribadi (Modul 1) dan Sertifikat (Modul 4) ke dalam satu halaman view untuk Admission. | P0 (Must have) |

## 5. Non-Functional Requirements
*   **Keamanan & Hak Akses:** Admission hanya bisa *Read-Only* data keuangan (tidak bisa *Approve* pelunasan, itu ranah Finance).
*   **Penyimpanan (Storage):** Sertifikat & Bundel Dokumen harus disimpan dalam *cloud storage* (*bucket*) yang bisa digenerate *link*-nya untuk dikirim ke Partner.

## 6. Out of Scope (Tidak Dikerjakan di Versi Ini)
*   Integrasi API langsung ke sistem milik Partner Eksternal $\rightarrow$ saat ini Admission mengekspor secara manual/via *email*.
*   Portal khusus (B2B) untuk *Partner Login*.
