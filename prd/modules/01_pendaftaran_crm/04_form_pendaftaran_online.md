# Tier 3 - PRD Fitur: Formulir Pendaftaran Online
**Modul:** Modul 1 (Pendaftaran & CRM)

## 1. Overview & Objective
Halaman berbasis web yang diakses langsung oleh Calon Siswa (Customer-Facing). Form ini adalah gerbang awal input data pribadi ke dalam sistem dan dirancang dengan validasi ketat (wajib isi) agar staf admin tidak perlu mengejar-ngejar dokumen siswa yang tertinggal.

## 2. Functional Requirements
| ID | Fitur | Keterangan / Logic | Prioritas |
| :--- | :--- | :--- | :--- |
| FR-1.4.1 | Form Registrasi (Wajib Isi) | *Field* pengisian data diri dan *upload* dokumen (KTP, dll). **Validasi Blocker:** Tombol "Submit" akan *disabled* (tidak bisa diklik) jika ada data yang kosong atau ukuran/format *file* tidak sesuai syarat. | P0 |
| FR-1.4.2 | Pilihan Paket Program | *Dropdown* pilihan Paket Program yang datanya ditarik (terintegrasi) secara dinamis dari Master Data Modul Finance. | P0 |
| FR-1.4.3 | Klaim Kode Promo | *Field* *input text* untuk kode promo. Jika diisi dengan kode yang valid (diatur Finance), sistem akan otomatis menampilkan potongan nilai tagihan di layar. | P1 |
| FR-1.4.4 | Trigger Auto-Invoice | Ketika pendaftaran sukses di-*submit*, sistem secara **otomatis** mengalihkan data ke alur Modul Finance untuk segera men-generate *Invoice* tagihan PDF ke *email* siswa. | P0 |
