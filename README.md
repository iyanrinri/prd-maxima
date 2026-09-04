# Maxima ERP System Prototype

Proyek ini adalah Prototipe Sistem ERP Terintegrasi untuk **Maxima**, sebuah lembaga yang berfokus pada pelatihan bahasa Jerman dan penyaluran kerja/studi ke Jerman (Ausbildung, Au Pair, FSJ).

Prototipe ini dibuat berdasarkan dokumentasi **PRD (Product Requirements Document)** komprehensif yang membagi sistem menjadi 5 modul utama.

## 🌟 Live Demo (Coba Langsung!)
Kamu bisa langsung mencoba prototipe interaktif ini secara *live* melalui tautan Vercel berikut:
**👉 [https://frontend-omega-lake-20.vercel.app/](https://frontend-omega-lake-20.vercel.app/)**


## 🚀 Struktur Direktori

- `/prd/` : Kumpulan Dokumen PRD (Tier 1 s/d Tier 3) untuk seluruh modul (Sistem Pendaftaran, Finance, Akademik, Admission, Portal Siswa).
- `/frontend/` : Aplikasi web interaktif (*React + Vite*) yang merepresentasikan wujud nyata dari UI/UX berdasarkan PRD tersebut.

## 💻 Cara Menjalankan Prototipe Secara Lokal

Prototipe interaktif dibangun menggunakan **React.js** dan **Vite**. Semua data di dalamnya adalah data *dummy* interaktif (tersimpan di `src/data/mockAdmission.js`).

1. Pastikan kamu sudah menginstal [Node.js](https://nodejs.org/).
2. Buka terminal dan masuk ke folder `frontend`:
   ```bash
   cd frontend
   ```
3. Instal semua dependensi:
   ```bash
   npm install
   ```
4. Jalankan *development server*:
   ```bash
   npm run dev
   ```
5. Buka browser dan akses: `http://localhost:5173/`

## 🌐 Deploy ke Vercel

Aplikasi ini sudah dikonfigurasi agar sepenuhnya kompatibel dengan **Vercel** (menggunakan *Client-Side Routing* dari React Router). Konfigurasinya sudah tersimpan otomatis di dalam file `frontend/vercel.json`.

**Langkah Deploy:**
1. Masukkan (*push*) repositori proyek ini ke akun GitHub/GitLab kamu.
2. Login ke [Vercel](https://vercel.com/) dan buat proyek baru (*Add New Project*).
3. Import repositori GitHub kamu.
4. **Penting:** Pada bagian **Framework Preset**, pastikan memilih `Vite`.
5. Pada bagian **Root Directory**, pilih folder `frontend`.
6. Biarkan *Build Command* (`npm run build`) dan *Output Directory* (`dist`) secara default.
7. Klik **Deploy**.

Dalam beberapa detik, prototipe sistem Maxima-mu akan langsung tayang (*live*) dan bisa diakses lewat tautan publik Vercel!

## 👥 Role (Peran) yang Tersedia di Prototipe
Saat membuka prototipe, kamu akan disambut halaman login *role-selector*. Kamu bisa masuk sebagai:
- **Siswa**: Melihat tagihan, akademik, dan status dokumen ke Jerman.
- **Marketing**: Analisis leads, input data prospek, dan *generate* link daftar.
- **Finance**: Pantau uang masuk, kirim invoice, dan sistem *Gatekeeper* pemblokiran akses.
- **Kepala Akademik**: Memantau jadwal kelas dan performa/alert siswa berisiko.
- **Admission**: Proses pencarian *Partner* di Jerman (RS/Perusahaan) dan mengurus administrasi Visa.

---
*Generated based on PRD Specifications.*
