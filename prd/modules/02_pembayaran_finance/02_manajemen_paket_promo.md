# Tier 3 - PRD Fitur: Manajemen Paket Program & Promo
**Modul:** Modul 2 (Penagihan & Keuangan)

## 1. Overview & Objective
Fitur *Master Data* di mana Finance menentukan harga jual layanan dan syarat minimal pembayaran (*Gatekeeper* keuangan) yang nantinya akan digunakan di seluruh modul lain (terutama Modul Pendaftaran dan Modul Admission).

## 2. Functional Requirements
| ID | Fitur | Keterangan / Logic | Prioritas |
| :--- | :--- | :--- | :--- |
| FR-2.2.1 | CRUD Paket Program | Form untuk menambah/mengubah Paket. *Field* wajib: Nama Paket, Harga Layanan Rupiah, Harga Layanan Euro. | P0 |
| FR-2.2.2 | Setting Minimal Pembayaran (Gatekeeper) | Finance bisa mengatur syarat "Minimal Pembayaran" (*Threshold*) sebelum siswa bisa membuka akses layanan tertentu (A2, B1, B2, Paspor, Ujian Bahasa, Workshop, Pencarian Perusahaan, Visa). | P0 |
| FR-2.2.3 | Manajemen Promo Code | Mengelola daftar kode promo. Menentukan besaran potongan/diskon yang nantinya bisa dipakai siswa saat mendaftar. | P1 |

## 3. Aturan Bisnis (Business Rule)
*   Aturan *Minimal Pembayaran* di (FR-2.2.2) akan terintegrasi langsung dengan Modul 4 (Admission). Jika saldo pembayaran siswa belum mencapai *threshold* yang diset Finance di sini, maka layanan di Admission otomatis terkunci (*Belum bisa diproses*).
