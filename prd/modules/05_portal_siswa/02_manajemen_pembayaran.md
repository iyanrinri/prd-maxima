# Tier 3 - PRD Fitur: Manajemen Pembayaran Siswa
**Modul:** Modul 5 (Portal Siswa)

## 1. Overview & Objective
Fitur ini memfasilitasi siswa untuk melihat rincian tagihan, riwayat transaksi, dan melakukan pembayaran secara mandiri lewat sistem (menghilangkan transfer manual yang sering *miss*).

## 2. Functional Requirements
| ID | Fitur | Keterangan / Logic | Prioritas |
| :--- | :--- | :--- | :--- |
| FR-5.2.1 | Rincian Harga Paket | Menampilkan detail: Harga Paket, Diskon, Total, DP, Sudah Dibayar, Sisa Pembayaran. | P0 |
| FR-5.2.2 | Jadwal Pembayaran | Menampilkan tabel jadwal jatuh tempo (Pembayaran, Tanggal Jatuh Tempo, Nominal, Status Pembayaran). | P0 |
| FR-5.2.3 | Payment Gateway | Tombol bayar dengan integrasi Jenis Pembayaran (VA, Transfer, QRIS). Jika *Success*, Finance menerima notif & *invoice* otomatis terkirim. | P0 |
| FR-5.2.4 | Riwayat Pembayaran | Tabel (Tanggal, Keterangan spt DP/Cicilan 1, Nominal, Metode, Status spt Pending/Dibayarkan/Lunas). | P0 |
| FR-5.2.5 | Download Invoice | Tombol *Download Invoice* berformat PDF di setiap baris Riwayat Pembayaran (jika status sudah Lunas). | P1 |
