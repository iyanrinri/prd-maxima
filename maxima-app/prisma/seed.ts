import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
  console.log('Memulai seeder...')

  // 1. Buat Paket
  const paketAusbildung = await prisma.paket.upsert({
    where: { id: 'paket-ausbildung' },
    update: {},
    create: {
      id: 'paket-ausbildung',
      nama: 'Ausbildung - 36',
      deskripsi: 'Program persiapan bahasa intensif khusus untuk calon peserta Ausbildung di Jerman dengan target sertifikasi B2.',
      hargaRupiah: 36000000,
      hargaEuro: 800,
      ambangPaspor: 21000000,
      ambangUjian: 25000000,
      ambangPemberkasan: 30000000,
      ambangKontrak: 33000000,
      ambangVisa: 36000000,
    }
  });

  // 2. Promo Code
  const promoAkhirTahun = await prisma.promoCode.upsert({
    where: { kode: 'AKHIRTAHUN26' },
    update: {},
    create: {
      kode: 'AKHIRTAHUN26',
      jenis: 'NOMINAL',
      nilaiRupiah: 2000000,
      kuota: 100,
      berlakuHingga: new Date('2026-12-31')
    }
  });

  // 3. Buat Pengajar & Kelas
  const pengajar = await prisma.pengajar.upsert({
    where: { email: 'schmidt@maxima.com' },
    update: {},
    create: {
      nama: 'Herr Schmidt',
      email: 'schmidt@maxima.com',
    }
  });

  const pengajar2 = await prisma.pengajar.upsert({
    where: { email: 'muller@maxima.com' },
    update: {},
    create: {
      nama: 'Frau Müller',
      email: 'muller@maxima.com',
    }
  });

  const kelasBerlin = await prisma.kelas.upsert({
    where: { id: 'kelas-berlin' },
    update: {},
    create: {
      id: 'kelas-berlin',
      nama: 'Berlin',
      level: 'A1',
      bab: 4,
      pengajarId: pengajar.id,
    }
  });

  const kelasMunchen = await prisma.kelas.upsert({
    where: { id: 'kelas-munchen' },
    update: {},
    create: {
      id: 'kelas-munchen',
      nama: 'München',
      level: 'B1',
      bab: 1,
      pengajarId: pengajar2.id,
    }
  });

  // 4. Evaluasi Kelas
  await prisma.evaluasiKelas.create({
    data: {
      kelasId: kelasBerlin.id,
      kendalaKelas: 'Siswa sering datang terlambat',
      evaluasiPengajar: 'Materi disampaikan dengan baik, perlu perbanyak speaking'
    }
  });

  await prisma.evaluasiKelas.create({
    data: {
      kelasId: kelasMunchen.id,
      kendalaKelas: 'Siswa kurang aktif bertanya',
      evaluasiPengajar: 'Pengajar sangat interaktif dan membantu'
    }
  });

  // 5. Jadwal Akademik
  await prisma.jadwalAkademik.create({
    data: {
      kelasId: kelasBerlin.id,
      jenis: 'Kelas',
      keterangan: 'Sesi Reguler - Bab 4',
      tanggal: new Date(),
      jamMulai: '08:00',
      jamSelesai: '10:00',
      status: 'Akan Dimulai'
    }
  });

  await prisma.jadwalAkademik.create({
    data: {
      kelasId: kelasMunchen.id,
      jenis: 'Kelas',
      keterangan: 'Sesi Intensif - B1',
      tanggal: new Date(),
      jamMulai: '10:00',
      jamSelesai: '12:00',
      status: 'Akan Dimulai'
    }
  });

  // --- GENERATE 53 DUMMY SISWA UNTUK MEMENUHI DATA APP ---
  console.log('Men-generate 53 data siswa tambahan...');
  
  const cabangOptions = ['Jakarta', 'Bandung', 'Jakarta', 'Jakarta', 'Bandung']; // 60% Jkt, 40% Bdg
  
  const namaRealistis = [
    "Riska Mustikawati", "Budi Santoso", "Siti Aminah",
    "Andi Saputra", "Bima Nugraha", "Cahya Fitriani", "Dinda Permatasari", "Eko Prasetyo",
    "Fajar Rahman", "Gita Saraswati", "Hadi Kusuma", "Indah Lestari", "Joko Susilo",
    "Kartika Wijaya", "Lina Marlina", "Muhammad Rizky", "Nadia Oktaviani", "Oka Pratama",
    "Putri Ramadhani", "Qori Maharani", "Reza Fahlevi", "Siti Nurhaliza", "Tegar Hidayat",
    "Umar Maulana", "Vira Yuniar", "Wahyudi Syahputra", "Xavier Antonio", "Yuniarti Ningsih",
    "Zaki Mubarok", "Aditya Suryono", "Bunga Citra", "Chandra Kirana", "Dian Sastro",
    "Erlangga Bima", "Farhan Siregar", "Gilang Dirga", "Hendra Setiawan", "Irfan Hakim",
    "Jamaluddin", "Kurniawan Dwi", "Lesti Andryani", "Maulana Malik", "Novita Sari",
    "Oki Setiana", "Prilly Latuconsina", "Qonita Aulia", "Rafi Ahmad", "Syifa Hadju",
    "Tari Lestari", "Ujang Sudrajat", "Vino Bastian", "Wulan Guritno", "Yayan Ruhian",
    "Zaskia Sungkar"
  ];

  // 3b. Buat Konsultan
  const konsultan1 = await prisma.konsultan.create({
    data: { nama: 'Riska Mustikawati (Konsultan A)' }
  });
  const konsultan2 = await prisma.konsultan.create({
    data: { nama: 'Andi Saputra (Konsultan B)' }
  });
  const konsultan3 = await prisma.konsultan.create({
    data: { nama: 'Siti Aminah (Konsultan C)' }
  });
  
  const konsultanOptions = [konsultan1.id, konsultan2.id, konsultan3.id];
  const sumberLeadOptions = ['Sosmed', 'Rekomendasi Alumni', 'Referal', 'Expo', 'Iklan Google'];
  const pendidikanOptions = ['SMA', 'SMK', 'D3', 'S1', 'S2'];
  const domisiliOptions = ['Jakarta', 'Bandung', 'Surabaya', 'Medan', 'Makassar', 'Semarang', 'Yogyakarta'];

  for (let i = 1; i <= 53; i++) {
    const isBandung = i % 3 === 0;
    const currentCabang = cabangOptions[i % 5];
    const currentKelasId = isBandung ? kelasMunchen.id : kelasBerlin.id;
    const currentPengajarId = isBandung ? pengajar2.id : pengajar.id;
    const isRisky = i % 7 === 0;
    const isLulus = i % 5 === 0;
    const baseScore = isRisky ? 40 : (isLulus ? 85 : 70); 

    const currentKonsultanId = konsultanOptions[i % 3];
    const currentSumberLead = sumberLeadOptions[i % 5];
    const currentUsia = 18 + (i % 8); // Umur 18 - 25
    const currentPendidikan = pendidikanOptions[i % 5];
    const currentDomisili = domisiliOptions[i % 7];

    const newSiswa = await prisma.siswa.upsert({
      where: { noKontrak: `MX-2026-${i.toString().padStart(3, '0')}` },
      update: {},
      create: {
        noKontrak: `MX-2026-${i.toString().padStart(3, '0')}`,
        namaLengkap: namaRealistis[i - 1] || `Siswa Baru ${i}`,
        program: isRisky ? 'Au Pair' : 'Ausbildung',
        cabang: currentCabang,
        tahapanAdmission: isLulus ? 'Alumni' : 'Sedang Belajar Bahasa',
        paketId: paketAusbildung.id,
        kelasId: currentKelasId,
        
        // Marketing & Demografi
        konsultanId: currentKonsultanId,
        sumberLead: currentSumberLead,
        usia: currentUsia,
        pendidikanTerakhir: currentPendidikan,
        domisili: currentDomisili,
      }
    });

    // Kehadiran
    for (let j = 0; j < 3; j++) {
      await prisma.kehadiran.create({
        data: { 
          siswaId: newSiswa.id, 
          status: isRisky && j > 0 ? 'Alpha' : 'Hadir', 
          tanggal: new Date(Date.now() - (j * 24 * 60 * 60 * 1000))
        }
      });
    }

    // Nilai Akademik
    await prisma.nilai.create({
      data: {
        siswaId: newSiswa.id,
        jenis: isBandung ? 'B1' : 'A1',
        lesen: baseScore + (i % 10),
        horen: baseScore + (i % 8),
        schreiben: baseScore + (i % 12),
        sprechen: baseScore + (i % 15),
        grammatik: baseScore + (i % 9),
        wortschatz: baseScore + (i % 11)
      }
    });

    // Raport
    await prisma.raport.create({
      data: {
        catatan: isRisky ? 'Siswa perlu bimbingan tambahan, sering tidak hadir.' : 'Progres belajar sangat baik, pertahankan.',
        siswaId: newSiswa.id,
        pengajarId: currentPengajarId
      }
    });

    // Tugas
    if (!isRisky) {
      await prisma.tugas.create({
        data: { judul: `Latihan Bab ${i%5}`, selesai: true, siswaId: newSiswa.id, kelasId: currentKelasId }
      });
    }

    // Ujian Sertifikasi (Tabel Lama Akademik)
    if (isLulus || isBandung) {
      await prisma.ujianSertifikasi.create({
        data: {
          namaUjian: isBandung ? 'Goethe Zertifikat B1' : 'Goethe Zertifikat A1',
          lulus: isLulus,
          nilai: isLulus ? 85 : 65,
          siswaId: newSiswa.id
        }
      });
    }

    // Progres Bahasa
    await prisma.progresBahasa.create({
      data: {
        siswaId: newSiswa.id,
        level: isBandung ? 'B1' : 'A1',
        statusLulus: isLulus,
        sedangBelajar: !isLulus
      }
    });

    // Keuangan: Tagihan & Pembayaran & Arus Kas
    const tagihanDP = await prisma.tagihan.create({
      data: {
        siswaId: newSiswa.id,
        termin: 'DP',
        nominalRupiah: 10000000,
        jatuhTempo: new Date(Date.now() - (30 * 24 * 60 * 60 * 1000)),
        status: 'LUNAS',
        promoId: i % 10 === 0 ? promoAkhirTahun.id : null
      }
    });

    const pembayaranDP = await prisma.pembayaran.create({
      data: {
        siswaId: newSiswa.id,
        tagihanId: tagihanDP.id,
        nominalRupiah: i % 10 === 0 ? 8000000 : 10000000,
        keterangan: 'Pembayaran DP Awal',
        metode: 'Transfer Bank BCA',
        status: 'LUNAS'
      }
    });

    await prisma.arusKas.create({
      data: {
        tipe: 'CASH_IN',
        kategori: 'PEMBAYARAN_SISWA',
        nominal: pembayaranDP.nominalRupiah,
        keterangan: `Pembayaran DP ${newSiswa.namaLengkap}`,
        pembayaranId: pembayaranDP.id
      }
    });

    // Dokumen Siswa
    await prisma.dokumenSiswa.upsert({
      where: { siswaId: newSiswa.id },
      update: {},
      create: {
        siswaId: newSiswa.id,
        pasFoto: 'https://example.com/pasfoto.jpg',
        aktaKelahiran: isLulus ? 'https://example.com/akta.pdf' : null,
        kartuKeluarga: isLulus ? 'https://example.com/kk.pdf' : null,
        paspor: isLulus ? 'https://example.com/paspor.pdf' : null,
      }
    });

    // Rekomendasi Ujian & Jadwal Ujian
    if (isLulus || isBandung) {
      await prisma.rekomendasiUjian.create({
        data: {
          siswaId: newSiswa.id,
          namaUjian: 'Goethe Zertifikat B1',
          status: isLulus ? 'Lulus' : 'Direkomendasikan'
        }
      });

      await prisma.jadwalUjianBahasa.create({
        data: {
          siswaId: newSiswa.id,
          jenisUjian: 'Goethe B1',
          level: 'B1',
          tanggalUjian: new Date(Date.now() + (15 * 24 * 60 * 60 * 1000)),
          status: isLulus ? 'Lulus' : 'Terdaftar',
          hasil: isLulus ? 'Lulus' : null
        }
      });
      
      if (isLulus) {
        await prisma.sertifikatBahasaDetail.create({
          data: {
            siswaId: newSiswa.id,
            jenisSertifikat: 'Goethe',
            level: 'B1',
            nilaiLesen: 85,
            nilaiHoren: 80,
            nilaiSprechen: 88,
            nilaiSchreiben: 82
          }
        });
      }
    }

    // Layanan Siswa & Partner & Wawancara (Untuk yang lulus / bandung)
    if (isLulus) {
      await prisma.layananSiswa.create({
        data: {
          siswaId: newSiswa.id,
          jenisLayanan: 'Pembuatan Paspor',
          status: 'Bisa diproses'
        }
      });

      await prisma.progresPartner.create({
        data: {
          siswaId: newSiswa.id,
          partnerName: 'Klinik München GmbH',
          posisi: 'Pflegefachkraft',
          status: 'Dapat Kontrak',
          catatanAdmission: 'Dokumen kontrak sudah turun'
        }
      });

      await prisma.latihanWawancara.create({
        data: {
          siswaId: newSiswa.id,
          posisi: 'Pflegefachkraft',
          tanggal: new Date(Date.now() - (5 * 24 * 60 * 60 * 1000)),
          status: 'Selesai',
          pic: 'Frau Schmidt',
          catatan: 'Lancar dan komunikatif'
        }
      });

      await prisma.timelineAdmission.create({
        data: {
          siswaId: newSiswa.id,
          aktivitas: 'Tanda Tangan Kontrak',
          deskripsi: 'Siswa menandatangani kontrak kerja dengan Klinik München'
        }
      });

      await prisma.dataAlumni.create({
        data: {
          siswaId: newSiswa.id,
          perusahaan: 'Klinik München GmbH',
          posisiJurusan: 'Pflegefachkraft',
          kota: 'München',
          bundesland: 'Bayern',
          tanggalKeberangkatan: new Date(Date.now() + (60 * 24 * 60 * 60 * 1000))
        }
      });
    }
  }

  // Pengeluaran Kas (Arus Kas Out)
  await prisma.arusKas.create({
    data: {
      tipe: 'CASH_OUT',
      kategori: 'OPERASIONAL',
      nominal: 5000000,
      keterangan: 'Pembayaran Listrik & Internet Bulan Ini'
    }
  });
  
  await prisma.arusKas.create({
    data: {
      tipe: 'CASH_OUT',
      kategori: 'OPERASIONAL',
      nominal: 12000000,
      keterangan: 'Gaji Pengajar'
    }
  });

  console.log('✅ Seeder berhasil dijalankan! 53 Siswa terdaftar. Database siap digunakan.')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
