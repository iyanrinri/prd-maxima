export const MOCK_STUDENTS = [
  {
    id: 1, name: 'Sarah Jenkins', program: 'Ausbildung', 
    financeStatus: 'Lunas', // Gatekeeper Pass
    admissionStatus: 'Proses Partner', 
    documents: { pasFoto: true, ktp: true, cv: true, motivationLetter: true, videoPerkenalan: true },
    sertifikat: { level: 'B1', lesen: 85, horen: 90, schreiben: 80, sprechen: 88, status: 'Lulus' },
    partner: { namaRS: 'Charité Berlin', statusWawancara: 'Lulus', statusKontrak: 'Tanda Tangan' },
    alumni: { kota: 'Berlin', bundesland: 'Berlin', visaStatus: 'Granted', berangkat: '2023-12-01' }
  },
  {
    id: 2, name: 'Ahmad Bustomi', program: 'Au Pair', 
    financeStatus: 'Belum Lunas', // Gatekeeper Block
    admissionStatus: 'Pemberkasan', 
    documents: { pasFoto: true, ktp: true, cv: false, motivationLetter: false, videoPerkenalan: false },
    sertifikat: { level: 'A1', lesen: 70, horen: 65, schreiben: null, sprechen: null, status: 'Proses Belajar' },
    partner: { namaRS: '-', statusWawancara: '-', statusKontrak: '-' },
    alumni: { kota: '-', bundesland: '-', visaStatus: '-', berangkat: '-' }
  },
  {
    id: 3, name: 'Budi Santoso', program: 'FSJ', 
    financeStatus: 'Lunas', // Gatekeeper Pass
    admissionStatus: 'Visa Granted', 
    documents: { pasFoto: true, ktp: true, cv: true, motivationLetter: true, videoPerkenalan: true },
    sertifikat: { level: 'B1', lesen: 78, horen: 80, schreiben: 75, sprechen: 82, status: 'Lulus' },
    partner: { namaRS: 'Rotes Kreuz München', statusWawancara: 'Lulus', statusKontrak: 'Aktif' },
    alumni: { kota: 'München', bundesland: 'Bayern', visaStatus: 'Granted', berangkat: '2023-10-15' }
  },
  {
    id: 4, name: 'Siti Aminah', program: 'Ausbildung', 
    financeStatus: 'Lunas', // Gatekeeper Pass
    admissionStatus: 'Menunggu Ujian', 
    documents: { pasFoto: true, ktp: true, cv: true, motivationLetter: true, videoPerkenalan: false },
    sertifikat: { level: 'B1', lesen: null, horen: null, schreiben: null, sprechen: null, status: 'Terdaftar Ujian' },
    partner: { namaRS: '-', statusWawancara: '-', statusKontrak: '-' },
    alumni: { kota: '-', bundesland: '-', visaStatus: '-', berangkat: '-' }
  }
];
