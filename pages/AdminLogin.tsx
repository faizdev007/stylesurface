import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/ui/Button';
import { Lock, ShieldCheck } from 'lucide-react';

const AdminLogin: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // If already logged in, redirect to dashboard
    if (localStorage.getItem('isAdmin') === 'true') {
      navigate('/admin/dashboard');
    }
  }, [navigate]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Dummy credentials
    if (username === 'admin' && password === 'admin123') {
      localStorage.setItem('isAdmin', 'true');
      navigate('/admin/dashboard');
    } else {
      setError('Invalid credentials. Try admin / admin123');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 border border-gray-200">
        <div className="text-center mb-8">
          <div className="bg-brand-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-brand-700">
            <Lock className="w-8 h-8" />
          </div>
          <h1 className="text-2xl font-bold text-industrial-dark">Admin Panel</h1>
          <p className="text-gray-500 text-sm mt-2">Enter your credentials to access site settings</p>
        </div>

        {error && (
          <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm mb-6 text-center border border-red-100">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-500 outline-none transition-all"
              placeholder="Enter username"
            />
          </div>
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-500 outline-none transition-all"
              placeholder="Enter password"
            />
          </div>
          <Button fullWidth variant="primary" type="submit">
            Login Securely
          </Button>
        </form>
        
        <div className="mt-6 text-center flex items-center justify-center gap-2 text-xs text-gray-400">
           <ShieldCheck className="w-4 h-4" /> Secure Environment
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;