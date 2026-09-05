import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
  console.log('Memulai seeder...')

  // 1. Buat Paket
  const paketAusbildung = await prisma.paket.create({
    data: {
      nama: 'Ausbildung - 36',
      hargaRupiah: 36000000,
      hargaEuro: 800,
      ambangPaspor: 21000000,
      ambangUjian: 25000000,
      ambangPemberkasan: 30000000,
      ambangKontrak: 33000000,
      ambangVisa: 36000000,
    }
  })

  // 2. Buat Siswa
  const siswa = await prisma.siswa.create({
    data: {
      noKontrak: '020-000-BDG-2022',
      namaLengkap: 'Riska Mustikawati Efendi',
      program: 'Ausbildung',
      cabang: 'Bandung',
      status: 'AKTIF',
      paketId: paketAusbildung.id,
    }
  })

  // 3. Buat Pembayaran (DP)
  await prisma.pembayaran.create({
    data: {
      siswaId: siswa.id,
      nominalRupiah: 20000000,
      nominalEuro: 0,
      keterangan: 'Pembayaran DP',
      metode: 'Transfer Bank',
      status: 'LUNAS'
    }
  })

  console.log('✅ Seeder berhasil dijalankan! Database siap digunakan.')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
