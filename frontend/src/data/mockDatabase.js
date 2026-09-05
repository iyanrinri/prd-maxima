// Master Data terpusat mengikuti struktur 01_master_data_siswa_schema.md

export const TabelSiswa = [
  {
    id: 1,
    panggilan: 'Frau',
    namaDepan: 'Riska Mustikawati',
    namaBelakang: 'Efendi',
    namaLengkap: 'Riska Mustikawati Efendi',
    noKontrak: '020-000-BDG-2022',
    status: 'AKTIF',
    tahunMasuk: 2022,
    cabang: 'BANDUNG',
    program: 'AUSBILDUNG',
    jurusanProgram: 'ALLE',
    noSiswa: '081222153594',
    noIbu: '081222152684',
    noAyah: '-',
    alamat: 'Gg. Halteu Selatan I RT 01 RW 03 Kelurahan Dungus Cariang Kecamatan Andir Kota Bandung',
    konsultan: 'Topan Hardian',
    paketLayanan: 'ADM - 15',
    totalHargaIDR: 15000000,
    totalHargaEUR: 800,
    tanggalDP: '2022-01-15',
    dibayarIDR: 10000000,
    dibayarEUR: 0,
    kekuranganIDR: 5000000,
    kekuranganEUR: 800,
    statusPembayaran: 'Belum Lunas',
    pendidikan: 'SMK',
    kampus: 'SMK PASUNDAN 2 BANDUNG',
    jurusanPendidikan: 'Teknik Komputer Jaringan',
    lulusanTahun: 2014,
    tanggalLahir: '1996-05-12',
    driveSiswa: 'https://drive.google.com/drive/folders/mock',
    milestoneKursus: { A2: true, B1: true, B2: false },
    milestoneLayanan: { passport: true, ujian: true, workshop: false, pencarianKontrak: false, visa: false }
  },
  {
    id: 2,
    panggilan: 'Herr',
    namaDepan: 'Dominique',
    namaBelakang: 'Sasongko',
    namaLengkap: 'Dominique Sasongko',
    noKontrak: '001-000-BDG-2019',
    status: 'ALUMNI',
    tahunMasuk: 2019,
    cabang: 'BANDUNG',
    program: 'AUSBILDUNG',
    jurusanProgram: '-',
    noSiswa: '08123456789',
    noIbu: '08129876543',
    noAyah: '-',
    alamat: 'Jl. Merdeka No 1',
    konsultan: 'Faisal Riyadi',
    paketLayanan: 'ADM - 15',
    totalHargaIDR: 14550000,
    totalHargaEUR: 800,
    tanggalDP: '2019-05-10',
    dibayarIDR: 14100000,
    dibayarEUR: 800,
    kekuranganIDR: 450000,
    kekuranganEUR: 0,
    statusPembayaran: 'Belum Lunas',
    pendidikan: 'SMA',
    kampus: 'SMA 1 Bandung',
    jurusanPendidikan: 'IPA',
    lulusanTahun: 2018,
    tanggalLahir: '2000-01-01',
    driveSiswa: 'https://drive.google.com/drive/folders/mock2',
    milestoneKursus: { A2: true, B1: true, B2: true },
    milestoneLayanan: { passport: true, ujian: true, workshop: true, pencarianKontrak: true, visa: true }
  }
];

export const TabelProgresAkademik = [
  {
    idSiswa: 1, // Relasi ke Riska
    kehadiran: '85%',
    tingkatA1: 'Lulus',
    tingkatA2: 'Lulus',
    tingkatB1: 'Lulus',
    tingkatB2: 'Mengulang',
    rekomendasiB1: 'Direkomendasikan',
    rekomendasiB2: 'Tidak Direkomendasikan',
    ujianB1: '2023-02-26',
    ujianB2: '-',
    noHpPribadi: '081222153594',
    noHpOrtu: '081222152684'
  }
];

