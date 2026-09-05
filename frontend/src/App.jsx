import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import './App.css';
import Login from './pages/Login';
import Sidebar from './components/Sidebar';
import DashboardSiswa from './pages/DashboardSiswa';
import DashboardMarketing from './pages/DashboardMarketing';
import DashboardFinance from './pages/DashboardFinance';
import DashboardAkademik from './pages/DashboardAkademik';
import DashboardAdmission from './pages/DashboardAdmission';
import AdmissionDatabase from './pages/AdmissionDatabase';
import AdmissionUjian from './pages/AdmissionUjian';
import AdmissionPartner from './pages/AdmissionPartner';
import AdmissionAlumni from './pages/AdmissionAlumni';
import SiswaPembayaran from './pages/SiswaPembayaran';

import MarketingLeads from './pages/MarketingLeads';

import AkademikJadwal from './pages/AkademikJadwal';
import AkademikRisiko from './pages/AkademikRisiko';
import AkademikEvaluasi from './pages/AkademikEvaluasi';
import MarketingKontrak from './pages/MarketingKontrak';
import SiswaAkademik from './pages/SiswaAkademik';
import SiswaAdmission from './pages/SiswaAdmission';
import SiswaProfil from './pages/SiswaProfil';
import FinanceInvoice from './pages/FinanceInvoice';
import FinancePemasukan from './pages/FinancePemasukan';
import FinancePiutang from './pages/FinancePiutang';
import { LogOut, UserCircle } from 'lucide-react';
import { getFullSiswaData } from './data/mockDatabase';

const Layout = ({ children, role, setRole }) => {
  const navigate = useNavigate();
  
  // Simulasi Siswa Login
  const siswa = getFullSiswaData().find(s => s.id === 1);

  const handleLogout = () => {
    setRole(null);
    navigate('/');
  };

  return (
    <div className="app-container">
      <Sidebar role={role} />
      <main className="main-content">
        <header className="topbar">
          <div className="search-bar"></div>
          <div className="user-info">
            <UserCircle size={24} color="#6B7280" />
            <span style={{ fontWeight: 500 }}>
              {role === 'siswa' ? (siswa ? siswa.namaLengkap : 'Siswa') : role.toUpperCase()}
            </span>
            <button className="logout-btn" onClick={handleLogout}>
              <LogOut size={16} /> Logout
            </button>
          </div>
        </header>
        <div className="page-content">
          {children}
        </div>
      </main>
    </div>
  );
};

function App() {
  const [role, setRole] = useState(null);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login setRole={setRole} />} />
        
        {/* Protected Routes */}
        <Route path="/siswa" element={role === 'siswa' ? <Layout role={role} setRole={setRole}><DashboardSiswa /></Layout> : <Navigate to="/" />} />
        <Route path="/siswa/akademik" element={role === 'siswa' ? <Layout role={role} setRole={setRole}><SiswaAkademik /></Layout> : <Navigate to="/" />} />
        <Route path="/siswa/pembayaran" element={role === 'siswa' ? <Layout role={role} setRole={setRole}><SiswaPembayaran /></Layout> : <Navigate to="/" />} />
        <Route path="/siswa/admission" element={role === 'siswa' ? <Layout role={role} setRole={setRole}><SiswaAdmission /></Layout> : <Navigate to="/" />} />
        <Route path="/siswa/profil" element={role === 'siswa' ? <Layout role={role} setRole={setRole}><SiswaProfil /></Layout> : <Navigate to="/" />} />
        <Route path="/marketing" element={role === 'marketing' ? <Layout role={role} setRole={setRole}><DashboardMarketing /></Layout> : <Navigate to="/" />} />
        <Route path="/marketing/leads" element={role === 'marketing' ? <Layout role={role} setRole={setRole}><MarketingLeads /></Layout> : <Navigate to="/" />} />
        <Route path="/marketing/kontrak" element={role === 'marketing' ? <Layout role={role} setRole={setRole}><MarketingKontrak /></Layout> : <Navigate to="/" />} />
        
        <Route path="/finance" element={role === 'finance' ? <Layout role={role} setRole={setRole}><DashboardFinance /></Layout> : <Navigate to="/" />} />
        <Route path="/finance/invoice" element={role === 'finance' ? <Layout role={role} setRole={setRole}><FinanceInvoice /></Layout> : <Navigate to="/" />} />
        <Route path="/finance/pemasukan" element={role === 'finance' ? <Layout role={role} setRole={setRole}><FinancePemasukan /></Layout> : <Navigate to="/" />} />
        <Route path="/finance/piutang" element={role === 'finance' ? <Layout role={role} setRole={setRole}><FinancePiutang /></Layout> : <Navigate to="/" />} />
        
        <Route path="/akademik" element={role === 'akademik' ? <Layout role={role} setRole={setRole}><DashboardAkademik /></Layout> : <Navigate to="/" />} />
        <Route path="/akademik/jadwal" element={role === 'akademik' ? <Layout role={role} setRole={setRole}><AkademikJadwal /></Layout> : <Navigate to="/" />} />
        <Route path="/akademik/risiko" element={role === 'akademik' ? <Layout role={role} setRole={setRole}><AkademikRisiko /></Layout> : <Navigate to="/" />} />
        <Route path="/akademik/evaluasi" element={role === 'akademik' ? <Layout role={role} setRole={setRole}><AkademikEvaluasi /></Layout> : <Navigate to="/" />} />
        
        {/* Admission Routes Split */}
        <Route path="/admission" element={role === 'admission' ? <Layout role={role} setRole={setRole}><DashboardAdmission /></Layout> : <Navigate to="/" />} />
        <Route path="/admission/database" element={role === 'admission' ? <Layout role={role} setRole={setRole}><AdmissionDatabase /></Layout> : <Navigate to="/" />} />
        <Route path="/admission/ujian" element={role === 'admission' ? <Layout role={role} setRole={setRole}><AdmissionUjian /></Layout> : <Navigate to="/" />} />
        <Route path="/admission/partner" element={role === 'admission' ? <Layout role={role} setRole={setRole}><AdmissionPartner /></Layout> : <Navigate to="/" />} />
        <Route path="/admission/alumni" element={role === 'admission' ? <Layout role={role} setRole={setRole}><AdmissionAlumni /></Layout> : <Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
