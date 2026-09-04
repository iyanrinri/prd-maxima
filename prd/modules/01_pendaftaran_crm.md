# PRD: Modul 1 - Pendaftaran & CRM

## 1. Overview & Objective
*   **Latar belakang:** Pencatatan *lead* (calon siswa) dan proses pendaftaran saat ini masih manual, sering berbelit-belit, dan sering ada data/dokumen persyaratan yang terlewat sehingga menyusahkan proses administrasi.
*   **Tujuan:** Mempermudah tim Marketing melacak sumber calon siswa dan memastikan setiap pendaftaran yang masuk sudah terverifikasi kelengkapan datanya secara sistem (otomatis menolak form yang tidak lengkap).
*   **Metrik sukses:** Tidak ada lagi data pendaftaran (*submission*) yang bolong/tidak lengkap. Waktu pengumpulan dokumen siswa berkurang drastis.

## 2. User Persona & Hak Akses
*   **Calon Siswa (Requester):** Membuka link pendaftaran, mengisi form data diri, mengunggah dokumen pribadi, dan mengklaim kode promo diskon.
*   **Marketing (Admin):** Menerima kontak awal, mencatat sumber *lead*, dan melakukan *update* status jika calon siswa sudah menyetujui kontrak.

## 3. User Flow (Alur Pengguna)
1. Calon siswa menghubungi Marketing via WA/Sosial Media.
2. Marketing memasukkan data calon siswa ke sistem dan memilih "Sumber Lead".
3. Setelah konsultasi dan setuju, Marketing mencentang "Tanda Tangan Kontrak" di sistem.
4. Calon siswa menerima/membuka link Pendaftaran Online.
5. Calon siswa mengisi form data diri dan mengunggah dokumen wajib (KTP, dll).
6. Sistem mengecek kelengkapan:
    *   Jika lengkap & format sesuai $\rightarrow$ tombol Submit aktif.
    *   Jika ada yang kosong/salah $\rightarrow$ sistem menampilkan pesan eror.
7. Calon siswa memasukkan Promo Code (opsional) $\rightarrow$ sistem memotong total tagihan.
8. Calon siswa klik Submit. Data pendaftaran masuk ke *database* sementara (status *Pending Payment*).

## 4. Functional Requirements (Fitur & Aturan Bisnis)

| ID | Fitur | Keterangan / Logic | Prioritas |
| :--- | :--- | :--- | :--- |
| FR-01 | Manajemen Sumber Lead | Wajib memilih sumber asal (Dropdown: *Sosial Media, Teman, Alumni, Referral*) saat mencatat kontak awal. | P0 (Must have) |
| FR-02 | Status Kontrak | Indikator *checkbox* "Tanda Tangan Kontrak Selesai". Syarat wajib agar siswa bisa lanjut ke Pendaftaran. | P1 (Should have) |
| FR-03 | Validasi Kelengkapan Form | Tidak bisa *submit* jika "Data Pribadi" & "Dokumen Pribadi" kosong atau tidak sesuai format (misal: PDF/JPG max 2MB). | P0 (Must have) |
| FR-04 | Promo Code | Integrasi pemotongan harga otomatis jika *field* Promo Code diisi dengan kode yang valid. | P1 (Should have) |

## 5. Non-Functional Requirements
*   **Keamanan:** Data privasi dan lampiran dokumen KTP harus disimpan menggunakan enkripsi dan tidak bisa diakses publik.
*   **Performa:** Form pendaftaran (terutama saat *upload file*) harus stabil tanpa *lag/timeout*.

## 6. Out of Scope (Tidak Dikerjakan di Versi Ini)
*   Integrasi *Auto-reply / Chatbot* Whatsapp.
*   Sistem Referensi Afiliasi otomatis (menghitung komisi referral).
