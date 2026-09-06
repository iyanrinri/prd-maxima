'use server';

import { prisma } from '@/lib/db';
import { revalidatePath } from 'next/cache';

export async function createTagihan(data: any) {
  try {
    const tagihan = await prisma.tagihan.create({
      data: {
        siswaId: data.siswaId,
        termin: data.termin,
        nominalRupiah: data.nominalRupiah,
        nominalEuro: data.nominalEuro,
        jatuhTempo: new Date(data.jatuhTempo),
        status: data.status || 'BELUM_BAYAR',
      },
    });
    revalidatePath('/admin/keuangan/tagihan');
    return { success: true, data: tagihan };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function getTagihanList() {
  try {
    const tagihans = await prisma.tagihan.findMany({
      include: {
        siswa: true,
        pembayarans: true,
      },
      orderBy: { createdAt: 'desc' }
    });
    return { success: true, data: tagihans };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function createPembayaran(data: any) {
  try {
    // 1. Create pembayaran
    const pembayaran = await prisma.pembayaran.create({
      data: {
        siswaId: data.siswaId,
        tagihanId: data.tagihanId || null,
        nominalRupiah: data.nominalRupiah,
        nominalEuro: data.nominalEuro || 0,
        keterangan: data.keterangan,
        metode: data.metode,
        tanggal: new Date(data.tanggal),
        status: 'LUNAS', // Default as LUNAS for the payment itself
      },
    });

    // 2. Update Tagihan Status if tagihanId is provided
    if (data.tagihanId) {
      const tagihan = await prisma.tagihan.findUnique({
        where: { id: data.tagihanId },
        include: { pembayarans: true }
      });

      if (tagihan) {
        const totalDibayar = tagihan.pembayarans.reduce((sum, p) => sum + p.nominalRupiah, 0);
        
        let newStatus = 'BELUM_BAYAR';
        if (totalDibayar >= tagihan.nominalRupiah) {
          newStatus = 'LUNAS';
        } else if (totalDibayar > 0) {
          newStatus = 'SEBAGIAN';
        }

        if (newStatus !== tagihan.status) {
          await prisma.tagihan.update({
            where: { id: tagihan.id },
            data: { status: newStatus }
          });
        }
      }
    }

    // 3. Create ArusKas entry
    await prisma.arusKas.create({
      data: {
        tipe: 'CASH_IN',
        kategori: 'PEMBAYARAN_SISWA',
        nominal: data.nominalRupiah,
        keterangan: `Pembayaran dari ${data.siswaId} - ${data.keterangan}`,
        tanggal: new Date(data.tanggal),
        pembayaranId: pembayaran.id
      }
    });

    revalidatePath('/admin/keuangan');
    revalidatePath('/admin/keuangan/pembayaran');
    revalidatePath('/admin/keuangan/arus-kas');
    return { success: true, data: pembayaran };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function updatePaketTermin(paketId: string, data: any) {
  try {
    const updated = await prisma.paket.update({
      where: { id: paketId },
      data: {
        terminA2: data.terminA2 || 0,
        terminB1: data.terminB1 || 0,
        terminB2: data.terminB2 || 0,
        terminPaspor: data.terminPaspor || 0,
        terminUjian: data.terminUjian || 0,
        terminWorkshop: data.terminWorkshop || 0,
        terminPerusahaan: data.terminPerusahaan || 0,
        terminVisa: data.terminVisa || 0,
      }
    });
    revalidatePath('/admin/keuangan/paket');
    return { success: true, data: updated };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function createPromoCode(data: any) {
  try {
    const promo = await prisma.promoCode.create({
      data: {
        kode: data.kode,
        jenis: data.jenis,
        nilaiRupiah: data.nilaiRupiah || 0,
        nilaiEuro: data.nilaiEuro || 0,
        nilaiPersentase: data.nilaiPersentase || 0,
        kuota: data.kuota ? parseInt(data.kuota) : null,
        berlakuHingga: data.berlakuHingga ? new Date(data.berlakuHingga) : null,
      }
    });
    revalidatePath('/admin/keuangan/promo');
    return { success: true, data: promo };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function createArusKas(data: any) {
  try {
    const arusKas = await prisma.arusKas.create({
      data: {
        tipe: data.tipe,
        kategori: data.kategori,
        nominal: data.nominal,
        keterangan: data.keterangan,
        tanggal: data.tanggal ? new Date(data.tanggal) : new Date(),
      }
    });
    revalidatePath('/admin/keuangan/arus-kas');
    return { success: true, data: arusKas };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}
