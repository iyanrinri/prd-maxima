# Tier 3 - PRD Fitur: Invoice, Pembayaran & Kwitansi
**Modul:** Modul 2 (Penagihan & Keuangan)

## 1. Overview & Objective
Fungsi operasional harian Finance untuk melacak detail tagihan per siswa, mencatat pembayaran yang masuk, dan menerbitkan tanda terima (*Kwitansi*) secara otomatis.

## 2. Functional Requirements
| ID | Fitur | Keterangan / Logic | Prioritas |
| :--- | :--- | :--- | :--- |
| FR-2.3.1 | Breakdown Tagihan Siswa (Invoice) | Menampilkan rincian tagihan per siswa. Mencakup: Tagihan (DP, Cicilan Ke-1 dst), Tahapan, Nominal, Jatuh Tempo, dan Status tiap cicilan (Lunas, Sebagian). | P0 |
| FR-2.3.2 | Pencatatan Pembayaran (CRUD) | Form manual bagi Finance untuk menginput mutasi/pembayaran masuk: Nama Siswa, Tanggal Pembayaran, Nominal, dan Keterangan (Pembayaran DP/Ke-1 dst). | P0 |
| FR-2.3.3 | Auto-Kwitansi | Sistem otomatis men-generate bukti bayar (Kwitansi) setelah (FR-2.3.2) diinput. Terdapat 2 kategori *template* kwitansi: Reguler & Dana Talang. | P1 |

## 3. Non-Functional Requirements
*   **Tracking Histori:** Setiap tagihan yang statusnya "Lunas" atau "Sebagian" harus memiliki jejak rekaman (*audit trail*) kapan status tersebut diubah oleh tim Finance.
