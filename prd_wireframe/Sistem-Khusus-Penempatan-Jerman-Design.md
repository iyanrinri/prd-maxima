# Panduan Desain: Sistem Khusus Penempatan Jerman

Berdasarkan arsitektur terbaru **PRD Versi 1.0**, aliran proses ke Jerman tersebar secara efisien di tiga halaman (Halaman 17 Layanan, Halaman 18 Partner, Halaman 19 Visa & Penempatan) untuk Admin, dan 1 Halaman terpusat (Halaman 5) untuk Siswa.

## 1. Flowchart Papan Pelacakan Partner (Halaman 18 Admin)

### Konsep Visual (Admin POV)
Buatlah tampilan antarmuka pelacakan pelamaran siswa ke Rumah Sakit/Perusahaan di Jerman. 

*   **Tabel Master Partner (18.1):** Database Rumah Sakit (ID Partner, Nama, Kategori, Kontak).
*   **Kanban / Tabel Pengajuan (18.2):** Menampilkan siswa yang diajukan ke partner mana. Status terbagi menjadi **11 tahap linimasa**, contoh:
    *   *Proses Bewerbung* (Dikirim ke N Partner)
    *   *Interview Partner* (Latihan Wawancara - Ada jadwal di 18.3)
    *   *Gagal Interview - Partner* (Rekam jejak kegagalan disimpan, tidak dihapus!)
    *   *Dapat Vertrag* (Memicu terbukanya form dokumen "Dari Betrieb" di Halaman 16).
*   **Tracking Otomatis (18.4):** Widget statis yang menghitung sendiri tanpa diinput. Menampilkan jumlah proses, jumlah gagal, dan progres terakhir.

## 2. Fitur Gatekeeper (Penjaga Gerbang Keuangan)

### Konsep Visual (Cross-Departement)
Sistem ini menonjolkan fitur "Terkunci" jika siswa belum melunasi cicilan sesuai **Ambang Layanan** pada Master Paket (Halaman 7).

*   **UI di Admin Admission (Halaman 17 Layanan):**
    *   Sembilan layanan ditampilkan dalam wujud **Matriks Papan Layanan (Siswa × Layanan)**.
    *   Sel layanan yang belum memenuhi ambang rupiah akan berwarna abu-abu (*locked*). Siswa tidak bisa diproses ke Jerman.
    *   *Pengecualian:* Jika siswa membeli paket dasar, layanan yang memang tidak ada di paket tersebut harus **Disembunyikan sepenuhnya**, bukan digembok.
*   **UI di Siswa Portal (Halaman 5 Proses ke Jerman):**
    *   Jika layanan tertahan, bukan sekadar tulisan "Terkunci". Siswa akan melihat pesan:
    *   *"Bayar Rp X.000.000 lagi untuk membuka layanan [Nama Layanan]."* beserta tombol CTA **Pembayaran**.

## 3. Eksekusi Akhir: Keberangkatan & Alumni (Halaman 19 Admin)

### Konsep Visual (End Goal)
Merupakan pintu keluar dari sistem Maxima.

*   **UI Halaman Visa & Penempatan (Admin):**
    *   Input Wawancara Kedutaan -> Visa Terbit.
    *   Input Penempatan: Perusahaan, Posisi, Kota/Bundesland, Tanggal Kontrak.
    *   **Perhatian UX:** Saat Admin mengetik **"Tanggal Keberangkatan"**, sebuah alert ringan harus muncul menginformasikan bahwa *menyimpan form ini akan otomatis mengubah status siswa menjadi ALUMNI.*
*   **UI Form Alumni (Siswa POV):**
    *   Muncul pop-up atau form setelah visa terbit (Di Halaman 5 Siswa).
    *   Siswa mengisi sendiri rincian keberangkatannya yang nantinya memicu sistem memindahkan mereka menjadi Alumni.
    *   Sematkan tautan download seluruh bundel dokumen digital.
