import React from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Users, DollarSign, BookOpen, GraduationCap } from 'lucide-react';

const Login = ({ setRole }) => {
  const navigate = useNavigate();

  const handleLogin = (selectedRole) => {
    setRole(selectedRole);
    navigate(`/${selectedRole}`);
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h1>Maxima System</h1>
        <p>Pilih role untuk masuk ke prototipe dashboard</p>

        <button className="role-btn btn-siswa" onClick={() => handleLogin('siswa')}>
          <User size={20} /> Login sebagai Siswa
        </button>
        
        <button className="role-btn btn-marketing" onClick={() => handleLogin('marketing')}>
          <Users size={20} /> Login sebagai Marketing
        </button>
        
        <button className="role-btn btn-finance" onClick={() => handleLogin('finance')}>
          <DollarSign size={20} /> Login sebagai Finance
        </button>
        
        <button className="role-btn btn-akademik" onClick={() => handleLogin('akademik')}>
          <BookOpen size={20} /> Login sebagai Akademik
        </button>
        
        <button className="role-btn btn-admission" onClick={() => handleLogin('admission')}>
          <GraduationCap size={20} /> Login sebagai Admission
        </button>
      </div>
    </div>
  );
};

export default Login;
