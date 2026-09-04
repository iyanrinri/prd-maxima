# Tier 3 - PRD Fitur: Progres Layanan & Partner
**Modul:** Modul 4 (Kelulusan & Admission)

## 1. Overview & Objective
Ini adalah jantung dari operasional tim Admission. Fitur ini melacak layanan administrasi siswa (dari Finance) dan tahapan *interview* dengan *partner*/perusahaan di Jerman.

## 2. Functional Requirements
| ID | Fitur | Keterangan / Logic | Prioritas |
| :--- | :--- | :--- | :--- |
| FR-4.3.1 | Gatekeeper Layanan (Integrasi Finance) | Menampilkan layanan (Paspor, Terjemah, Apostille, Ujian, Workshop, Pencarian Perusahaan, Visa) dengan status otomatis: **Bisa diproses** (jika tagihan lunas) atau **Belum bisa diproses**. | P0 |
| FR-4.3.2 | Progres Partner (CRUD) | Mengelola data penyaluran: Nama Siswa, Partner dituju, Posisi. | P0 |
| FR-4.3.3 | Status Penyaluran & Catatan | Status (Interview/Gagal/Dapat Kontrak), Tanggal Proses, Catatan Partner, dan Catatan Admission. | P0 |
| FR-4.3.4 | Jadwal Latihan Wawancara | Menjadwalkan simulasi wawancara: Nama, Posisi, Tanggal Interview, Status, PIC, dan Catatan latihan. | P1 |
| FR-4.3.5 | Timeline Siswa (Audit Log) | Sistem mencatat otomatis jejak waktu (*timestamp*) pengiriman dokumen. Contoh: "Admission mengirim Dokumen Siswa A ke Partner pada 01.02.2026 - 10.30". | P1 |
