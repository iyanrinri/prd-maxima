# PRD: Modul 3 - Manajemen Akademik (Pembelajaran)

## 1. Overview & Objective
*   **Latar belakang:** Penjadwalan manual sering membuat pusing pengajar (bentrok atau kelebihan jatah durasi), dan pencatatan nilai/absen masih terpencar.
*   **Tujuan:** Memusatkan jadwal belajar, presensi, dan *grading* di satu sistem terpadu agar durasi program sesuai dengan paket yang dibeli siswa.
*   **Metrik sukses:** Nol (0) kasus pertemuan kelas melebihi *quota* batas durasi paket, dan 100% absensi tercatat digital.

## 2. User Persona & Hak Akses
*   **Tim Pengajaran (Teacher/Admin):** Membuat jadwal sesi belajar, menginput absensi, memasukkan nilai harian, dan melampirkan bukti nilai ujian bahasa.
*   **Siswa (Viewer):** Melihat jadwal belajar miliknya dan melihat nilai akhir/raport.

## 3. User Flow (Alur Pengguna)
1. Siswa telah divalidasi oleh Finance dan berstatus "Aktif" (punya NIS).
2. Tim Pengajar masuk ke menu "Buat Jadwal".
3. Sistem mengecek *quota* durasi pertemuan sesuai "Paket Program" siswa:
    *   Jika *quota* pertemuan masih ada $\rightarrow$ form penjadwalan bisa disimpan.
    *   Jika *quota* habis $\rightarrow$ sistem menolak pembuatan jadwal (*error quota limit*).
4. Kelas berjalan. Setelah selesai, Pengajar masuk ke menu "Input Data".
5. Pengajar mengisi Absensi kehadiran dan Nilai Raport ke dalam profil siswa tersebut.
6. Saat tiba Ujian Bahasa, Pengajar mengunggah "Link Data Hasil Nilai Ujian" milik siswa ke sistem.

## 4. Functional Requirements (Fitur & Aturan Bisnis)

| ID | Fitur | Keterangan / Logic | Prioritas |
| :--- | :--- | :--- | :--- |
| FR-01 | Gatekeeper Penjadwalan | Jadwal HANYA BISA dibuat untuk siswa dengan status "Aktif" (sudah lunas pembayaran pendaftaran). | P0 (Must have) |
| FR-02 | Limit Durasi Paket Program | Sistem menghitung *quota* jadwal. Menolak *submit* jika jadwal yang dibuat melewati durasi maksimal paket program siswa. | P0 (Must have) |
| FR-03 | Form Absensi & Raport | *Field* digital terintegrasi untuk mencatat Kehadiran dan Nilai yang masuk langsung ke riwayat akademik siswa. | P0 (Must have) |
| FR-04 | Database Ujian Bahasa | Kolom khusus untuk *input* skor akhir dan upload/melampirkan Link bukti sertifikat Ujian Bahasa asing. | P1 (Should have) |

## 5. Non-Functional Requirements
*   **Keamanan Data Akademik:** Hanya Tim Pengajaran bersangkutan dan admin super yang bisa mengubah nilai (mencegah *tampering* data).
*   **User Interface (UI):** Tampilan penjadwalan dalam bentuk visual kalender agar pengajar mudah melihat jadwal kelas.

## 6. Out of Scope (Tidak Dikerjakan di Versi Ini)
*   Sistem *Live Class* (Video Conference terintegrasi Zoom/Gmeet).
*   Portal *Learning Management System* (LMS) rumit untuk *upload* tugas/PR siswa.
