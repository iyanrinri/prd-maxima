'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Mail, Lock, ArrowRight, Activity, BookOpen, GraduationCap } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Login gagal');
      }

      if (data.role === 'admin' || data.role === 'kepala_akademik') {
        router.push('/admin/dashboard');
      } else if (data.role === 'pengajar') {
        router.push('/pengajar/dashboard');
      } else {
        router.push('/siswa/dashboard');
      }
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Terjadi kesalahan yang tidak diketahui.');
      }
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex w-full bg-white font-sans text-slate-900">
      
      {/* KIRI - Visual / Dekoratif */}
      <div className="hidden lg:flex w-1/2 bg-slate-900 relative overflow-hidden flex-col justify-between p-12">
        {/* Dekorasi Gradient Mesh */}
        <div className="absolute top-[-20%] left-[-10%] w-[70%] h-[70%] rounded-full bg-blue-600/30 blur-[120px] pointer-events-none"></div>
        <div className="absolute bottom-[-10%] right-[-20%] w-[60%] h-[60%] rounded-full bg-indigo-500/20 blur-[100px] pointer-events-none"></div>
        
        <div className="relative z-10">
          <div className="flex items-center space-x-2 text-white">
            <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center">
              <GraduationCap className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold tracking-tight">Maxima Stiftung</span>
          </div>
        </div>

        <div className="relative z-10 max-w-md">
          <h1 className="text-5xl font-extrabold text-white leading-tight mb-6">
            Membangun Jembatan Karir ke Jerman.
          </h1>
          <p className="text-lg text-slate-400 mb-8 leading-relaxed">
            Sistem informasi terpadu untuk mengelola kursus bahasa, pemberkasan, hingga keberangkatan siswa ke Jerman secara real-time.
          </p>
          
          <div className="space-y-4">
            <div className="flex items-center text-slate-300">
              <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center mr-4">
                <BookOpen className="w-4 h-4 text-blue-400" />
              </div>
              <span>Manajemen Pembelajaran Interaktif</span>
            </div>
            <div className="flex items-center text-slate-300">
              <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center mr-4">
                <Activity className="w-4 h-4 text-blue-400" />
              </div>
              <span>Pemantauan Progres Real-Time</span>
            </div>
          </div>
        </div>
        
        <div className="relative z-10 text-slate-500 text-sm">
          &copy; 2026 PT. Maxima Sinergi Indonesia Jerman
        </div>
      </div>

      {/* KANAN - Form Login */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 sm:p-12 relative">
        <div className="w-full max-w-md space-y-10 relative z-10">
          
          {/* Header Form */}
          <div className="text-center lg:text-left">
            <h2 className="text-3xl font-bold text-slate-900 tracking-tight">Selamat Datang</h2>
            <p className="mt-2 text-slate-500">
              Masuk ke akun Anda untuk melanjutkan.
            </p>
          </div>

          {/* Form */}
          <form className="space-y-6" onSubmit={handleLogin}>
            
            {error && (
              <div className="p-4 rounded-xl bg-red-50 border border-red-100 flex items-start space-x-3">
                <div className="text-sm text-red-600 font-medium">{error}</div>
              </div>
            )}

            <div className="space-y-5">
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">Email Address</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-slate-400" />
                  </div>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="block w-full pl-10 pr-3 py-3 border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-600/50 focus:border-blue-600 transition-shadow bg-slate-50/50"
                    placeholder="nama@email.com"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium text-slate-700">Password</label>
                  <a href="#" className="text-sm font-medium text-blue-600 hover:text-blue-500">Lupa password?</a>
                </div>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-slate-400" />
                  </div>
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="block w-full pl-10 pr-3 py-3 border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-600/50 focus:border-blue-600 transition-shadow bg-slate-50/50"
                    placeholder="••••••••"
                  />
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center py-3.5 px-4 border border-transparent rounded-xl shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 group"
            >
              {loading ? (
                'Memproses...'
              ) : (
                <>
                  Masuk Sekarang
                  <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </form>
          
          <div className="pt-8 border-t border-slate-100">
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-4">Kredensial Demo</p>
            <div className="grid grid-cols-2 gap-3 text-xs text-slate-500">
              <div className="bg-slate-50 p-3 rounded-lg border border-slate-100 cursor-pointer hover:border-blue-300 transition-colors" onClick={() => { setEmail('admin@maxima.com'); setPassword('password123'); }}>
                <span className="block font-semibold text-slate-700 mb-1">Super Admin</span>
                admin@maxima.com<br/>password123
              </div>
              <div className="bg-slate-50 p-3 rounded-lg border border-slate-100 cursor-pointer hover:border-blue-300 transition-colors" onClick={() => { setEmail('akademik@maxima.com'); setPassword('password123'); }}>
                <span className="block font-semibold text-slate-700 mb-1">Kepala Akademik</span>
                akademik@maxima.com<br/>password123
              </div>
              <div className="bg-slate-50 p-3 rounded-lg border border-slate-100 cursor-pointer hover:border-blue-300 transition-colors" onClick={() => { setEmail('pengajar@maxima.com'); setPassword('password123'); }}>
                <span className="block font-semibold text-slate-700 mb-1">Pengajar</span>
                pengajar@maxima.com<br/>password123
              </div>
              <div className="bg-slate-50 p-3 rounded-lg border border-slate-100 cursor-pointer hover:border-blue-300 transition-colors" onClick={() => { setEmail('siswa@maxima.com'); setPassword('password123'); }}>
                <span className="block font-semibold text-slate-700 mb-1">Siswa</span>
                siswa@maxima.com<br/>password123
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
}
