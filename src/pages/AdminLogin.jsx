import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Eye, EyeOff, UserCircle2 } from 'lucide-react';

const AdminLogin = () => {
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!/^09\d{9}$/.test(phone)) {
      toast.error('شماره موبایل معتبر نیست.');
      setLoading(false);
      return;
    }

    try {
      const res = await axios.post('https://mystore-pbfe.onrender.com/api/login/admin-login', {
        phone,
        password,
      });

      localStorage.setItem('admin_token', res.data.token);
      toast.success('ورود موفقیت‌آمیز بود!');
      setPhone('');
      setPassword('');
      navigate('/');
    } catch (err) {
      toast.error(err.response?.data?.message || 'خطا در ورود');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-blue-100 to-blue-300 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-8 animate-fade-in">
        <div className="flex flex-col items-center mb-6">
          <div className="bg-blue-100 rounded-full p-4 shadow-md">
            <UserCircle2 className="text-blue-600 w-10 h-10" />
          </div>
          <h2 className="text-2xl font-bold mt-4 text-gray-800">ورود ادمین</h2>
          <p className="text-sm text-gray-500 mt-1">دسترسی فقط برای مدیران سیستم</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="block mb-1 font-medium text-gray-700">شماره موبایل</label>
            <input
              type="tel"
              dir="ltr"
              pattern="^09\d{9}$"
              placeholder="مثلاً 09123456789"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />
          </div>

          <div className="relative">
            <label className="block mb-1 font-medium text-gray-700">رمز عبور</label>
            <input
              type={showPassword ? 'text' : 'password'}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button
              type="button"
              className="absolute top-9 right-3 text-gray-500"
              onClick={() => setShowPassword(!showPassword)}
              tabIndex={-1}
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition disabled:opacity-50"
          >
            {loading ? 'در حال ورود...' : 'ورود'}
          </button>
        </form>
      </div>

      <ToastContainer rtl position="top-center" />
    </div>
  );
};

export default AdminLogin;
