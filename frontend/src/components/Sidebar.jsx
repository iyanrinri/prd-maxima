import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  Home, BookOpen, CreditCard, FileText, Settings, Users, 
  BarChart2, UserCheck, Calendar, Activity, GraduationCap, Award, Globe
} from 'lucide-react';

const Sidebar = ({ role }) => {
  const getNavItems = () => {
    switch (role) {
      case 'siswa':
        return [
          { name: 'Dashboard', path: '/siswa', icon: <Home size={20} /> },
          { name: 'Kelas Saya', path: '/siswa/akademik', icon: <BookOpen size={20} /> },
          { name: 'Pembayaran', path: '/siswa/pembayaran', icon: <CreditCard size={20} /> },
          { name: 'Layanan Admission', path: '/siswa/admission', icon: <FileText size={20} /> },
          { name: 'Profil', path: '/siswa/profil', icon: <Settings size={20} /> },
        ];
      case 'marketing':
        return [
          { name: 'Dashboard', path: '/marketing', icon: <BarChart2 size={20} /> },
          { name: 'Leads', path: '/marketing/leads', icon: <Users size={20} /> },
          { name: 'Kontrak & Daftar', path: '/marketing/kontrak', icon: <FileText size={20} /> },
        ];
      case 'finance':
        return [
          { name: 'Dashboard', path: '/finance', icon: <Activity size={20} /> },
          { name: 'Invoice & Tagihan', path: '/finance/invoice', icon: <FileText size={20} /> },
          { name: 'Pembayaran Masuk', path: '/finance/pemasukan', icon: <CreditCard size={20} /> },
          { name: 'Piutang', path: '/finance/piutang', icon: <Users size={20} /> },
        ];
      case 'akademik':
        return [
          { name: 'Dashboard', path: '/akademik', icon: <Activity size={20} /> },
          { name: 'Jadwal Kelas', path: '/akademik/jadwal', icon: <Calendar size={20} /> },
          { name: 'Siswa Berisiko', path: '/akademik/risiko', icon: <UserCheck size={20} /> },
          { name: 'Evaluasi', path: '/akademik/evaluasi', icon: <BarChart2 size={20} /> },
        ];
      case 'admission':
        return [
          { name: 'Dashboard', path: '/admission', icon: <Home size={20} /> },
          { name: 'Database & Dokumen', path: '/admission/database', icon: <FileText size={20} /> },
          { name: 'Ujian & Sertifikat', path: '/admission/ujian', icon: <Award size={20} /> },
          { name: 'Layanan Partner', path: '/admission/partner', icon: <Globe size={20} /> },
          { name: 'Alumni & Visa', path: '/admission/alumni', icon: <GraduationCap size={20} /> },
        ];
      default:
        return [];
    }
  };

  const navItems = getNavItems();

  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <div style={{ width: '30px', height: '30px', backgroundColor: 'var(--primary)', borderRadius: '8px' }}></div>
        Maxima
      </div>
      <nav className="sidebar-nav">
        {navItems.map((item, idx) => (
          <NavLink 
            key={idx} 
            to={item.path} 
            end={item.path === `/${role}`}
            className={({isActive}) => isActive && item.path !== '#' ? "nav-item active" : "nav-item"}
          >
            {item.icon}
            {item.name}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
