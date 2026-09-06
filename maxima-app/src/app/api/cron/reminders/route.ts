import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function GET(request: Request) {
  // Verifikasi Authorization header untuk keamanan cron job
  const authHeader = request.headers.get('authorization');
  if (authHeader !== `Bearer ${process.env.CRON_SECRET || 'dev_secret'}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const today = new Date();
    // H-7 = 7 hari ke depan
    const plus7Days = new Date(today);
    plus7Days.setDate(plus7Days.getDate() + 7);
    
    // H+1 = 1 hari ke belakang (kemarin, artinya baru saja overdue)
    const minus1Day = new Date(today);
    minus1Day.setDate(minus1Day.getDate() - 1);

    // Cari tagihan yang jatuh temponya antara H-7 sampai H+1 dan belum lunas
    const tagihans = await prisma.tagihan.findMany({
      where: {
        status: { in: ['BELUM_BAYAR', 'SEBAGIAN'] },
        jatuhTempo: {
          gte: minus1Day,
          lte: plus7Days
        }
      },
      include: {
        siswa: true
      }
    });

    const notificationsSent: any[] = [];

    for (const t of tagihans) {
      // Hitung sisa hari (bisa positif/H-x, atau negatif/Overdue)
      const diffTime = Math.ceil((new Date(t.jatuhTempo).getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
      
      const message = `Halo ${t.siswa.namaLengkap}, ini adalah pengingat untuk tagihan ${t.termin} Anda sebesar Rp ${t.nominalRupiah}. Jatuh tempo dalam ${diffTime} hari pada ${new Date(t.jatuhTempo).toLocaleDateString('id-ID')}.`;
      
      // TODO: Integrasi dengan Email SMTP / WhatsApp API sebenarnya di sini.
      console.log(`[CRON REMINDER - ${t.siswa.email}]:`, message);

      notificationsSent.push({
        siswa: t.siswa.namaLengkap,
        email: t.siswa.email,
        sisaHari: diffTime,
        status: 'LOGGED'
      });
    }

    return NextResponse.json({ 
      success: true, 
      processed: notificationsSent.length,
      data: notificationsSent
    });

  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