export const TabelSertifikasiUjian = [
  {
    idSiswa: 1,
    keteranganUjian: 'Sudah Punya',
    jenisSertifikat: 'Goethe',
    levelSertifikat: 'B1',
    skorLesen: null,
    lesenExpired: '2026-02-26',
    skorHoren: null,
    horenExpired: '2026-02-26',
    skorSchreiben: null,
    schreibenExpired: '2026-02-26',
    skorSprechen: null,
    sprechenExpired: '2026-02-26'
  },
  {
    idSiswa: 2,
    keteranganUjian: 'Sudah Punya',
    jenisSertifikat: 'Goethe',
    levelSertifikat: 'B1',
    skorLesen: 80,
    lesenExpired: '2024-05-10',
    skorHoren: 75,
    horenExpired: '2024-05-10',
    skorSchreiben: 82,
    schreibenExpired: '2024-05-10',
    skorSprechen: 90,
    sprechenExpired: '2024-05-10'
  }
];

export const TabelKelengkapanDokumen = [
  {
    idSiswa: 1,
    // Pribadi
    pasFoto: 'Sudah', aktaKelahiran: 'Sudah', kartuKeluarga: 'Sudah', ktp: 'Sudah', ijazah: 'Sudah', transkrip: 'Belum', catatanPribadi: 'Transkrip masih di legalisir',
    // Keberangkatan
    paspor: 'Sudah', aktaTerjemah: 'Belum', aktaApostille: 'Belum', ijazahTerjemah: 'Sudah', ijazahApostille: 'Belum', transkripTerjemah: 'Belum', catatanAdmission: '',
    // Bewerbung
    cv: 'Sudah', motivationLetter: 'Sudah', videoPerkenalan: 'Belum', catatanBewerbung: 'Video perkenalan kurang dari 1 menit',
    // Link
    driveSiswa: 'http://drive...', driveAdmission: 'http://drive...', email: 'riska@gmail.com / Pass123'
  }
];

export const TabelTrackingPartner = [
  {
    idSiswa: 1,
    posisiDilamar: 'Restaurantfachfrau',
    wawancaraKe: 1,
    tanggalLatihan: '2023-05-10',
    catatanLatihan: 'Masih kurang lancar',
    partnerDiproses: 'DVAG, AS',
    jumlahDiproses: 2,
    jumlahGagal: 0,
    partnerTerakhir: 'DVAG',
    progresTerakhir: 'Unterlagen Masuk',
    updateTerakhir: '2023-06-01',
    statusTracking: 'Sedang Diproses',
    catatanPartner: 'Menunggu jadwal interview',
    catatanAdmission: '-'
  }
];

export const TabelAlumni = [
  {
    idSiswa: 2, // Dominique
    jenisVisa: 'Ausbildung',
    tanggalKeberangkatan: '2023-09-01',
    tanggalMulaiKontrak: '2023-10-01',
    tanggalSelesaiKontrak: '2026-09-30',
    partner: 'AS',
    perusahaan: 'Azurit',
    alamatPerusahaan: 'Berlin Weg 1',
    kota: 'Berlin',
    sekolah: 'Berufsschule Berlin',
    website: 'www.azurit.de',
    tanggalPengajuanVisa: '2023-07-01',
    tanggalWawancaraVisa: '2023-07-15',
    tanggalVisaTerbit: '2023-08-10',
    masaBerlakuVisa: '2026-09-30',
    tautanGDrive: 'http://drive...'
  }
];

// Helper untuk join data berdasarkan ID Siswa agar komponen UI mudah mengkonsumsinya
export const getFullSiswaData = () => {
  return TabelSiswa.map(siswa => {
    return {
      ...siswa,
      akademik: TabelProgresAkademik.find(a => a.idSiswa === siswa.id) || null,
      sertifikasi: TabelSertifikasiUjian.find(s => s.idSiswa === siswa.id) || null,
      dokumen: TabelKelengkapanDokumen.find(d => d.idSiswa === siswa.id) || null,
      tracking: TabelTrackingPartner.find(t => t.idSiswa === siswa.id) || null,
      alumni: TabelAlumni.find(al => al.idSiswa === siswa.id) || null,
    };
  });
};
