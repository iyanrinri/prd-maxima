# Tier 3 - PRD Fitur: Manajemen Piutang & Automasi Reminder
**Modul:** Modul 2 (Penagihan & Keuangan)

## 1. Overview & Objective
Fitur untuk menjaga kelancaran *cash flow* perusahaan dengan melacak sisa tunggakan siswa (*Piutang*) secara ketat dan mengirimkan pengingat tagihan (*reminder*) secara otomatis tanpa campur tangan manusia.

## 2. Functional Requirements
| ID | Fitur | Keterangan / Logic | Prioritas |
| :--- | :--- | :--- | :--- |
| FR-2.4.1 | Kalkulasi Status Otomatis | Sistem otomatis melabeli status siswa berdasarkan rumus: **Lunas** (Kekurangan = 0), **Sebagian** (Masih ada sisa), **Belum Bayar**, atau **Melewati Jatuh Tempo**. | P0 |
| FR-2.4.2 | Tabel Manajemen Piutang | Halaman khusus memonitor tunggakan. Kolom: Nama Siswa, Paket, Total, Dibayar, Kekurangan, Tanggal Terakhir Pembayaran. | P0 |
| FR-2.4.3 | Automasi Reminder Tagihan | *Cron Job* sistem akan otomatis mengirim email pengingat bayar ke siswa dengan rentang waktu dari H-7 sebelum jatuh tempo hingga H+1 setelah jatuh tempo. | P1 |

## 3. Non-Functional Requirements
*   **Akurasi Automasi:** Fitur Reminder wajib terintegrasi dengan tabel Piutang. Jika status siswa sudah (Lunas), maka cron job pengiriman reminder untuk cicilan tersebut harus otomatis dihentikan.
