# PRD: Modul 2 - Penagihan & Keuangan (Finance)

## 1. Overview & Objective
*   **Latar belakang:** Pengecekan pembayaran yang masuk via mutasi bank memakan waktu lama, dan *invoice* masih dibuat secara manual, menyebabkan keterlambatan aktivasi siswa untuk mulai belajar.
*   **Tujuan:** Mengotomatisasi pengiriman *invoice* dan mempermudah tim Finance memvalidasi pembayaran dalam satu *dashboard* untuk mempercepat aktivasi status akademik siswa.
*   **Metrik sukses:** *Invoice* terkirim seketika (0 menit) setelah daftar, dan waktu verifikasi pembayaran oleh Finance menjadi di bawah 1 jam.

## 2. User Persona & Hak Akses
*   **Siswa (Payer):** Menerima *invoice* otomatis, memilih metode pembayaran (VA/Transfer/QRIS), dan melunasi tagihan.
*   **Finance (Approver):** Menerima notifikasi tagihan baru, mengecek kesesuaian mutasi rekening, menyetujui (Approve) pembayaran, dan mengelola master kode promo.

## 3. User Flow (Alur Pengguna)
1. Siswa berhasil melakukan *Submit* Pendaftaran (dari Modul 1).
2. Sistem otomatis membaca "Paket Program" yang dipilih, membuat *Invoice* PDF, dan mengirimkannya ke email siswa.
3. Siswa melihat *Invoice* dan melakukan pembayaran (via VA/Transfer manual/QRIS).
4. Finance membuka *Dashboard* Verifikasi Pembayaran.
5. Finance mencocokkan nominal di sistem dengan mutasi Bank.
6. Finance menekan tombol "Approve (Lunas)".
7. Sistem **otomatis** memproses:
    *   Memasukkan data siswa ke Master Database.
    *   Men-generate Nomor Induk Siswa (NIS).
    *   Mengubah status siswa menjadi "Aktif".

## 4. Functional Requirements (Fitur & Aturan Bisnis)

| ID | Fitur | Keterangan / Logic | Prioritas |
| :--- | :--- | :--- | :--- |
| FR-01 | Auto-Generated Invoice | Sistem men-generate dan mengirim email tagihan instan setelah registrasi. Nominal disesuaikan dengan Paket & Promo. | P0 (Must have) |
| FR-02 | Metode Pembayaran | Menyediakan opsi/panduan pembayaran untuk VA, Transfer Bank, dan QRIS. | P0 (Must have) |
| FR-03 | Dashboard Finance | Menampilkan tabel antrean pembayaran (*Pending Payment*) untuk mempermudah pengecekan Finance. | P0 (Must have) |
| FR-04 | Auto-Generate NIS & Status | Status siswa berubah menjadi "Aktif" dan NIS tercipta *hanya* jika Finance sudah menekan tombol *Approve*. | P0 (Must have) |

## 5. Non-Functional Requirements
*   **Akurasi Data:** Perhitungan nominal (Harga Paket - Promo) harus 100% akurat tanpa *bug* pembulatan (presisi mata uang).
*   **Keandalan (Reliability):** Sistem email *Invoice* harus punya cadangan pengiriman jika server email sedang gangguan (*retry logic*).

## 6. Out of Scope (Tidak Dikerjakan di Versi Ini)
*   Integrasi mutasi otomatis (*Auto-sync* dengan API Bank) $\rightarrow$ Finance masih cek mutasi manual di aplikasi bank.
*   Sistem cicilan (*Paylater* / Kredit).
