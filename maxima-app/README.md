# Maxima Stiftung - Sistem Manajemen Kursus & Penempatan (MVP)

Aplikasi ini adalah *Minimum Viable Product* (MVP) untuk sistem operasional PT. Maxima Sinergi Indonesia Jerman. Dibangun menggunakan arsitektur **Fullstack Next.js** dengan database **SQLite** (menggunakan ORM Prisma).

Sistem ini didesain menggantikan sistem *spreadsheet* lama, menyatukan 9 pintu masuk peran dan 21 tulang punggung tabel data.

## 🚀 Memulai Proyek Lokal

1. **Install Dependencies:**
   ```bash
   npm install
   ```

2. **Setup Database (Prisma SQLite):**
   ```bash
   # Terapkan skema ke database lokal
   npx prisma db push
   
   # Isi database dengan data awal (Seeder)
   npm run seed
   ```

3. **Jalankan Aplikasi:**
   ```bash
   npm run dev
   ```
   Buka `http://localhost:3000` di *browser* Anda.

---

## 🔑 Data Pengguna & Akses (Berdasarkan Seeder)

Untuk mencoba aplikasi, Anda dapat *login* menggunakan kredensial di bawah ini:

### 1. Akun Internal (Tim Maxima)
| Peran | Email | Password |
|---|---|---|
| **Super Admin** | `admin@maxima.com` | `password123` |
| **Kepala Akademik** | `akademik@maxima.com` | `password123` |
| **Pengajar (Guru)** | `pengajar@maxima.com` | `password123` |
| **Konsultan (Marketing)** | `konsultan@maxima.com` | `password123` |
| **Manajer Finance** | `finance@maxima.com` | `password123` |
| **Admission** | `admission@maxima.com` | `password123` |

### 2. Akun Siswa (Portal Klien)
| Nama | Email | Password |
|---|---|---|
| **Siswa Ausbildung** | `siswa@maxima.com` | `password123` |

---

## 🏗️ Struktur Proyek

- `/prisma`: Konfigurasi *database*, skema (`schema.prisma`), dan *seeder* (`seed.ts`).
- `/src/app`: Sistem *Routing* Next.js (App Router).
  - `/src/app/admin`: Rute khusus dasbor internal (RBAC Protected).
  - `/src/app/siswa`: Rute khusus portal siswa.
  - `/src/app/api`: Rute API Backend (*Route Handlers*).
- `/src/components`: Komponen antarmuka (*UI*) berbasis React dan Tailwind CSS.
- `/src/lib`: *Helper* dan utilitas, termasuk koneksi klien Prisma (`db.ts`).

---

## 🛠️ Panduan Pengembangan Prisma

Jika Anda melakukan perubahan pada file `prisma/schema.prisma` (misal menambah tabel baru), selalu jalankan perintah berikut agar tipe data TypeScript dan *database* Anda tersinkronisasi:

```bash
npx prisma db push
```

Untuk melihat dan mengelola isi *database* SQLite secara visual melalui browser:

```bash
npx prisma studio
```
