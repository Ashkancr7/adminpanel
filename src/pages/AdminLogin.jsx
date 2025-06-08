import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AdminLogin = () => {
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axios.post('https://mystore-pbfe.onrender.com/api/login/admin-login', { phone, password });

      localStorage.setItem('admin_token', res.data.token);
      setError('');
      navigate('/admin-panel');
    } catch (err) {
      setError(err.response?.data?.message || 'خطا در ورود');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <form
        onSubmit={handleLogin}
        className="bg-white shadow-md rounded p-8 w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-4 text-center">ورود ادمین</h2>

        {error && <p className="text-red-600 text-sm mb-4">{error}</p>}

        <div className="mb-4">
          <label className="block mb-1 font-semibold">شماره موبایل</label>
          <input
            type="tel"
            className="w-full border px-3 py-2 rounded"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
            dir="ltr"
            pattern="^09\d{9}$"
            placeholder="مثلاً 09123456789"
          />
        </div>

        <div className="mb-6">
          <label className="block mb-1 font-semibold">رمز عبور</label>
          <input
            type="password"
            className="w-full border px-3 py-2 rounded"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition disabled:opacity-50"
          disabled={loading}
        >
          {loading ? 'در حال ورود...' : 'ورود'}
        </button>
      </form>
    </div>
  );
};

export default AdminLogin;
