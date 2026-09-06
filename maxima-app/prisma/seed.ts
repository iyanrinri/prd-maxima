import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
  console.log('Memulai seeder...')

  // 1. Buat Paket
  const paketAusbildung = await prisma.paket.create({
    data: {
      nama: 'Ausbildung - 36',
      deskripsi: 'Program persiapan bahasa intensif khusus untuk calon peserta Ausbildung di Jerman dengan target sertifikasi B2. Termasuk bimbingan visa dan dokumen paspor.',
      hargaRupiah: 36000000,
      hargaEuro: 800,
      ambangPaspor: 21000000,
      ambangUjian: 25000000,
      ambangPemberkasan: 30000000,
      ambangKontrak: 33000000,
      ambangVisa: 36000000,
    }
  })

  // 3. Buat Pengajar & Kelas
  const pengajar = await prisma.pengajar.create({
    data: {
      nama: 'Herr Schmidt',
      email: 'schmidt@maxima.com',
    }
  });

  const kelasBerlin = await prisma.kelas.create({
    data: {
      nama: 'Berlin',
      level: 'A1',
      bab: 4,
      pengajarId: pengajar.id,
    }
  });

  // 4. Buat Siswa
  const siswa1 = await prisma.siswa.upsert({
    where: { noKontrak: 'MX-2026-001' },
    update: {},
    create: {
      noKontrak: 'MX-2026-001',
      namaLengkap: 'Riska Mustikawati',
      program: 'Ausbildung',
      cabang: 'Jakarta',
      paketId: paketAusbildung.id,
      kelasId: kelasBerlin.id,
    }
  });

  // 5. Pembayaran
  await prisma.pembayaran.create({
    data: {
      siswaId: siswa1.id,
      nominalRupiah: 20000000,
      keterangan: 'Pembayaran DP',
      metode: 'Transfer Bank BCA',
      status: 'LUNAS'
    }
  });

  // 6. Kehadiran
  await prisma.kehadiran.create({
    data: { siswaId: siswa1.id, status: 'Hadir', tanggal: new Date() }
  });

  // 7. Nilai Dummy
  await prisma.nilai.create({
    data: {
      siswaId: siswa1.id,
      jenis: 'A1',
      lesen: 80,
      horen: 75,
      schreiben: 85,
      sprechen: 70,
      grammatik: 80,
      wortschatz: 75
    }
  });

  // 8. Jadwal Akademik (Detail dengan jam)
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

  // 9. Tugas Dummy
  await prisma.tugas.create({
    data: {
      judul: 'Latihan Menulis Surat (Schreiben)',
      selesai: false,
      siswaId: siswa1.id,
      kelasId: kelasBerlin.id
    }
  });

  // 10. Raport / Catatan
  await prisma.raport.create({
    data: {
      catatan: 'Siswa Riska sangat aktif di kelas, tapi perlu banyak latihan mendengarkan (Hören).',
      siswaId: siswa1.id,
      pengajarId: pengajar.id
    }
  });

  // 11. Ujian Sertifikasi (Goethe B1 mock)
  await prisma.ujianSertifikasi.create({
    data: {
      namaUjian: 'Goethe Zertifikat A1',
      lulus: true,
      nilai: 85,
      siswaId: siswa1.id
    }
  });

  // --- DUMMY EXTRA DATA ---
  
  // Extra Teacher & Class
  const pengajar2 = await prisma.pengajar.create({
    data: {
      nama: 'Frau Müller',
      email: 'muller@maxima.com',
    }
  });

  const kelasMunchen = await prisma.kelas.create({
    data: {
      nama: 'München',
      level: 'B1',
      bab: 1,
      pengajarId: pengajar2.id,
    }
  });

  // Extra Siswa 2 (At Risk Student in Berlin)
  const siswa2 = await prisma.siswa.upsert({
    where: { noKontrak: 'MX-2026-002' },
    update: {},
    create: {
      noKontrak: 'MX-2026-002',
      namaLengkap: 'Budi Santoso',
      program: 'Ausbildung',
      cabang: 'Jakarta',
      paketId: paketAusbildung.id,
      kelasId: kelasBerlin.id,
    }
  });

  await prisma.kehadiran.create({
    data: { siswaId: siswa2.id, status: 'Alpha', tanggal: new Date() }
  });
  await prisma.kehadiran.create({
    data: { siswaId: siswa2.id, status: 'Hadir', tanggal: new Date() }
  });
  await prisma.kehadiran.create({
    data: { siswaId: siswa2.id, status: 'Alpha', tanggal: new Date() }
  });

  await prisma.nilai.create({
    data: {
      siswaId: siswa2.id,
      jenis: 'A1',
      lesen: 40, horen: 50, schreiben: 45, sprechen: 30, grammatik: 50, wortschatz: 40
    }
  });

  await prisma.tugas.create({
    data: { judul: 'Latihan Menulis', selesai: false, siswaId: siswa2.id, kelasId: kelasBerlin.id }
  });
  await prisma.tugas.create({
    data: { judul: 'Latihan Mendengar', selesai: false, siswaId: siswa2.id, kelasId: kelasBerlin.id }
  });
  await prisma.tugas.create({
    data: { judul: 'Grammatik Test', selesai: false, siswaId: siswa2.id, kelasId: kelasBerlin.id }
  });
  await prisma.tugas.create({
    data: { judul: 'Wortschatz', selesai: false, siswaId: siswa2.id, kelasId: kelasBerlin.id }
  });

  // Extra Siswa 3 (Good Student in München)
  const siswa3 = await prisma.siswa.upsert({
    where: { noKontrak: 'MX-2026-003' },
    update: {},
    create: {
      noKontrak: 'MX-2026-003',
      namaLengkap: 'Siti Aminah',
      program: 'Au Pair',
      cabang: 'Bandung',
      paketId: paketAusbildung.id,
      kelasId: kelasMunchen.id,
    }
  });

  await prisma.kehadiran.create({
    data: { siswaId: siswa3.id, status: 'Hadir', tanggal: new Date() }
  });

  await prisma.nilai.create({
    data: {
      siswaId: siswa3.id,
      jenis: 'B1',
      lesen: 95, horen: 90, schreiben: 92, sprechen: 88, grammatik: 95, wortschatz: 98
    }
  });

  // --- GENERATE 50 DUMMY SISWA UNTUK MEMENUHI DATA APP ---
  console.log('Men-generate 50 data siswa tambahan...');
  
  const cabangOptions = ['Jakarta', 'Bandung', 'Jakarta', 'Jakarta', 'Bandung']; // 60% Jkt, 40% Bdg
  const kelasOptions = [kelasBerlin.id, kelasMunchen.id];
  
  for (let i = 4; i <= 53; i++) {
    const isBandung = i % 3 === 0;
    const currentCabang = cabangOptions[i % 5];
    const currentKelasId = isBandung ? kelasMunchen.id : kelasBerlin.id;
    
    // Generate Random Scores between 50-100 (some lower to trigger risk)
    const baseScore = i % 7 === 0 ? 40 : 70; 
    const isRisky = i % 7 === 0;

    const newSiswa = await prisma.siswa.upsert({
      where: { noKontrak: `MX-2026-${i.toString().padStart(3, '0')}` },
      update: {},
      create: {
        noKontrak: `MX-2026-${i.toString().padStart(3, '0')}`,
        namaLengkap: `Dummy Siswa ${i}`,
        program: isRisky ? 'Au Pair' : 'Ausbildung',
        cabang: currentCabang,
        paketId: paketAusbildung.id,
        kelasId: currentKelasId,
      }
    });

    // Random Attendances (3 records)
    for (let j = 0; j < 3; j++) {
      await prisma.kehadiran.create({
        data: { 
          siswaId: newSiswa.id, 
          status: isRisky && j > 0 ? 'Alpha' : 'Hadir', 
          tanggal: new Date(Date.now() - (j * 24 * 60 * 60 * 1000)) // Past dates
        }
      });
    }

    // Random Nilai
    await prisma.nilai.create({
      data: {
        siswaId: newSiswa.id,
        jenis: isBandung ? 'B1' : 'A1',
        lesen: baseScore + (i % 20),
        horen: baseScore + (i % 15),
        schreiben: baseScore + (i % 10),
        sprechen: baseScore + (i % 25),
        grammatik: baseScore + (i % 12),
        wortschatz: baseScore + (i % 18)
      }
    });

    // Create Tugas if not risky
    if (!isRisky) {
      await prisma.tugas.create({
        data: { judul: `Latihan Bab ${i%5}`, selesai: true, siswaId: newSiswa.id, kelasId: currentKelasId }
      });
    }
  }

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
